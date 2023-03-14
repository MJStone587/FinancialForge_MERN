const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

let ExpenseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  paymentType: {
    type: String,
    required: true,
    enum: ['Credit', 'Cash', 'Debit', 'Check', 'Gift Card', 'Other'],
  },
  category: {
    type: String,
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
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  total: { type: Number },
});

ExpenseSchema.set('toObject', { virtuals: true });
ExpenseSchema.set('toJSON', { virtuals: true });

ExpenseSchema.virtual('date_form_med').get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_SHORT);
});

ExpenseSchema.virtual('date_form_long').get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(
    DateTime.DATETIME_HUGE_WITH_SECONDS
  );
});

ExpenseSchema.virtual('date_adjusted').get(function () {
  return this.date.toLocaleDateString('en-CA');
});

ExpenseSchema.virtual('date_month').get(function () {
  return DateTime.fromJSDate(this.date).monthLong;
});

module.exports = mongoose.model('Expense', ExpenseSchema);
