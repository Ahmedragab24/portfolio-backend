import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AboutService } from './about.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) { }

  @Get()
  async getAbout() {
    return this.aboutService.getAbout();
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: any) {
    return this.aboutService.createAbout(body);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.aboutService.updateAbout(id, body);
  }
}
