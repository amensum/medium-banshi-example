import express from 'express';
import { Repository } from 'typeorm';
import { BanshiConnected } from 'banshi';
import { IOrder, IUser } from '@medium-banshi-example/convention';
import BanshiHelper from './classes/BanshiHelper';

const run = async () => {
  const app = express();
  const port = process.env.PORT || 3333;

  app.use(express.json());

  const userRepositoryBanshi = new BanshiConnected<Repository<IUser>>(
    BanshiHelper.makeSender({
      url: 'http://localhost:3401/user-repository',
    }),
  );

  const orderRepositoryBanshi = new BanshiConnected<Repository<IOrder>>(
    BanshiHelper.makeSender({
      url: 'http://localhost:3402/order-repository',
    }),
  );

  app.get('/all', async (req, res) => {
    const users = await userRepositoryBanshi.$(resource => {
      return resource.find();
    });

    const orders = await orderRepositoryBanshi.$(resource => {
      return resource.find();
    });

    res.send({
      users,
      orders,
    });
  });

  app.get('/user-orders/:userId', async (req, res) => {
    const userId = +req.params.userId;

    const userOrders = await orderRepositoryBanshi.$(resource => {
      return resource.find({
        where: { userId },
      });
    });

    res.send({
      orders: userOrders,
    });
  });

  app.post('/add-order', async (req, res) => {
    const { userId, item, price } = req.body;

    const savedOrder = await orderRepositoryBanshi.$(resource => {
      return resource.save({ userId, item, price });
    });

    res.send({
      order: savedOrder,
    });
  });

  app.post('/add-user', async (req, res) => {
    const { firstName, lastName } = req.body;

    const savedUser = await userRepositoryBanshi.$(resource => {
      return resource.save({ firstName, lastName });
    });

    res.send({
      user: savedUser,
    });
  });

  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  server.on('error', console.error);
};

run();
