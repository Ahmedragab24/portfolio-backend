import { Controller, Post, Get, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(@Request() req: any) {
    const user = await this.authService.validateUserById(req.user.sub);
    if (!user) {
      return null;
    }
    return {
      $id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    return { success: true };
  }
}
