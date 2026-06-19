import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Project } from './entities/project.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // --- Category CRUD ---
  async findAllCategories() {
    const categories = await this.categoryRepository.find();
    return categories.map(c => this.mapCategory(c));
  }

  async findCategoryById(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.mapCategory(category);
  }

  async createCategory(name: string) {
    const category = this.categoryRepository.create({ name });
    const saved = await this.categoryRepository.save(category);
    return this.mapCategory(saved);
  }

  async updateCategory(id: string, name: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    category.name = name;
    const saved = await this.categoryRepository.save(category);
    return this.mapCategory(saved);
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.categoryRepository.remove(category);
    return true;
  }

  // --- Project CRUD ---
  async findAllProjects() {
    const projects = await this.projectRepository.find({
      relations: { categories: true },
    });
    return projects.map(p => this.mapProject(p));
  }

  async findProjectById(id: string) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: { categories: true },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return this.mapProject(project);
  }

  async createProject(data: any) {
    const { categories, ...projectData } = data;
    const project = this.projectRepository.create(projectData as Partial<Project>);

    if (categories && categories.length > 0) {
      const categoryEntities = await this.categoryRepository.findBy({
        id: In(categories),
      });
      project.categories = categoryEntities;
    } else {
      project.categories = [];
    }

    const saved = await this.projectRepository.save(project);
    return this.mapProject(saved);
  }

  async updateProject(id: string, data: any) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: { categories: true },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    const { categories, ...projectData } = data;

    // Update basic fields
    Object.assign(project, projectData);

    // Update relationship if categories are passed
    if (categories !== undefined) {
      if (categories.length > 0) {
        const categoryEntities = await this.categoryRepository.findBy({
          id: In(categories),
        });
        project.categories = categoryEntities;
      } else {
        project.categories = [];
      }
    }

    const saved = await this.projectRepository.save(project);
    return this.mapProject(saved);
  }

  async deleteProject(id: string) {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    await this.projectRepository.remove(project);
    return true;
  }

  // --- Helper Mappers ---
  private mapProject(project: Project) {
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

  private mapCategory(category: Category) {
    return {
      $id: category.id,
      name: category.name,
    };
  }
}
