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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("./entities/project.entity");
const category_entity_1 = require("./entities/category.entity");
let ProjectsService = class ProjectsService {
    projectRepository;
    categoryRepository;
    constructor(projectRepository, categoryRepository) {
        this.projectRepository = projectRepository;
        this.categoryRepository = categoryRepository;
    }
    async findAllCategories() {
        const categories = await this.categoryRepository.find();
        return categories.map(c => this.mapCategory(c));
    }
    async findCategoryById(id) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return this.mapCategory(category);
    }
    async createCategory(name) {
        const category = this.categoryRepository.create({ name });
        const saved = await this.categoryRepository.save(category);
        return this.mapCategory(saved);
    }
    async updateCategory(id, name) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        category.name = name;
        const saved = await this.categoryRepository.save(category);
        return this.mapCategory(saved);
    }
    async deleteCategory(id) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        await this.categoryRepository.remove(category);
        return true;
    }
    async findAllProjects() {
        const projects = await this.projectRepository.find({
            relations: { categories: true },
        });
        return projects.map(p => this.mapProject(p));
    }
    async findProjectById(id) {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: { categories: true },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        return this.mapProject(project);
    }
    async createProject(data) {
        const { categories, ...projectData } = data;
        const project = this.projectRepository.create(projectData);
        if (categories && categories.length > 0) {
            const categoryEntities = await this.categoryRepository.findBy({
                id: (0, typeorm_2.In)(categories),
            });
            project.categories = categoryEntities;
        }
        else {
            project.categories = [];
        }
        const saved = await this.projectRepository.save(project);
        return this.mapProject(saved);
    }
    async updateProject(id, data) {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: { categories: true },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        const { categories, ...projectData } = data;
        Object.assign(project, projectData);
        if (categories !== undefined) {
            if (categories.length > 0) {
                const categoryEntities = await this.categoryRepository.findBy({
                    id: (0, typeorm_2.In)(categories),
                });
                project.categories = categoryEntities;
            }
            else {
                project.categories = [];
            }
        }
        const saved = await this.projectRepository.save(project);
        return this.mapProject(saved);
    }
    async deleteProject(id) {
        const project = await this.projectRepository.findOne({ where: { id } });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        await this.projectRepository.remove(project);
        return true;
    }
    mapProject(project) {
        return {
            $id: project.id,
            title: project.title,
            description: project.description,
            image: project.image,
            DemoLink: project.DemoLink,
            githubLink: project.githubLink,
            Technologies: project.Technologies || [],
            projectType: project.projectType || [],
            categories: (project.categories || []).map(cat => ({
                $id: cat.id,
                name: cat.name,
            })),
        };
    }
    mapCategory(category) {
        return {
            $id: category.id,
            name: category.name,
        };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map