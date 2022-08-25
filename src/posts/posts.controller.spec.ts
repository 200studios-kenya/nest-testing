import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

interface Post {
  title: string;
  content: string;
  owner: string;
}

const data: Post = {
  title: 'test',
  content: 'test',
  owner: 'test',
};

const mockService = {
  create: jest.fn((post: any) => {
    return {
      title: post.title,
      content: post.content,
      owner: post.owner,
      _id: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }),

  update: jest.fn((id: string, post: any) => {
    return {
      title: post.title,
      content: post.content,
      owner: post.owner,
      _id: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }),

  getAll: jest.fn(() => {
    return [
      {
        title: 'test',
        content: 'test',
        owner: 'test',
        _id: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }),

  delete: jest.fn(() => {
    return {
      message: 'Post deleted',
    };
  }),
};
describe('PostsController', () => {
  let controller: PostsController;

  const createPost = async () => {
    const post = await controller.create(data.content, data.title, data.owner);
    return post;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    })
      .overrideProvider(PostsService)
      .useValue(mockService)
      .compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a post', async () => {
    const post = await createPost();

    expect(post).toBeDefined();
    expect(post.title).toBe('test');
  });

  it('Should update a post', async () => {
    const post = await createPost();

    const updatedPost = await controller.update(
      post._id,
      'new title',
      'new content',
      'new owner',
    );

    expect(post).toBeDefined();
    expect(updatedPost.title).toBe('new title');
    expect(updatedPost.content).toBe('new content');
    expect(updatedPost.owner).toBe('new owner');
  });

  it('Should get all posts', async () => {
    await createPost();

    const posts = await controller.getAll();

    expect(posts).toBeDefined();
    expect(posts.length).toBe(1);
  });

  it('Should delete a post', async () => {
    const post = await createPost();

    const deletedPost = await controller.delete(post._id);

    expect(deletedPost).toBeDefined();
    expect(deletedPost.message).toBe('Post deleted');
  });
});
