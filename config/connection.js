const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://matthewpool:HY8awjOaITdAEuRW@cluster0.m22rgvn.mongodb.net/';

connect(connectionString);

module.exports = connection;