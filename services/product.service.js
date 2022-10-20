
const faker = require('faker');
const boom = require('@hapi/boom');
const {Op}=require('sequelize');

/* const pool = require('../libs/postgres'); */ // coneccion a bd por pool
const {models} = require('../libs/sequelize'); // coneccion a bd por sequelize

class ProductsService{

  constructor(){
    this.products = [];
    this.generate();
  /*   this.pool = pool;
    this.pool.on('error',(err)=> console.log(err)); */
  }

  generate(){
    const limit =  100;
    for (let index=0; index < limit; index++){
        this.products.push({
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(),10),
            image: faker.image.imageUrl(),
            isBlock: faker.datatype.boolean()

        });
    }
  }
  async create(data){
    // create product
  const newProduct = await models.Product.create(data);
  return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(offset);
    }
    if (query.price) {
      options.where.price = query.price;
    }


    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: parseInt(price_min),
        [Op.lte]: parseInt(price_max),
      };
    }

    const products = await models.Product.findAll(options);
    return products;
  }


  async findOne(id){
    // find one product

    const product = await models.Product.findByPk(id, {
      include: ['category']
    });
    if(!product){
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id,changes){
    // update product
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id){
    // delete product
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products.splice(index,1);
    return { id };
  }

}

module.exports = ProductsService;
