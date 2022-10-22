import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Public()
  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<User> {
    return this.userService.getById(id);
  }

  @Get()
  async getByEmail(@Query('email') email: string): Promise<Object> {
    const checkEmail = await this.userService.getByUserEmail(email)
    const obj = { checkEmail: !!checkEmail }
    return obj;
  }

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    return this.userService.deleteUserById(id);
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log(req)
    return this.authService.login(req.user);
  }
}
