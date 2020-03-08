import * as mongoose from 'mongoose';

export const BoardSchema = new mongoose.Schema({
  name: String,
  description: String,
});
