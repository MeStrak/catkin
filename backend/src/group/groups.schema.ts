import * as mongoose from 'mongoose';

export const GroupSchema = new mongoose.Schema({
  name: String,
  description: String,
});
