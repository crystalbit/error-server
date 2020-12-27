import http = require('http');
import { RequestHandler } from './RequestHandler';

const server = http.createServer(RequestHandler);

const port = process.env.HTTP_PORT ?? 3000;
server.listen(port, () => {
  console.log(`started on port ${port}`); // tslint:disable-line no-console
});
