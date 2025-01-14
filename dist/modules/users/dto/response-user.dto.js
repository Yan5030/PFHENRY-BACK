"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUserDto = void 0;
class ResponseUserDto {
    constructor(data) {
        const { password, ...rest } = data;
        Object.assign(this, rest);
    }
}
exports.ResponseUserDto = ResponseUserDto;
//# sourceMappingURL=response-user.dto.js.map