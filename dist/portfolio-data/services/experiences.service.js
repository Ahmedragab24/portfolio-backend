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
exports.ExperiencesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const experience_entity_1 = require("../../experiences/experience.entity");
let ExperiencesService = class ExperiencesService {
    experienceRepository;
    constructor(experienceRepository) {
        this.experienceRepository = experienceRepository;
    }
    async findAll() {
        const list = await this.experienceRepository.find();
        return list.map(e => this.mapExperience(e));
    }
    async findOne(id) {
        const experience = await this.experienceRepository.findOne({ where: { id } });
        if (!experience)
            throw new common_1.NotFoundException(`Experience with ID ${id} not found`);
        return this.mapExperience(experience);
    }
    async create(data) {
        const experience = this.experienceRepository.create(data);
        const saved = await this.experienceRepository.save(experience);
        return this.mapExperience(saved);
    }
    async update(id, data) {
        const experience = await this.experienceRepository.findOne({ where: { id } });
        if (!experience)
            throw new common_1.NotFoundException(`Experience with ID ${id} not found`);
        Object.assign(experience, data);
        const saved = await this.experienceRepository.save(experience);
        return this.mapExperience(saved);
    }
    async delete(id) {
        const experience = await this.experienceRepository.findOne({ where: { id } });
        if (!experience)
            throw new common_1.NotFoundException(`Experience with ID ${id} not found`);
        await this.experienceRepository.remove(experience);
        return true;
    }
    mapExperience(experience) {
        return {
            $id: experience.id,
            $createdAt: experience.createdAt,
            title: experience.title,
            arabicTitle: experience.arabicTitle,
            description: experience.description,
            arabicDescription: experience.arabicDescription,
            link: experience.link,
            titleLink: experience.titleLink,
            arabicTitleLink: experience.arabicTitleLink,
            motion: experience.motion,
            duration: experience.duration,
        };
    }
};
exports.ExperiencesService = ExperiencesService;
exports.ExperiencesService = ExperiencesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(experience_entity_1.Experience)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExperiencesService);
//# sourceMappingURL=experiences.service.js.map