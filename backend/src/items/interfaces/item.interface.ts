import { Document } from 'mongoose';

export interface Item extends Document {
  readonly title: string;
  readonly estimate: number;
  readonly status?: string;
  readonly description: string;
  readonly personas: string[];
  readonly group: string;
}
