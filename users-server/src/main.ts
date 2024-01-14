import express from 'express';
import { postgraphile } from 'postgraphile';
import chalk from 'chalk';

const app = express();

app.use(
  postgraphile(process.env.DATABASE_USERS, 'schema_users', {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
  })
);

const PORT = process.env.PORT_USERS || 3050;

app.listen(PORT, () => {
  console.log(
    chalk.blue(`Server users is listen in ${process.env.HOST}${PORT}/graphiql`)
  );
});
