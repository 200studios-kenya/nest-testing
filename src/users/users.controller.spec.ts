import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

interface User {
  username: string;
  password: string;
}

const user: User = {
  username: 'test',
  password: 'test',
};

const mockService = {
  createUser: jest.fn((user: User) => {
    return {
      username: user.username,
      password: user.password,
      _id: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }),

  login: jest.fn((user) => {
    return {
      username: user.username,
      _id: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }),

  changeUsername: jest.fn((username: string, id: string) => {
    return {
      username: username,
      _id: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should create a user', () => {
    expect(controller.addUser(user.username, user.password)).toEqual({
      username: 'test',
      password: expect.any(String),
      _id: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('Should login a user and hide their password', () => {
    expect(controller.login(user.username, user.password)).toEqual({
      username: 'test',
      _id: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("Should change a user's username", () => {
    expect(controller.changeUsername('newUsername', '123')).toEqual({
      username: 'newUsername',
      _id: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
