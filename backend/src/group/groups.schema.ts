import * as mongoose from 'mongoose';

export const GroupSchema = new mongoose.Schema({
  name: String,
  security: {
    type: String,
    enum: ['PRIVATE', 'PUBLIC'],
    default: 'PRIVATE',
    index: true,
  },
  description: String,
});
