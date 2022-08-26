import { Body, Controller, Get, Post } from '@nestjs/common';
import { Shoe } from './shoes.schema';
import { ShoesService } from './shoes.service';

@Controller('shoes')
export class ShoesController {
  constructor(private readonly shoesService: ShoesService) {}

  @Post('add')
  create(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ) {
    const shoe: Shoe = {
      name,
      price,
      description,
    };
    return this.shoesService.create(shoe);
  }

  @Get('all')
  get() {
    return this.shoesService.get();
  }
}
