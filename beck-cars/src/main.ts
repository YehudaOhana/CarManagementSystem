import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { connectToPostgres } from './db/connectPostgreSQL';
import cors from 'cors';
import chalk from 'chalk';
import { appRouter } from './cars/carsRouter';

const port = process.env.PORT ? Number(process.env.PORT) : 3040;

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
});

const startServer = async () => {
  try {
    await connectToPostgres();
    server.listen(port);
    console.log(chalk.green(`Server is listening on port: ${port}`));
  } catch (error) {
    console.error(chalk.red('Error during server setup:', error));
    process.exit(1);
  }
};

startServer();
