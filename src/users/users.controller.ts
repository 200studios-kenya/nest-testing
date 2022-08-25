import { Body, Controller, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add')
  addUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.usersService.createUser({ username, password });
  }

  @Post('login')
  login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.usersService.login({ username, password });
  }

  @Patch('change-username')
  changeUsername(@Body('username') username: string, @Body('id') id: string) {
    return this.usersService.changeUsername(username, id);
  }
}
