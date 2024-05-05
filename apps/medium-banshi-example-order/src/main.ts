import express from 'express';
import { BanshiResource } from 'banshi';
import { BanshiHelper } from '@medium-banshi-example/convention';
import AppDataSource from './datasource';
import Order from './models/Order';

const run = async () => {
  const dataSource = await AppDataSource.initialize();

  const orderRepository = dataSource.getRepository(Order);

  const testOrder1 = new Order();
  testOrder1.userId = 1;
  testOrder1.item = "Tesla S";
  testOrder1.price = 100_000;

  const testOrder2 = new Order();
  testOrder2.userId = 2;
  testOrder2.item = "Tesla X";
  testOrder2.price = 200_000;

  await orderRepository.save([testOrder1, testOrder2]);

  const app = express();
  const port = process.env.PORT || 3333;

  app.use(express.json());

  app.post(
    '/order-repository',
    BanshiHelper.makeReceiver({
      resource: new BanshiResource(orderRepository),
    }),
  );

  app.get('/orders', async (req, res) => {
    const collection = await orderRepository.find();

    res.send({ data: collection });
  });

  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  server.on('error', console.error);
};

run();
