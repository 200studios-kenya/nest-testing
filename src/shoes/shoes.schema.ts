import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShoeDocument = Document & Shoe;

@Schema({ timestamps: true })
export class Shoe {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  description: string;
}

const ShoeSchema = SchemaFactory.createForClass(Shoe);

export default ShoeSchema;
