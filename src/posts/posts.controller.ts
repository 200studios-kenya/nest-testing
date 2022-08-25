import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/add')
  create(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('owner') owner: string,
  ) {
    const data = {
      title,
      content,
      owner,
    };
    return this.postsService.create(data);
  }

  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
    @Body('owner') owner?: string,
  ) {
    const data = {
      title,
      content,
      owner,
    };

    return this.postsService.update(id, data);
  }

  @Get('/all')
  getAll() {
    return this.postsService.getAll();
  }
  @Delete('/post/:id')
  delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}
