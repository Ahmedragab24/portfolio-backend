import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  content.split('\n').forEach(line => {
    const cleanedLine = line.split('#')[0].trim();
    if (!cleanedLine) return;
    const parts = cleanedLine.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (parts) {
      const key = parts[1];
      let value = parts[2] || '';
      if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value;
    }
  });
}

// Load envs
const rootDir = path.resolve(__dirname, '../../../');
const backendDir = path.resolve(__dirname, '../../');
loadEnvFile(path.join(rootDir, '.env'));
loadEnvFile(path.join(backendDir, '.env'));

const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const APPWRITE_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_NAME = process.env.DB_NAME || 'portfolio_dashboard';

let activeHeaders: Record<string, string> = {
  'X-Appwrite-Project': APPWRITE_PROJECT || '',
};

// Check if Appwrite API key is present and not identical to project ID
if (APPWRITE_KEY && APPWRITE_KEY !== APPWRITE_PROJECT) {
  activeHeaders['X-Appwrite-Key'] = APPWRITE_KEY;
}

async function fetchFromAppwrite(collectionId: string): Promise<any[]> {
  if (!collectionId) return [];
  const url = `${APPWRITE_ENDPOINT}/databases/${DATABASE_ID}/collections/${collectionId}/documents?limit=100`;
  let res = await fetch(url, { headers: activeHeaders });

  if (res.status === 401) {
    await tryAppwriteLogin();
    res = await fetch(url, { headers: activeHeaders });
    if (res.status === 401) {
      throw new Error('Unauthorized');
    }
  }

  if (!res.ok) {
    throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  return data.documents || [];
}

async function tryAppwriteLogin() {
  console.log('\n--- Appwrite Authentication Required ---');
  console.log('We received an Unauthorized (401) error from Appwrite.');
  console.log('This usually happens because some collections are private and require credentials.');
  
  const choice = await askQuestion('Would you like to (1) Enter a valid API Key, or (2) Log in with your Appwrite admin Email & Password? Enter 1 or 2: ');
  
  if (choice.trim() === '1') {
    const key = await askQuestion('Please enter your Appwrite API Key: ');
    activeHeaders['X-Appwrite-Key'] = key.trim();
    console.log('API Key applied. Retrying...');
  } else if (choice.trim() === '2') {
    const email = await askQuestion('Enter Appwrite Email: ');
    const password = await askQuestion('Enter Appwrite Password: ');
    
    console.log('Logging in to Appwrite...');
    const loginRes = await fetch(`${APPWRITE_ENDPOINT}/account/sessions/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Appwrite-Project': APPWRITE_PROJECT || '',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!loginRes.ok) {
      throw new Error(`Login failed: ${loginRes.statusText}`);
    }

    // Extract the session cookie
    const setCookie = loginRes.headers.get('set-cookie');
    if (setCookie) {
      // Find the session cookie name and value (e.g. a_session_...)
      const match = setCookie.match(/(a_session_[^=]+=[^;]+)/);
      if (match) {
        activeHeaders['cookie'] = match[1];
        console.log('Authentication successful! Cookie session established.');
        return;
      }
    }
    
    // Fallback: create JWT
    const loginData = await loginRes.json();
    console.log('Session created. Attempting to create JWT...');
    
    // We can fetch JWT if we have cookie context, but if not we can try to fetch JWT
    // If cookie wasn't parsed, throw
    throw new Error('Could not parse session cookie from Appwrite response.');
  } else {
    console.log('Invalid choice. Proceeding without authentication...');
  }
}

async function runMigration() {
  console.log('Starting migration from Appwrite to PostgreSQL...');
  
  if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT || !DATABASE_ID) {
    console.error('Missing Appwrite configuration. Check your root .env file.');
    process.exit(1);
  }

  const pgClient = new Client({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

  try {
    await pgClient.connect();
    console.log('Connected to PostgreSQL successfully.');

    // Attempt to fetch first collection to check auth
    const categoriesCollectionId = process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID || '';
    let categories: any[] = [];
    
    try {
      categories = await fetchFromAppwrite(categoriesCollectionId);
    } catch (err: any) {
      if (err.message === 'Unauthorized') {
        await tryAppwriteLogin();
        // Retry fetch
        categories = await fetchFromAppwrite(categoriesCollectionId);
      } else {
        throw err;
      }
    }

    // 1. Migrate Categories
    console.log('\nMigrating Categories...');
    await pgClient.query('TRUNCATE TABLE categories CASCADE');
    for (const cat of categories) {
      await pgClient.query(
        'INSERT INTO categories (id, name) VALUES ($1, $2)',
        [cat.$id, cat.name]
      );
      console.log(`- Inserted Category: ${cat.name} (${cat.$id})`);
    }

    // 2. Migrate Projects
    console.log('\nMigrating Projects...');
    const projectsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID || '';
    const projects = await fetchFromAppwrite(projectsCollectionId);
    
    await pgClient.query('TRUNCATE TABLE projects CASCADE');
    await pgClient.query('TRUNCATE TABLE project_categories CASCADE');
    for (const proj of projects) {
      const technologies = Array.isArray(proj.Technologies) ? proj.Technologies.join(',') : '';
      const projectTypes = Array.isArray(proj.projectType) ? proj.projectType.join(',') : '';

      await pgClient.query(
        `INSERT INTO projects (id, title, description, image, "DemoLink", "githubLink", "Technologies", "projectType") 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          proj.$id,
          proj.title,
          proj.description,
          proj.image,
          proj.DemoLink || null,
          proj.githubLink || null,
          technologies || null,
          projectTypes || null,
        ]
      );
      console.log(`- Inserted Project: ${proj.title} (${proj.$id})`);

      if (Array.isArray(proj.categories)) {
        for (const cat of proj.categories) {
          const catId = typeof cat === 'object' && cat ? cat.$id : cat;
          if (catId) {
            await pgClient.query(
              'INSERT INTO project_categories (project_id, category_id) VALUES ($1, $2)',
              [proj.$id, catId]
            );
            console.log(`  * Associated with Category: ${catId}`);
          }
        }
      }
    }

    // 3. Migrate Messages
    console.log('\nMigrating Messages...');
    const messagesCollectionId = process.env.NEXT_PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID || '';
    let messages: any[] = [];
    try {
      messages = await fetchFromAppwrite(messagesCollectionId);
    } catch (e: any) {
      console.log(`Warning: Could not fetch messages (likely due to permissions). Skipping messages.`);
    }
    await pgClient.query('TRUNCATE TABLE messages CASCADE');
    for (const msg of messages) {
      await pgClient.query(
        `INSERT INTO messages (id, name, email, message, "PhoneNumber", "createdAt") 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [msg.$id, msg.name, msg.email, msg.message, msg.PhoneNumber, msg.$createdAt]
      );
    }
    console.log(`Migrated ${messages.length} messages.`);

    // 4. Migrate Visitor Stats
    console.log('\nMigrating Visitor Stats...');
    const visitorStatsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_VISITOR_STATS_COLLECTION_ID || '';
    let visitorStats: any[] = [];
    try {
      visitorStats = await fetchFromAppwrite(visitorStatsCollectionId);
    } catch (e: any) {
      console.log(`Warning: Could not fetch visitor stats: ${e.message || e}. Skipping.`);
    }
    await pgClient.query('TRUNCATE TABLE visitor_stats CASCADE');
    for (const stats of visitorStats) {
      await pgClient.query(
        `INSERT INTO visitor_stats (id, total_visits, last_updated) 
         VALUES ($1, $2, $3)`,
        [stats.$id, stats.total_visits, stats.last_updated || new Date()]
      );
    }
    console.log(`Migrated visitor stats.`);

    // 5. Migrate Reviews
    console.log('\nMigrating Reviews...');
    const reviewsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID || '';
    const reviews = await fetchFromAppwrite(reviewsCollectionId);
    await pgClient.query('TRUNCATE TABLE reviews CASCADE');
    for (const rev of reviews) {
      await pgClient.query(
        `INSERT INTO reviews (id, name, avatar, rating, review, "createdAt") 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [rev.$id, rev.name, rev.avatar, rev.rating, rev.review, rev.$createdAt]
      );
    }
    console.log(`Migrated ${reviews.length} reviews.`);

    // 6. Migrate Experiences
    console.log('\nMigrating Experiences...');
    const experiencesCollectionId = process.env.NEXT_PUBLIC_APPWRITE_EXPERIENCE_COLLECTION_ID || '';
    const experiences = await fetchFromAppwrite(experiencesCollectionId);
    await pgClient.query('TRUNCATE TABLE experiences CASCADE');
    for (const exp of experiences) {
      await pgClient.query(
        `INSERT INTO experiences (id, title, "arabicTitle", description, "arabicDescription", link, "titleLink", "arabicTitleLink", motion, duration, "createdAt") 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          exp.$id,
          exp.title,
          exp.arabicTitle,
          exp.description,
          exp.arabicDescription,
          exp.link || null,
          exp.titleLink || null,
          exp.arabicTitleLink || null,
          exp.motion,
          exp.duration,
          exp.$createdAt,
        ]
      );
    }
    console.log(`Migrated ${experiences.length} experiences.`);

    // 7. Migrate Statistics
    console.log('\nMigrating Statistics...');
    const statisticsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_STATISTICS_COLLECTION_ID || '';
    const statistics = await fetchFromAppwrite(statisticsCollectionId);
    await pgClient.query('TRUNCATE TABLE statistics CASCADE');
    for (const stat of statistics) {
      await pgClient.query(
        `INSERT INTO statistics (id, title, "arTitle", number, "createdAt") 
         VALUES ($1, $2, $3, $4, $5)`,
        [stat.$id, stat.title, stat.arTitle, stat.number, stat.$createdAt]
      );
    }
    console.log(`Migrated ${statistics.length} statistics.`);

    // 8. Migrate About
    console.log('\nMigrating About...');
    const aboutCollectionId = process.env.NEXT_PUBLIC_APPWRITE_ABOUT_COLLECTION_ID || '';
    const aboutList = await fetchFromAppwrite(aboutCollectionId);
    await pgClient.query('TRUNCATE TABLE about CASCADE');
    for (const ab of aboutList) {
      const socialMedia = Array.isArray(ab.socialMedia) ? JSON.stringify(ab.socialMedia) : '[]';
      await pgClient.query(
        `INSERT INTO about (id, name, "arabicName", position, "arabicPosition", description, "arabicDescription", "CV", email, "socialMedia", "createdAt", "updatedAt") 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          ab.$id,
          ab.name,
          ab.arabicName,
          ab.position,
          ab.arabicPosition,
          ab.description,
          ab.arabicDescription,
          ab.CV,
          ab.email,
          socialMedia,
          ab.$createdAt || new Date(),
          ab.$updatedAt || new Date(),
        ]
      );
    }
    console.log(`Migrated ${aboutList.length} about details.`);

    // 9. Migrate Certificates
    console.log('\nMigrating Certificates...');
    const certificatesCollectionId = process.env.NEXT_PUBLIC_APPWRITE_CERTIFICATES_COLLECTION_ID || '';
    const certificates = await fetchFromAppwrite(certificatesCollectionId);
    await pgClient.query('TRUNCATE TABLE certificates CASCADE');
    for (const cert of certificates) {
      await pgClient.query(
        `INSERT INTO certificates (id, name, certificate, "createdAt", "updatedAt") 
         VALUES ($1, $2, $3, $4, $5)`,
        [cert.$id, cert.name, cert.certificate, cert.$createdAt, cert.$updatedAt || new Date()]
      );
    }
    console.log(`Migrated ${certificates.length} certificates.`);

    // 10. Migrate Todos
    console.log('\nMigrating Todos...');
    const todosCollectionId = process.env.NEXT_PUBLIC_APPWRITE_TODOLIST_COLLECTION_ID || '';
    let todos: any[] = [];
    try {
      todos = await fetchFromAppwrite(todosCollectionId);
    } catch (e) {
      console.log(`Warning: Could not fetch todos (likely due to permissions). Skipping todos.`);
    }
    await pgClient.query('TRUNCATE TABLE todos CASCADE');
    for (const todo of todos) {
      await pgClient.query(
        `INSERT INTO todos (id, "Title", "Description", completed, "Date", "Priority", "Category", "createdAt", "updatedAt") 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          todo.$id,
          todo.Title,
          todo.Description,
          todo.completed ?? false,
          todo.Date || new Date(),
          todo.Priority || 'Medium',
          todo.Category || 'Other',
          todo.$createdAt,
          todo.$updatedAt || new Date(),
        ]
      );
    }
    console.log(`Migrated ${todos.length} todos.`);

    console.log('\nMigration completed successfully!');

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pgClient.end();
  }
}

runMigration();
