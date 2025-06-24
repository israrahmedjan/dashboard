import mongoose from 'mongoose';

//const MONGODB_URI = "mongodb+srv://ahmedjanisrar2:Israrabc123@cluster0.9y2vd.mongodb.net/onlineshop?retryWrites=true&w=majority&appName=Cluster0";
const MONGODB_URI = process.env.MONGODB_URI

// Function to connect to MongoDB
const connectToDatabase = async () => {
  try {
    // This is to prevent repeated connections during hot reloading in development
    if (mongoose.connections[0].readyState) {
      console.log('Using existing MongoDB connection');
      return mongoose.connections[0];
    }

    console.log('Establishing new MongoDB connection');
    await mongoose.connect(MONGODB_URI);
    return mongoose.connections[0];
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectToDatabase;