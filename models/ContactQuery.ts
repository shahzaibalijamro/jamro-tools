import mongoose, { Schema, Document } from 'mongoose';

export interface IContactQuery extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

const ContactQuerySchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ContactQuery || mongoose.model<IContactQuery>('ContactQuery', ContactQuerySchema);
