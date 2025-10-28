const express = require('express');
const router = express.Router();

// Centralized products mapping (live Stripe IDs)
const products = {
  "price_1SNBBrK6Qc2WK3kdE86Rm9w4": {
    pdf: "Alfabetul.pdf",
    name: "Alfabetul",
    price: 59,
    type: "individual",
    filePath: "Alfabetul.pdf",
    productId: "prod_Sg7FSlYGXYLqIx",
    paymentLink: "https://buy.stripe.com/3cIfZiaZ8aYjgNB39OeZ209"
  },
  "price_1SNC1IK6Qc2WK3kdB3AIEUYP": {
    pdf: "Numere.pdf",
    name: "Numere",
    price: 59,
    type: "individual",
    filePath: "Numere.pdf",
    productId: "prod_Sg7Fm0E2S5Hm1k",
    paymentLink: "https://buy.stripe.com/fZu00k9V4eavapd8u8eZ20b"
  },
  "price_1SNC2uK6Qc2WK3kdxNwaWzy9": {
    pdf: "FormeSiCulori.pdf",
    name: "FormeSiCulori",
    price: 59,
    type: "individual",
    filePath: "FormeSiCulori.pdf",
    productId: "prod_Sg7FLP5uIieb7r",
    paymentLink: "https://buy.stripe.com/6oU7sMaZ84zVeFt6m0eZ20a"
  },
  "price_1SNBAgK6Qc2WK3kdgRGn5eW2": {
    pdf: "BonusCertificatDeAbsolvire.pdf",
    name: "PachetStandard",
    price: 145,
    type: "complete",
    filePath: "BonusCertificatDeAbsolvire.pdf",
    productId: "prod_Sg7FB1xJVJc2MV",
    paymentLink: "https://buy.stripe.com/bJe9AUc3c3vR2WLcKoeZ20c"
  },
  "price_1SNCYSK6Qc2WK3kd1YKIoyo9": {
    pdf: "JocuriSiActivitatiEducative.pdf",
    name: "JocuriSiActivitatiEducative",
    price: 59,
    type: "individual",
    filePath: "JocuriSiActivitatiEducative.pdf",
    productId: "prod_TJqEqowI96zqa3",
    paymentLink: "https://buy.stripe.com/9B69AU0ku5DZ2WL4dSeZ206"
  },
  "price_1SNCDvK6Qc2WK3kdR7PskNbO": {
    pdf: "CarteDeColorat.pdf",
    name: "CarteDeColorat",
    price: 49,
    type: "individual",
    filePath: "CarteDeColorat.pdf",
    productId: "prod_TJpts2v6oxXec2",
    paymentLink: "https://buy.stripe.com/8x2cN6c3c8QbeFt9yceZ207"
  },
  "price_1SNCfLK6Qc2WK3kdVbZ9T85H": {
    pdf: "Labirinturi Magice.pdf",
    name: "LabirinturiMagice",
    price: 59,
    type: "individual",
    filePath: "Labirinturi Magice.pdf",
    productId: "prod_TJqMYITWTkXrqm",
    paymentLink: "https://buy.stripe.com/4gM4gA4AKd6rdBpeSweZ205"
  },
  "price_1SNCw4K6Qc2WK3kdOLmO6qpp": {
    files: ["Labirinturi Magice.pdf", "JocuriSiActivitatiEducative.pdf"],
    name: "PachetPromo",
    price: 99,
    type: "promo",
    productId: "prod_TJqdmBiCDbNA9I",
    paymentLink: "https://buy.stripe.com/aFa9AU3wG4zVgNB6m0eZ204"
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
