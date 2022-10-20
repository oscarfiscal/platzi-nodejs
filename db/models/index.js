const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const {Category, CategorySchema, CATEGORY_TABLE} = require('./category.model');
const {Product, ProductSchema, PRODUCT_TABLE} = require('./product.model');
const {Order, OrderSchema, ORDER_TABLE} = require('./order.model');
const {OrderProduct, OrderProductSchema, ORDER_PRODUCT_TABLE} = require('./order-product.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);

}
module.exports = setupModels;
