import { Module } from '@nestjs/common';
import { ShoesService } from './shoes.service';
import { ShoesController } from './shoes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import ShoeSchema, { Shoe } from './shoes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shoe.name, schema: ShoeSchema }]),
  ],
  controllers: [ShoesController],
  providers: [ShoesService],
})
export class ShoesModule {}
