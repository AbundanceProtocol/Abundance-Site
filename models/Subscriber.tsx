import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ISubscriber extends Document {
  fid: number;
  wallet: string;
  username: string;
  referral: number;
  email: string;
  createdAt: Date;
}

const subscriberSchema: Schema<ISubscriber> = new mongoose.Schema<ISubscriber>({
  fid: { type: Number, required: true },
  wallet: { type: String, required: false },
  username: { type: String, required: true },
  referral: { type: Number, required: false },
  email: { type: String, required: false },
  createdAt: { type: Date, default: () => new Date() }
});

const Subscriber: Model<ISubscriber> = mongoose.models.Subscriber as Model<ISubscriber> || mongoose.model<ISubscriber>('Subscriber', subscriberSchema);

export default Subscriber;
