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
exports.VisitorStatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const visitor_stats_entity_1 = require("../../visitor-stats/visitor-stats.entity");
let VisitorStatsService = class VisitorStatsService {
    statsRepository;
    DOCUMENT_ID = 'total_visits';
    constructor(statsRepository) {
        this.statsRepository = statsRepository;
    }
    async getStats() {
        let stats = await this.statsRepository.findOne({ where: { id: this.DOCUMENT_ID } });
        if (!stats) {
            stats = this.statsRepository.create({
                id: this.DOCUMENT_ID,
                total_visits: 0,
            });
            stats = await this.statsRepository.save(stats);
        }
        return this.mapStats(stats);
    }
    async increment() {
        let stats = await this.statsRepository.findOne({ where: { id: this.DOCUMENT_ID } });
        if (!stats) {
            stats = this.statsRepository.create({
                id: this.DOCUMENT_ID,
                total_visits: 1,
            });
        }
        else {
            stats.total_visits += 1;
        }
        const saved = await this.statsRepository.save(stats);
        return this.mapStats(saved);
    }
    mapStats(stats) {
        return {
            $id: stats.id,
            total_visits: stats.total_visits,
            last_updated: stats.last_updated,
        };
    }
};
exports.VisitorStatsService = VisitorStatsService;
exports.VisitorStatsService = VisitorStatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(visitor_stats_entity_1.VisitorStats)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VisitorStatsService);
//# sourceMappingURL=visitor-stats.service.js.map