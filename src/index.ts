import { config } from 'dotenv';
import { Server } from './server/server';

function main() {
  const app: Server = new Server();
  app.listen();
}

// Solo para desarrollo
config();

main();