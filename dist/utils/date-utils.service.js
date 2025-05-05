"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtilsService = void 0;
const common_1 = require("@nestjs/common");
let DateUtilsService = class DateUtilsService {
    fakeZonedTimeToUtc(localDateStr) {
        const [datePart, timePart] = localDateStr.split(' ');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hour, minute, second] = timePart.split(':').map(Number);
        const localDate = new Date(year, month - 1, day, hour, minute, second);
        const offsetInMinutes = -5 * 60;
        const localDateInUTC = new Date(localDate.getTime() - offsetInMinutes * 60000);
        return localDateInUTC;
    }
    formatoFechaSQL(date) {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    utcDateToLocal(date) {
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const day = String(localDate.getDate()).padStart(2, '0');
        const hours = String(localDate.getHours()).padStart(2, '0');
        const minutes = String(localDate.getMinutes()).padStart(2, '0');
        const seconds = String(localDate.getSeconds()).padStart(2, '0');
        const milliseconds = String(localDate.getMilliseconds()).padStart(3, '0');
        const localDateString = `${year}-${month}-${day} ${hours}:${minutes}`;
        return localDateString;
    }
};
exports.DateUtilsService = DateUtilsService;
exports.DateUtilsService = DateUtilsService = __decorate([
    (0, common_1.Injectable)()
], DateUtilsService);
//# sourceMappingURL=date-utils.service.js.map