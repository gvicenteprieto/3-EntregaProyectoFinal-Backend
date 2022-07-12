import ProductsClass from "../class/classProducts.js";
const productsClass = new ProductsClass();
import logger from "../utils/loggers.js";

class ProductController {

  async getAllProducts(req, res) {
    try {
      logger.info(`Se registra petición GET /productos`)
      const productos = await productsClass.getAllProducts()
      logger.info(`Se obtienen productos`)
      res.json(productos)
      return productos
    }
    catch (err) {
      logger.error(`Error al obtener productos`)
      throw err
    }
  }

  async createProduct(req, res) {
    try {
      logger.info(`Se registra petición POST /productos`)
      const productoCreado = await productsClass.createProduct(req.body)
      logger.info(`Se crea producto`)
      res.json(productoCreado)
    }
    catch (err) {
      logger.error(`Error al crear producto`)
      throw err
    }
  }

  async getProductById(req, res) {
    try {
      logger.info(`Se registra petición GET /productos/${req.params.id}`)
      const producto = await productsClass.getProductById(req.params.id)
      logger.info(`Se obtiene producto`)
      res.json(producto)
    }
    catch (err) {
      logger.error(`Error al obtener producto`)
      throw err
    }
  }

  async updateProduct(req, res) {
    try {
      logger.info(`Se registra petición PUT /productos/${req.params.id}`)
      const productoActualizado = await productsClass.updateProduct(req.params.id, req.body)
      logger.info(`Se actualiza producto`)
      res.json(productoActualizado)
    }
    catch (err) {
      logger.error(`Error al actualizar producto`)
      throw err
    }
  }

  async deleteProduct(req, res) {
    try {
      logger.info(`Se registra petición DELETE /productos/${req.params.id}`)
      const productoEliminado = await productsClass.deleteProduct(req.params.id)
      logger.info(`Se elimina producto`)
      res.json(productoEliminado)
    }
    catch (err) {
      logger.error(`Error al eliminar producto`)
      throw err
    }
  }
}

export default ProductController 