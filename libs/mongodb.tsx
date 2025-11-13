import mongoose, { Mongoose } from "mongoose";

type MongooseConnectionCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

// Attach our cache to the global object so it persists across hot reloads in development
declare global {
  // allow global `var` usage
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnectionCache | undefined;
}

let cached: MongooseConnectionCache;

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}
cached = global.mongoose;

async function connectToDatabase(): Promise<Mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn!;
}

export default connectToDatabase;