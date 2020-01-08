import * as mongoose from 'mongoose';

export const PersonaSchema = new mongoose.Schema({
  name: String,
  role: String,
  likes: String,
  pains: String,
  goal: String,
});
