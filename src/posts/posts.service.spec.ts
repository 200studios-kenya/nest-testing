import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo';
import PostSchema, { Post } from './posts.schema';
import { PostsService } from './posts.service';

interface NewPost {
  title: string;
  content: string;
  owner: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

describe('PostsService', () => {
  let service: PostsService;

  const createPost = async (): Promise<NewPost> => {
    const post: any = await service.create({
      title: 'test',
      content: 'test',
      owner: 'test',
    });
    return post;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
      ],
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a post', async () => {
    const post = await createPost();

    expect(post).toBeDefined();
    expect(post.title).toBe('test');
  });

  it('should get all posts', async () => {
    await createPost();

    const posts = await service.getAll();

    expect(posts).toBeDefined();
    expect(posts.length).toBe(1);
  });

  it('should get a post by id', async () => {
    const post = await createPost();

    const foundPost = await service.getById(post._id);

    expect(foundPost).toBeDefined();
    expect(foundPost.title).toBe('test');
  });

  it('should update a post', async () => {
    const post = await createPost();

    const updatedPost = await service.update(post._id, {
      title: 'test2',
      content: 'test2',
      owner: 'test2',
    });

    expect(updatedPost).toBeDefined();
    expect(updatedPost.title).toBe('test2');
  });

  it('should delete a post', async () => {
    const post = await createPost();

    const deletedPost = await service.delete(post._id);

    expect(deletedPost).toBeDefined();
    expect(deletedPost).toEqual({
      message: 'Post deleted',
    });
  });

  afterAll(() => closeInMongodConnection());
});
