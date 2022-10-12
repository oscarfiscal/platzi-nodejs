
const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService{

  constructor(){
    this.products = [];
    this.generate();
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
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
  }
  this.products.push(newProduct);
  return newProduct;
  }

  async find(){
    // find product
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id){
    // find one product

    const product  =  this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('product not found');
    }
    if(product.isBlock){
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id,changes){
    // update product
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index];
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
