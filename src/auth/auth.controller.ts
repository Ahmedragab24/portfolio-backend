import { Controller, Post, Get, Body, UseGuards, Request, HttpCode, HttpStatus, Param } from '@nestjs/common';
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

  @UseGuards(AuthGuard)
  @Post('update-profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Request() req: any, @Body() body: any) {
    const { email, password, name } = body;
    // req.user.sub contains the logged in user's ID
    return this.authService.updateUser(req.user.sub, email, password, name);
  }

  // Admin endpoint to forcefully update a specific user's data by ID
  @Post('admin/update-user/:id')
  @HttpCode(HttpStatus.OK)
  async adminUpdateUser(@Request() req: any, @Body() body: any, @Param('id') id: string) {
    const { email, password, name } = body;
    // id contains the target user's ID
    return this.authService.updateUser(id, email, password, name);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    return { success: true };
  }
}
