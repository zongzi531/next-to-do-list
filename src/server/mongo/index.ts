import mongoose from 'mongoose';
import { MONGODB_URI } from '../util/secrets';

const mongoUrl: string = MONGODB_URI as string;
mongoose.connect(mongoUrl, { useNewUrlParser: true }).then(() => {
  /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  console.log('MongoDB connection success. MongoDB is running at %s', mongoUrl);
}).catch(err => {
  console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
  // process.exit();
});
