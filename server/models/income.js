const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

let IncomeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['Job', 'Gift', 'Investment', 'Savings', 'Other'],
      required: true,
    },
    dateReceived: { type: Date, required: true },
    dateCreated: { type: Date, default: () => Date.now() },
    //author: { type: Schema.Types.ObjectId, ref: 'User' },
    total: { type: Number, required: true },
  },
  opts
);

//IncomeSchema.set('toObject', { virtuals: true });

IncomeSchema.virtual('date_received_med').get(function () {
  return this.dateReceived.toLocaleDateString(DateTime.DATE_MED);
});

IncomeSchema.virtual('date_created_med').get(function () {
  return this.dateCreated.toLocaleDateString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Income', IncomeSchema);
