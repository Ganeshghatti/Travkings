import mongoose, {Mongoose} from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

interface MongoConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongoConnection | undefined;
}

//cache the connection
const cached: MongoConnection = global.mongoose || {
    conn: null,
    promise: null
};

global.mongoose = cached;


export const connectToDatabase = async() => {
    if(cached.conn) return cached.conn;

    if(!MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }

    cached.promise = 
        cached.promise ||
        mongoose.connect(MONGO_URI,{
            dbName: "travkings_db",
            bufferCommands: false,
        });
    cached.conn = await cached.promise;
    return cached.conn;
}

