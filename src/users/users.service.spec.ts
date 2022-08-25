import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import UserSchema, { User } from './users.schema';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user: User = await service.createUser({
      username: 'test',
      password: 'test',
    });
    expect(user.username).toBe(user.username);
    expect(user.password).toBe(user.password);
  });

  it('should login a user', async () => {
    const user: User = await service.createUser({
      username: 'test',
      password: 'test',
    });
    const loggedInUser = await service.login({
      username: 'test',
      password: 'test',
    });

    expect(loggedInUser.username).toBe(user.username);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
