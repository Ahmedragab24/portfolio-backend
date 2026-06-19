"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("./user.entity");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    configService;
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async onModuleInit() {
        await this.seedAdminUser();
    }
    async seedAdminUser() {
        const adminEmail = this.configService.get('ADMIN_EMAIL', 'ahmedelmadany420@gmail.com');
        const adminPassword = this.configService.get('ADMIN_PASSWORD', 'AhmedSuperKavo24');
        const adminName = this.configService.get('ADMIN_NAME', 'Ahmed Elmadany');
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
        }
        else {
            const allUsers = await this.userRepository.find();
            if (allUsers.length === 1) {
                const admin = allUsers[0];
                const hashedPassword = await bcrypt.hash(adminPassword, 10);
                admin.email = adminEmail;
                admin.password = hashedPassword;
                admin.name = adminName;
                await this.userRepository.save(admin);
                console.log(`Admin user credentials updated to: ${adminEmail}`);
            }
            else {
                console.log('Admin user already exists.');
            }
        }
    }
    async login(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
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
    async validateUserById(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async updateUser(id, email, password, name) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (email)
            user.email = email;
        if (name)
            user.name = name;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        await this.userRepository.save(user);
        const { password: _, ...result } = user;
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map