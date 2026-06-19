import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Category } from './entities/category.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Category])],
  controllers: [ProjectsController, CategoriesController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
