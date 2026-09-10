const mongoose = require('mongoose');
const Transaction = require('./Transaction');

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
    description: {
      type: String,
      trim: true,
      default: '',
    },
    lowStockThreshold: {
      type: Number,
      min: [0, 'Threshold cannot be negative'],
      default: 5,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Cache initial quantity when loaded from MongoDB
itemSchema.post('init', function () {
  this._originalQuantity = this.quantity;
});

// Calculate quantity delta prior to saving
itemSchema.pre('save', function () {
  this._wasNew = this.isNew;
  if (this.isNew) {
    this._quantityDelta = this.quantity;
  } else if (this.isModified('quantity')) {
    const prev = this._originalQuantity !== undefined ? this._originalQuantity : this.quantity;
    this._quantityDelta = this.quantity - prev;
  } else {
    this._quantityDelta = 0;
  }
});

// Automatically log transaction record
itemSchema.post('save', async function (doc) {
  try {
    const qtyToLog = doc._quantityDelta !== undefined ? doc._quantityDelta : doc.quantity;

    if (doc._wasNew || qtyToLog !== 0) {
      await Transaction.create({
        sku: doc.sku,
        itemName: doc.name,
        category: doc.category,
        quantity: qtyToLog,
      });
    }
  } catch (error) {
    console.error('Failed to log automatic transaction:', error.message);
  }
});

module.exports = mongoose.model('Item', itemSchema);