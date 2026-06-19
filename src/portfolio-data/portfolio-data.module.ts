import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Message } from '../messages/message.entity';
import { VisitorStats } from '../visitor-stats/visitor-stats.entity';
import { Review } from '../reviews/review.entity';
import { Experience } from '../experiences/experience.entity';
import { Statistics } from '../statistics/statistics.entity';
import { Certificate } from '../certificates/certificate.entity';
import { Todo } from '../todos/todo.entity';

// Services
import { MessagesService } from './services/messages.service';
import { VisitorStatsService } from './services/visitor-stats.service';
import { ReviewsService } from './services/reviews.service';
import { ExperiencesService } from './services/experiences.service';
import { StatisticsService } from './services/statistics.service';
import { CertificatesService } from './services/certificates.service';
import { TodosService } from './services/todos.service';

// Controllers
import { MessagesController } from './controllers/messages.controller';
import { VisitorStatsController } from './controllers/visitor-stats.controller';
import { ReviewsController } from './controllers/reviews.controller';
import { ExperiencesController } from './controllers/experiences.controller';
import { StatisticsController } from './controllers/statistics.controller';
import { CertificatesController } from './controllers/certificates.controller';
import { TodosController } from './controllers/todos.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Message,
      VisitorStats,
      Review,
      Experience,
      Statistics,
      Certificate,
      Todo,
    ]),
  ],
  controllers: [
    MessagesController,
    VisitorStatsController,
    ReviewsController,
    ExperiencesController,
    StatisticsController,
    CertificatesController,
    TodosController,
  ],
  providers: [
    MessagesService,
    VisitorStatsService,
    ReviewsService,
    ExperiencesService,
    StatisticsService,
    CertificatesService,
    TodosService,
  ],
  exports: [
    MessagesService,
    VisitorStatsService,
    ReviewsService,
    ExperiencesService,
    StatisticsService,
    CertificatesService,
    TodosService,
  ],
})
export class PortfolioDataModule {}
