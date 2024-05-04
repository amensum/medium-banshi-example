import express from 'express';
import AppDataSource from './datasource';
import User from './models/User';

const run = async () => {
  const dataSource = await AppDataSource.initialize();

  const userRepository = dataSource.getRepository(User);

  const testUser1 = new User();
  testUser1.firstName = "Elon";
  testUser1.lastName = "Musk";

  const testUser2 = new User();
  testUser2.firstName = "Jack";
  testUser2.lastName = "Daniels";

  await userRepository.save([testUser1, testUser2]);

  const app = express();
  const port = process.env.PORT || 3333;

  app.get('/users', async (req, res) => {
    const collection = await userRepository.find();

    res.send({ data: collection });
  });

  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  server.on('error', console.error);
};

run();
