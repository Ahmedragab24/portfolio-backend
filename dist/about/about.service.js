"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const about_entity_1 = require("./about.entity");
let AboutService = class AboutService {
    aboutRepository;
    constructor(aboutRepository) {
        this.aboutRepository = aboutRepository;
    }
    async getAbout() {
        const list = await this.aboutRepository.find();
        if (list.length === 0) {
            const defaultAbout = this.aboutRepository.create({
                name: 'Your Name',
                arabicName: 'اسمك',
                position: 'Your Position',
                arabicPosition: 'منصبك',
                description: 'Your description goes here.',
                arabicDescription: 'وصفك يذهب هنا.',
                CV: '',
                email: 'your.email@example.com',
                socialMedia: [
                    {
                        name: 'GitHub',
                        link: 'https://github.com/yourusername',
                        icon: 'github',
                    },
                ],
            });
            const saved = await this.aboutRepository.save(defaultAbout);
            return this.mapAbout(saved);
        }
        return this.mapAbout(list[0]);
    }
    async updateAbout(id, data) {
        let about = null;
        if (id) {
            about = await this.aboutRepository.findOne({ where: { id } });
        }
        if (!about) {
            const list = await this.aboutRepository.find();
            if (list.length > 0) {
                about = list[0];
            }
        }
        if (!about) {
            about = this.aboutRepository.create(data);
        }
        else {
            Object.assign(about, data);
        }
        const saved = await this.aboutRepository.save(about);
        return this.mapAbout(saved);
    }
    async createAbout(data) {
        const about = this.aboutRepository.create(data);
        const saved = await this.aboutRepository.save(about);
        return this.mapAbout(saved);
    }
    mapAbout(about) {
        return {
            $id: about.id,
            $createdAt: about.createdAt,
            $updatedAt: about.updatedAt,
            name: about.name,
            arabicName: about.arabicName,
            position: about.position,
            arabicPosition: about.arabicPosition,
            description: about.description,
            arabicDescription: about.arabicDescription,
            CV: about.CV,
            email: about.email,
            socialMedia: about.socialMedia || [],
        };
    }
};
exports.AboutService = AboutService;
exports.AboutService = AboutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(about_entity_1.About)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AboutService);
//# sourceMappingURL=about.service.js.map