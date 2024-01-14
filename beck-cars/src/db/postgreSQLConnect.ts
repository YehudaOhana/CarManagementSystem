import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import chalk from 'chalk';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_CARS, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const connectToPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log(chalk.blue('Connected to PostgreSQL'));
  } catch (err) {
    console.log(chalk.red('Error connecting to PostgreSQL:', err));
  }
};
