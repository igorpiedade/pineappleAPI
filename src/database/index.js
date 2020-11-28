import mongoose from 'mongoose';

class Database{
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      process.env.MONGODB_PATH,
      { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
    )
  }

}



export default new Database();