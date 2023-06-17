import express from 'express';
const port = 8080;


const app = express()

app.get("/", (req, res) => {
  res.json({
    message:
      "Bienvenidos, para acceder a los productos colocar en la url = localhost:8080/products",
  });
});

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productManager.getProducts();
    if (!limit) {
      res.json(products);
    } else {
      const limitedProducts = products.slice(0, limit);
      res.json(limitedProducts);
    }
  } catch (err) {
    res.json(err);
  }
});

app.get("/products/:pid", async (req, res) => {
  let { pid } = req.params;

  try {
    const product = await productManager.getProductById(Number(pid));
    res.json(product);
  } catch (err) {
    res.json(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
