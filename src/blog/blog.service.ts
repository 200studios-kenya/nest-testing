import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  create = (blog: Blog): Promise<BlogDocument> => {
    return this.blogModel
      .create(blog)
      .then((blog) => blog)
      .catch((err) => {
        throw new BadRequestException(err);
      });
  };

  all = (): Promise<BlogDocument[]> => {
    return this.blogModel
      .find()
      .sort({ createdAt: -1 })
      .exec()
      .then((blogs) => blogs)
      .catch((err) => {
        throw new BadRequestException(err);
      });
  };
}
