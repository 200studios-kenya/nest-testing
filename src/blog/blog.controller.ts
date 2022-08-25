import { Body, Controller, Post } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('add')
  async create(@Body('title') title: string, @Body('content') content: string) {
    return this.blogService.create({ title, content });
  }
}
