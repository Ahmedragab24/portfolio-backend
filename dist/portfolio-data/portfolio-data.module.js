"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioDataModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_entity_1 = require("../messages/message.entity");
const visitor_stats_entity_1 = require("../visitor-stats/visitor-stats.entity");
const review_entity_1 = require("../reviews/review.entity");
const experience_entity_1 = require("../experiences/experience.entity");
const statistics_entity_1 = require("../statistics/statistics.entity");
const certificate_entity_1 = require("../certificates/certificate.entity");
const todo_entity_1 = require("../todos/todo.entity");
const messages_service_1 = require("./services/messages.service");
const visitor_stats_service_1 = require("./services/visitor-stats.service");
const reviews_service_1 = require("./services/reviews.service");
const experiences_service_1 = require("./services/experiences.service");
const statistics_service_1 = require("./services/statistics.service");
const certificates_service_1 = require("./services/certificates.service");
const todos_service_1 = require("./services/todos.service");
const messages_controller_1 = require("./controllers/messages.controller");
const visitor_stats_controller_1 = require("./controllers/visitor-stats.controller");
const reviews_controller_1 = require("./controllers/reviews.controller");
const experiences_controller_1 = require("./controllers/experiences.controller");
const statistics_controller_1 = require("./controllers/statistics.controller");
const certificates_controller_1 = require("./controllers/certificates.controller");
const todos_controller_1 = require("./controllers/todos.controller");
let PortfolioDataModule = class PortfolioDataModule {
};
exports.PortfolioDataModule = PortfolioDataModule;
exports.PortfolioDataModule = PortfolioDataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                message_entity_1.Message,
                visitor_stats_entity_1.VisitorStats,
                review_entity_1.Review,
                experience_entity_1.Experience,
                statistics_entity_1.Statistics,
                certificate_entity_1.Certificate,
                todo_entity_1.Todo,
            ]),
        ],
        controllers: [
            messages_controller_1.MessagesController,
            visitor_stats_controller_1.VisitorStatsController,
            reviews_controller_1.ReviewsController,
            experiences_controller_1.ExperiencesController,
            statistics_controller_1.StatisticsController,
            certificates_controller_1.CertificatesController,
            todos_controller_1.TodosController,
        ],
        providers: [
            messages_service_1.MessagesService,
            visitor_stats_service_1.VisitorStatsService,
            reviews_service_1.ReviewsService,
            experiences_service_1.ExperiencesService,
            statistics_service_1.StatisticsService,
            certificates_service_1.CertificatesService,
            todos_service_1.TodosService,
        ],
        exports: [
            messages_service_1.MessagesService,
            visitor_stats_service_1.VisitorStatsService,
            reviews_service_1.ReviewsService,
            experiences_service_1.ExperiencesService,
            statistics_service_1.StatisticsService,
            certificates_service_1.CertificatesService,
            todos_service_1.TodosService,
        ],
    })
], PortfolioDataModule);
//# sourceMappingURL=portfolio-data.module.js.map