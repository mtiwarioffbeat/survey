import {Pool} from 'pg'

declare global {

  var dbPool: Pool | undefined;
}
const pool =
  global.dbPool ||
new Pool({
  user: process.env.PGUSER as string | undefined,
  host: process.env.PGHOST as string | undefined,
  port: process.env.PGPORT as number | undefined,
  password: process.env.PGPASSWORD as string | undefined,
  database: process.env.PGDATABASE as string | undefined,
  // connectionString: process.env.PGCONNECTION_STRING
});

if (process.env.NODE_ENV !== "production") global.dbPool = pool;

export default pool;
