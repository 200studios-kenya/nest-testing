import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo';
import BlogSchema, { Blog } from './blog.schema';
import { BlogService } from './blog.service';

export interface AddBlog {
  title: string;
  content: string;
}

export const newBlog: AddBlog = {
  title: 'Test Blog',
  content: 'Test Blog Content',
};

describe('BlogService', () => {
  let service: BlogService;

  const createBlog = async (blog: AddBlog) => {
    const blogModel = await service.create(blog);
    return blogModel;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
      ],
      providers: [BlogService],
    }).compile();

    service = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a blog', async () => {
    const blog = await createBlog(newBlog);
    expect(blog).toBeDefined();
    expect(blog.title).toBe(newBlog.title);
  });

  it('Should list all blogs', async () => {
    await createBlog(newBlog);
    const blogs = await service.all();
    expect(blogs).toBeDefined();
    expect(blogs.length).toBe(1);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
