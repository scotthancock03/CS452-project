const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: [true, 'Please add a SKU'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, 'Please add an item name'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Please add a quantity'],
      min: [0, 'Quantity cannot be negative'],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price cannot be negative'],
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      min: [0, 'Threshold cannot be negative'],
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

// Automatic Transaction Logging Middleware
itemSchema.post('save', async function (doc, next) {
  try {
    const Transaction = mongoose.model('Transaction');

    // Automatically record SKU, name, quantity snapshot, and timestamp
    await Transaction.create({
      sku: doc.sku,
      itemName: doc.name,
      quantity: doc.quantity,
    });

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Item', itemSchema);