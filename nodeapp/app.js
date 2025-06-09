const express = require('express');
const mysql = require('mysql2');
const redis = require('redis');

const app = express();
const port = process.env.PORT || 3000;

// MySQL config from env
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Redis config from env
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379
  },
  password: process.env.REDIS_PASSWORD
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL...');
  }
});

// Connect to Redis
redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.error('Redis connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello World from ITI 45 - connected to DB and Redis');
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
