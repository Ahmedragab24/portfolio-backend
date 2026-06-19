"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_entity_1 = require("./auth/user.entity");
const category_entity_1 = require("./projects/entities/category.entity");
const project_entity_1 = require("./projects/entities/project.entity");
const message_entity_1 = require("./messages/message.entity");
const visitor_stats_entity_1 = require("./visitor-stats/visitor-stats.entity");
const review_entity_1 = require("./reviews/review.entity");
const experience_entity_1 = require("./experiences/experience.entity");
const statistics_entity_1 = require("./statistics/statistics.entity");
const about_entity_1 = require("./about/about.entity");
const certificate_entity_1 = require("./certificates/certificate.entity");
const todo_entity_1 = require("./todos/todo.entity");
const auth_module_1 = require("./auth/auth.module");
const projects_module_1 = require("./projects/projects.module");
const about_module_1 = require("./about/about.module");
const portfolio_data_module_1 = require("./portfolio-data/portfolio-data.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const url = configService.get('DATABASE_URL');
                    return {
                        type: 'postgres',
                        ...(url
                            ? { url }
                            : {
                                host: configService.get('DB_HOST', 'localhost'),
                                port: configService.get('DB_PORT', 5432),
                                username: configService.get('DB_USERNAME', 'postgres'),
                                password: configService.get('DB_PASSWORD', 'password'),
                                database: configService.get('DB_NAME', 'portfolio_dashboard'),
                            }),
                        entities: [
                            user_entity_1.User,
                            category_entity_1.Category,
                            project_entity_1.Project,
                            message_entity_1.Message,
                            visitor_stats_entity_1.VisitorStats,
                            review_entity_1.Review,
                            experience_entity_1.Experience,
                            statistics_entity_1.Statistics,
                            about_entity_1.About,
                            certificate_entity_1.Certificate,
                            todo_entity_1.Todo,
                        ],
                        synchronize: true,
                        ssl: url ? { rejectUnauthorized: false } : false,
                    };
                },
            }),
            auth_module_1.AuthModule,
            projects_module_1.ProjectsModule,
            about_module_1.AboutModule,
            portfolio_data_module_1.PortfolioDataModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map