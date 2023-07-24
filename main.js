class ProductManager {
  constructor() {
    this.Products = [];
  }

  static id = 0;

  addProduct(title, description, price, thumbnail, code, stock) {
    ProductManager.id++;

    this.Products.push({
      id: ProductManager.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
  }

  getProduct() {
    return this.Products;
  }

  getProductById(id) {
    if (!this.Products.find((producto) => producto.id === id)) {
      console.log("No encontrado");
    } else {
      console.log("Existe");
    }
  }
}

const productos = new ProductManager();

productos.addProduct(
  "Producto prueba",
  "Este en un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
productos.addProduct(
  "Producto prueba 1",
  "Este en un producto de prueba 1",
  201,
  "Sin imagen 1",
  "abc1234",
  10
);

console.log(productos.getProduct());

productos.getProductById(2);
