
import { promises as fs } from "fs";

const path = "./productos.json";


class ProductManager {
    constructor() { }

    //1) Método getProducts: consulto TODOS los productos en mi archivo json
    async getProducts() {

        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        console.log(prods);
    }

    async getProductById(id) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const producto = prods.find(prod => prod.id === id);

        if (producto) {
            console.log(producto);
        } else {
            console.log("Producto no encontrado");
        }
    }

    async addProduct(product) {

        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.code ||
            !product.stock ||
            !product.thumbnail
        ) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        const prods = JSON.parse(await fs.readFile(path, "utf-8"));

        const prodId = prods.find(prod => prod.id === product.id);

        const prodCode = prods.find(prod => prod.code === product.code);


        if (prodId || prodCode) {
            console.log("Ya existe un producto con este id/código");
        } else {
            //Si no existe lo pusheo a ese array
            prods.push(product);

            await fs.writeFile(path, JSON.stringify(prods));
        }
    }

    async updateProduct(id, product) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const indice = prods.findIndex(prod => prod.id === id);

        if (indice != -1) {
            prods[indice].title = product.title;
            prods[indice].description = product.description;
            prods[indice].price = product.price;
            prods[indice].code = product.code;
            prods[indice].stock = product.stock;
            prods[indice].thumbnail = product.thumbnail;

            //Modifico el json con el nuevo contenido
            await fs.writeFile(path, JSON.stringify(prods));
        } else {
            console.log("Producto no encontrado");
        }
    }

    //5) Método deleteProduct: elimino un producto, utilizo su id como parámetro
    async deleteProduct(id) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const producto = prods.find(prod => prod.id === id);

        //Si encuentra al producto que lo borre del JSON, sino poneme producto no encontrado
        if (producto) {
            await fs.writeFile(path, JSON.stringify(prods.filter(prod => prod.id != id)));
        } else {
            console.log("Producto no encontrado");
        }
    }
}




//Creo la clase de los productos y autoincremento el id
class Product {
    constructor(title, description, price, code, stock, thumbnail) {
        this.title = title
        this.description = description
        this.price = price
        this.code = code
        this.stock = stock
        this.thumbnail = thumbnail
        this.id = Product.incrementarId()
    }


    static incrementarId() {
        //Si el contador de id existe, la aumento en 1. Sino la creo con id 1
        if (this.idIncrement) {
            this.idIncrement++;
        } else {
            this.idIncrement = 1;
        }
        return this.idIncrement
    }
}

//Creo los productos
const producto1 = new Product("Producto 1", "Este es el producto 1", 300, "PROD001", 10, "ejemploImagen1.jpg")
const producto2 = new Product("Producto 2", "Este es el producto 2", 600, "PROD002", 30, "ejemploImagen2.jpg")
const producto3 = new Product("Producto 3", "Este es el producto 3", 400, "PROD003", 15, "ejemploImagen3.jpg")


const productManager = new ProductManager();

async function metodos() {
 
    await productManager.getProducts();

    await productManager.getProductById(2);

    for (let x of [producto1, producto2, producto3]) {
        await productManager.addProduct(x);
    }

    //4) Actualizo un producto gracias al método updateProduct. Solamente modifico el title
    await productManager.updateProduct(2, { "title": "Producto title cambiado", "description": "Este es el producto 2", "price": 600, "code": "PROD002", "stock": 30, "thumbnail": "ejemploImagen2.jpg" });

    //5) Elimino un producto
    await productManager.deleteProduct(3);
}

//Ejecuto
metodos();