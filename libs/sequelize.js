const { Sequelize } = require('sequelize');
const { connect } = require('../routes/products.router');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
/* const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
 */ //conection bd postgres

 const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const sequelize = new Sequelize(URI, {
  /* dialect: 'postgres', */ // The 'dialect' property is not required for postgres
  dialect: 'mysql',
  logging: true,
});

setupModels(sequelize);


module.exports = sequelize;
