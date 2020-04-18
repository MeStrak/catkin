import { Document } from 'mongoose';

export interface Board extends Document {
  readonly name: string;
  readonly description?: string;
}
