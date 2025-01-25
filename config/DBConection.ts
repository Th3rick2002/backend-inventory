import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const database: string = process.env.DATABASE || '';
const username: string = process.env.USERDB || '';
const password: string = process.env.PASSWORD || '';
const hostname: string = process.env.DATABASE_URL || '';
const port: number= Number(process.env.PORT_DATABASE) || 3306;

interface IDBConection {
    database: string;
    username: string;
    password: string;
    host: string;
    port: number;
}

class DBConection implements IDBConection {
    database: string;
    username: string;
    password: string;
    host: string;
    port: number;
    private sequelize: Sequelize;

    constructor(database: string, username: string, password: string, host: string, port: number) {
        this.database = database;
        this.username = username;
        this.password = password;
        this.host = host;
        this.port = port;
        this.sequelize = new Sequelize(
            this.database,
            this.username,
            this.password,
            {
                host: this.host,
                port: this.port,
                dialect: 'mysql',
                logging: console.log,
            }
        )
    }

    getSequelizeInstance():Sequelize {
      return this.sequelize
    }

    async testConnectDatabase(): Promise<void> {
        try {
            this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

const instanceDB = new DBConection(database, username, password, hostname, port);

export default instanceDB;