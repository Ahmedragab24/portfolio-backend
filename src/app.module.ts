import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Entities
import { User } from './auth/user.entity';
import { Category } from './projects/entities/category.entity';
import { Project } from './projects/entities/project.entity';
import { Message } from './messages/message.entity';
import { VisitorStats } from './visitor-stats/visitor-stats.entity';
import { Review } from './reviews/review.entity';
import { Experience } from './experiences/experience.entity';
import { Statistics } from './statistics/statistics.entity';
import { About } from './about/about.entity';
import { Certificate } from './certificates/certificate.entity';
import { Todo } from './todos/todo.entity';

// Modules
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { AboutModule } from './about/about.module';
import { PortfolioDataModule } from './portfolio-data/portfolio-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>('DATABASE_URL');
        return {
          type: 'postgres',
          ...(url
            ? { url }
            : {
                host: configService.get<string>('DB_HOST', 'localhost'),
                port: configService.get<number>('DB_PORT', 5432),
                username: configService.get<string>('DB_USERNAME', 'postgres'),
                password: configService.get<string>('DB_PASSWORD', 'password'),
                database: configService.get<string>('DB_NAME', 'portfolio_dashboard'),
              }),
          entities: [
            User,
            Category,
            Project,
            Message,
            VisitorStats,
            Review,
            Experience,
            Statistics,
            About,
            Certificate,
            Todo,
          ],
          synchronize: true, // Automatically synchronize schema
          ssl: url ? { rejectUnauthorized: false } : false,
        };
      },
    }),
    AuthModule,
    ProjectsModule,
    AboutModule,
    PortfolioDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
