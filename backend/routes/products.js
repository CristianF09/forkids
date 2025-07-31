const express = require('express');
const router = express.Router();
const products = require('../config/products');

// Get all products
router.get('/', (req, res) => {
  try {
    const productsList = Object.entries(products).map(([priceId, product]) => ({
      priceId,
      name: product.name,
      filePath: product.filePath,
      paymentLink: product.paymentLink,
      productId: product.productId
    }));
    
    res.json({
      success: true,
      products: productsList
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error fetching products' 
    });
  }
});

// Get product by price ID
router.get('/:priceId', (req, res) => {
  try {
    const { priceId } = req.params;
    const product = products[priceId];
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Product not found' 
      });
    }
    
    res.json({
      success: true,
      product: {
        priceId,
        name: product.name,
        filePath: product.filePath,
        paymentLink: product.paymentLink,
        productId: product.productId
      }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error fetching product' 
    });
  }
});

module.exports = router; 