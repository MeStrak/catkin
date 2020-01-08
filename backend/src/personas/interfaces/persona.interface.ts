import { Document } from 'mongoose';

export interface Persona extends Document {
  readonly name: string;
  readonly role?: string;
  readonly likes?: string;
  readonly pains?: string;
  readonly goal?: string;
}
