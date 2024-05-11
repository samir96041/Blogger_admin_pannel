const {MongoClient}=require('mongodb')

let dbconnect =async ()=>{
    const client = new MongoClient('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('blogger-db');
      } catch (error) {
        console.error('Error connecting to MongoDB', error);
      }
}

module.exports= dbconnect