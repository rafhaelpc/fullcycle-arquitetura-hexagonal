import knex  from "knex";

const fileDB = knex({
  client: 'sqlite3',
  connection: {
    filename: './src/database/sqlite.db'
  },
  useNullAsDefault: true    
});

const memoryDB = knex({
  client: 'sqlite3',
  connection: ':memory',
  useNullAsDefault: true    
});

export {
  fileDB,
  memoryDB
};