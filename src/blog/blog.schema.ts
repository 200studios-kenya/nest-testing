import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true })
  title?: string;

  @Prop({ required: true })
  content?: string;
}

const BlogSchema = SchemaFactory.createForClass(Blog);

export default BlogSchema;
