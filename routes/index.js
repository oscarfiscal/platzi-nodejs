
const exppress = require('express');
const productsRouter = require('./products.router');
/* const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router'); */

function routerApi(app) {
  const router = exppress.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
 /*  app.use('/users', usersRouter);
  app.use('/categories', categoriesRouter); */
}

module.exports = routerApi;
