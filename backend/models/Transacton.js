const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Logs date and time of the transaction
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);