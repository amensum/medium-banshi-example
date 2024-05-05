import axios from 'axios';
import { Request, Response, RequestHandler } from 'express';
import { BanshiExecute, BanshiResource } from 'banshi';

abstract class BanshiHelper {
  static makeSender(params: {
    url: string
  }): BanshiExecute {
    return async (payload) => {
      const response = await axios.post(
        params.url,
        payload,
        { responseType: 'stream' },
      );

      let result = '';

      for await (const chunk of response.data) {
        result += chunk;
      }

      return JSON.parse(result);
    };
  }

  static makeReceiver<T>(params: {
    resource: BanshiResource<T>
  }): RequestHandler {
    return async (req: Request, res: Response) => {
      const result = await params.resource.$(req.body);

      if (typeof result !== 'undefined') {
        const json = JSON.stringify(result);

        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        for (const chunk of this.genSizedChunk(json, 100_000)) {
          res.write(chunk);
        }

        return res.end();
      }

      return res.end();
    };
  }

  static * genSizedChunk(value: string, chunkSize: number) {
    for (let i = 0; i < value.length; i += chunkSize) {
      yield value.slice(i, i + chunkSize);
    }
  }
}

export default BanshiHelper;
