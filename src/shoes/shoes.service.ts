import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shoe, ShoeDocument } from './shoes.schema';

@Injectable()
export class ShoesService {
  constructor(
    @InjectModel(Shoe.name) private readonly shoeModel: Model<ShoeDocument>,
  ) {}

  async create(shoe: Shoe): Promise<ShoeDocument> {
    const created = this.shoeModel
      .create(shoe)
      .then((created) => created)
      .catch((err) => {
        throw new BadRequestException(err);
      });
    return created;
  }

  async get(): Promise<ShoeDocument[]> {
    const all = this.shoeModel
      .find()
      .sort({ createdAt: -1 })
      .then((all) => all)
      .catch((err) => {
        throw new BadRequestException(err);
      });
    return all;
  }
}
