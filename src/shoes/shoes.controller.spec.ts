import { Test, TestingModule } from '@nestjs/testing';
import { ShoesController } from './shoes.controller';
import { Shoe } from './shoes.schema';
import { ShoesService } from './shoes.service';

const shoe: Shoe = {
  name: 'test',
  price: 1,
  description: 'test',
};

const mockService = {
  create: jest.fn((shoe: Shoe) => {
    return {
      name: shoe.name,
      price: shoe.price,
      description: shoe.description,
      _id: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
    };
  }),

  get: jest.fn(() => {
    return [
      {
        name: 'test',
        price: 1,
        description: 'test',
        _id: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      },
    ];
  }),
};

describe('ShoesController', () => {
  let controller: ShoesController;

  const createShoe = async (): Promise<Shoe> => {
    const create: Shoe = await controller.create(
      shoe.name,
      shoe.price,
      shoe.description,
    );
    return create;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoesController],
      providers: [ShoesService],
    })
      .overrideProvider(ShoesService)
      .useValue(mockService)
      .compile();

    controller = module.get<ShoesController>(ShoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a shoe', async () => {
    const created = await createShoe();
    expect(created.name).toBe(shoe.name);
    expect(created.price).toBe(shoe.price);
    expect(created.description).toBe(shoe.description);
  });

  it('should get a list of shoes', async () => {
    const list = await controller.get();
    expect(list.length).toBe(1);
  });
});
