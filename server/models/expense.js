const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

let ExpenseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    paymentType: {
      type: String,
      required: true,
      enum: ['Credit', 'Cash', 'Debit', 'Check', 'Gift Card', 'Other'],
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Food',
        'Entertainment',
        'House',
        'Car',
        'Work',
        'Clothing',
        'Pet',
        'Self-Care',
        'Other',
      ],
    },
    dateReceived: { type: Date, required: true },
    dateCreated: { type: Date, default: () => Date.now() },
    total: { type: Number, required: true },
    user_id: { type: String, required: true },
  },
  opts
);

ExpenseSchema.virtual('date_received_med').get(function () {
  return this.dateReceived.toLocaleDateString(DateTime.DATE_MED);
});

ExpenseSchema.virtual('date_created_med').get(function () {
  return this.dateCreated.toLocaleDateString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Expense', ExpenseSchema);
