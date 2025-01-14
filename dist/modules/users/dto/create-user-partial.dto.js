"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserPartialDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_dto_1 = require("./create-user.dto");
class CreateUserPartialDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
exports.CreateUserPartialDto = CreateUserPartialDto;
//# sourceMappingURL=create-user-partial.dto.js.map