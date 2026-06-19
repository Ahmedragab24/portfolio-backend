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
Object.defineProperty(exports, "__esModule", { value: true });
exports.About = void 0;
const typeorm_1 = require("typeorm");
const crypto_1 = require("crypto");
let About = class About {
    id;
    name;
    arabicName;
    position;
    arabicPosition;
    description;
    arabicDescription;
    CV;
    email;
    socialMedia;
    createdAt;
    updatedAt;
    generateId() {
        if (!this.id) {
            this.id = (0, crypto_1.randomUUID)();
        }
    }
};
exports.About = About;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], About.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], About.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], About.prototype, "arabicName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], About.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], About.prototype, "arabicPosition", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], About.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], About.prototype, "arabicDescription", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], About.prototype, "CV", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], About.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    __metadata("design:type", Array)
], About.prototype, "socialMedia", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], About.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], About.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], About.prototype, "generateId", null);
exports.About = About = __decorate([
    (0, typeorm_1.Entity)('about')
], About);
//# sourceMappingURL=about.entity.js.map