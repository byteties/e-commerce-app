import { Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/:username')
    getUser(@Param('username') username: string) {
        return this.usersService.findOne(username);
    }

    @Post('/seed')
    register() {
        return this.usersService.seedUsers();
    }
}