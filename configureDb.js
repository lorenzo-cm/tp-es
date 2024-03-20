import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: '2327',
  port: 5432,
});

async function createDatabase(dbName) {
  const client = await pool.connect();
  try {
    await client.query(`CREATE DATABASE ${dbName};`);
    console.log(`Database ${dbName} created successfully.`);

  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    client.release();
  }
}

async function dropDatabase(dbName) {
    const client = await pool.connect();
    try {
      await client.query(`DROP DATABASE ${dbName};`);
      console.log(`Database ${dbName} dropped successfully.`);
  
    } catch (error) {
      console.error('Error creating database:', error);
    } finally {
      client.release();
    }
}

const dbName = "tp_es_db"

createDatabase(dbName).catch(console.error);