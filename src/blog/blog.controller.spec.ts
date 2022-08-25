import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { AddBlog, newBlog } from './blog.service.spec';

const mockService = {
  create: jest.fn((blog) => {
    return {
      title: blog.title,
      content: blog.content,
      _id: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }),

  all: jest.fn(() => {
    return [
      {
        title: newBlog.title,
        content: newBlog.content,
        _id: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }),
};

describe('BlogController', () => {
  let controller: BlogController;

  const createBlog = async (blog: AddBlog) => {
    const blogModel = await controller.create(blog.title, blog.content);
    return blogModel;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [BlogService],
    })
      .overrideProvider(BlogService)
      .useValue(mockService)
      .compile();

    controller = module.get<BlogController>(BlogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should create a blog', async () => {
    const blog = await createBlog(newBlog);
    expect(blog).toBeDefined();
    expect(blog.title).toBe(newBlog.title);
  });

  it('Should list all blogs', async () => {
    await createBlog(newBlog);
    const blogs = await controller.all();
    expect(blogs).toBeDefined();
    expect(blogs.length).toBe(1);
  });
});
