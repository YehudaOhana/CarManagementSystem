import express from 'express';
import { postgraphile } from 'postgraphile';
import chalk from 'chalk';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(
  postgraphile(process.env.DATABASE_USERS, 'schema_users', {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    graphqlRoute: '/graphql',
    graphiqlRoute: '/graphiql',
    jwtPgTypeIdentifier: 'schema_users.jwt_token',
    jwtSecret: process.env.JWT_SECRET,
    ownerConnectionString: process.env.DATABASE_USERS,
  })
);

const PORT = process.env.PORT_USERS || 3050;

app.listen(PORT, () => {
  console.log(
    chalk.blue(`Server users is listen in ${process.env.HOST}${PORT}/graphiql`)
  );
});
