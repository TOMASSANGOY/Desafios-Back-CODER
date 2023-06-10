const fs = require('fs')

class ProductManager {

    #precioBaseDeGanancia
    constructor(filename) {
        this.filename = filename
        this.format = 'utf-8'
        this.products = []
    }

    getProduct = async() => {

        try{
            //lee el contnido del archivo
            const data = await fs.promises.readFile(this.filename, this.format)
            //Convertimos el string a objeto
            dataObj = JSON.parse(data)

            return dataObj
        } catch(error){
            console.log('No se encontró el archivo, se devuelve vacío');
            return []
        }

    }

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

    addProduct = async (name, descripcion, price, thumbnail, stock) => {
        const product = {
            id: this.getNextID(),
            name,
            descripcion: "Este es un metodo de prueba",
            price: price,
            stock: stock || 50,
            thumbnail: "Sin imagen"
        }
        //conseguimos lista 
        const list = await this.getProduct()
        //agregamos el producto a la lista
        list.push(product)

        //escribimos archivo o sobreescribe si ya existe
        await fs.promises.writeFile(this.filename, JSON.stringify(list))
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.log('El producto no fue encontrado.')
        }
        return product;
    }

    
}

async function run() {
    const manager = new ProductManager('user,json')
    await manager.addProduct('Erick', 'Osuna', 35, 'Backend')

    console.log(await manager.getProduct());

}

run()




