import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './posts.schema';

export interface DeletedPost {
  message: string;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  create(post: Post): Promise<PostDocument> {
    return this.postModel
      .create(post)
      .then((post) => post)
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  getAll(): Promise<PostDocument[]> {
    return this.postModel
      .find()
      .sort({ createdAt: -1 })
      .exec()
      .then((posts) => posts)
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  getById(id: string): Promise<PostDocument> {
    return this.postModel
      .findById(id)
      .exec()
      .then((post) => {
        if (!post) {
          throw new BadRequestException('Post not found');
        }

        return post;
      });
  }

  update(id: string, post: Post): Promise<PostDocument> {
    return this.postModel
      .findByIdAndUpdate(id, { ...post }, { new: true })
      .exec()
      .then((post) => {
        if (!post) {
          throw new BadRequestException('Post not found');
        }

        return post;
      });
  }

  delete(id: string): Promise<DeletedPost> {
    return this.postModel
      .findByIdAndDelete(id)
      .exec()
      .then((post) => {
        if (!post) {
          throw new BadRequestException('Post not found');
        }

        return { message: 'Post deleted' };
      });
  }
}
