class ProductManager {

    #precioBaseDeGanancia
    constructor() {
        this.products = []
    }

    getProduct = () => { return this.products }

    getNextID = () => {
        const count = this.products.length
        // [0, 1, 2, 3, 4, 5]
        // Count = 6

        if (count > 0) {

            // Ultimo indice es el 5
            return this.products[count - 1].id + 1
        } else {
            return 1
        }
    }

    addProduct = (name, descripcion, price, thumbnail, stock) => {
        const product = {
            id: this.getNextID(),
            name,
            descripcion: "Este es un metodo de prueba",
            price: price,
            stock: stock || 50,
            thumbnail: "Sin imagen"
        }

        this.products.push(product)
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.log('El producto no fue encontrado.')
        }
        return product;
    }

}

const manager = new ProductManager()
manager.addProduct('Lolapaluza', 100, 0,)
manager.addProduct('Afterlife', 240, 20, )
console.log(manager.getProductById(3))
console.log(manager.getProduct())