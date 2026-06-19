import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  // Automatically seed the admin user on backend startup
  async onModuleInit() {
    await this.seedAdminUser();
  }

  async seedAdminUser() {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL', 'ahmedelmadany420@gmail.com');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD', 'AhmedSuperKavo24');
    const adminName = this.configService.get<string>('ADMIN_NAME', 'Ahmed Elmadany');

    const usersCount = await this.userRepository.count();

    if (usersCount === 0) {
      console.log('Seeding default admin user...');
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = this.userRepository.create({
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
      });
      await this.userRepository.save(admin);
      console.log(`Admin user seeded: ${adminEmail}`);
    } else {
      // If there is an admin user, update their credentials to match the current env setup
      const allUsers = await this.userRepository.find();
      if (allUsers.length === 1) {
        const admin = allUsers[0];
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        admin.email = adminEmail;
        admin.password = hashedPassword;
        admin.name = adminName;
        await this.userRepository.save(admin);
        console.log(`Admin user credentials updated to: ${adminEmail}`);
      } else {
        console.log('Admin user already exists.');
      }
    }
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, name: user.name };
    const token = await this.jwtService.signAsync(payload);

    return {
      jwt: token,
      user: {
        $id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async validateUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      // Exclude password from the returned object
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }

  async updateUser(id: string, email?: string, password?: string, name?: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    if (email) user.email = email;
    if (name) user.name = name;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    
    await this.userRepository.save(user);
    
    // Exclude password from the returned object
    const { password: _, ...result } = user;
    return result;
  }
}
