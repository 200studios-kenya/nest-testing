import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from '../test-utils/mongo';
import ShoeSchema, { Shoe, ShoeDocument } from './shoes.schema';
import { ShoesService } from './shoes.service';

const shoe: Shoe = {
  name: 'test',
  price: 1,
  description: 'test',
};

describe('ShoesService', () => {
  let service: ShoesService;

  const createShoe = async (): Promise<ShoeDocument> => {
    const create: ShoeDocument = await service.create(shoe);
    return create;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Shoe.name, schema: ShoeSchema }]),
      ],
      providers: [ShoesService],
    }).compile();

    service = module.get<ShoesService>(ShoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a shoe', async () => {
    const created = await createShoe();
    expect(created.name).toBe(shoe.name);
    expect(created.price).toBe(shoe.price);
    expect(created.description).toBe(shoe.description);
  });

  it('should get a list of shoes', async () => {
    await createShoe();
    const list = await service.get();
    expect(list.length).toBe(1);
    expect(list[0].name).toBe(shoe.name);
    expect(list[0].price).toBe(shoe.price);
    expect(list[0].description).toBe(shoe.description);
  });
});
