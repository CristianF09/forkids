const express = require('express');
const router = express.Router();

// Centralized products mapping (live Stripe IDs)
const products = {
  "price_1RxRzjK6Qc2WK3kdz8eAiQjD": {
    pdf: "Alfabetul.pdf",
    name: "Alfabetul",
    price: 49,
    type: "individual",
    filePath: "Alfabetul.pdf",
    productId: "prod_Sg7FSlYGXYLqIx",
    paymentLink: "https://buy.stripe.com/14AaEY8R02rNfJxh0EeZ202"
  },
  "price_1RxS3KK6Qc2WK3kd97xe4ihN": {
    pdf: "Numere.pdf",
    name: "Numere",
    price: 49,
    type: "individual",
    filePath: "Numere.pdf",
    productId: "prod_Sg7Fm0E2S5Hm1k",
    paymentLink: "https://buy.stripe.com/fZu8wQ8R0c2n2WLh0EeZ201"
  },
  "price_1RxS3hK6Qc2WK3kdTL15dECJ": {
    pdf: "FormeSiCulori.pdf",
    name: "FormeSiCulori",
    price: 49,
    type: "individual",
    filePath: "FormeSiCulori.pdf",
    productId: "prod_Sg7FLP5uIieb7r",
    paymentLink: "https://buy.stripe.com/eVqdRaffo2rNfJxbGkeZ200"
  },
  "price_1RxRyVK6Qc2WK3kdnE1H9PkY": {
    pdf: "BonusCertificateDeAbsovire.pdf",
    name: "PachetComplet",
    price: 110,
    type: "complete",
    filePath: "BonusCertificateDeAbsovire.pdf",
    productId: "prod_Sg7FB1xJVJc2MV",
    paymentLink: "https://buy.stripe.com/28E3cwc3ceav0OD5hWeZ203"
  }
};

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
// Also export the mapping for internal use (e.g., webhook)
module.exports.products = products;