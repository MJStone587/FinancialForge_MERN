const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

let IncomeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['Job', 'Gift', 'Investment', 'Savings', 'Other'],
    required: true,
  },
  dateReceived: { type: Date, required: true },
  dateCreated: { type: Date, default: Date.now },
  //author: { type: Schema.Types.ObjectId, ref: 'User' },
  total: { type: Number, required: true },
});

IncomeSchema.set('toObject', { virtuals: true });
IncomeSchema.set('toJSON', { virtuals: true });

IncomeSchema.virtual('date_rec_formatted').get(function () {
  return this.dateReceived.toLocaleDateString(DateTime.DATE_MED);
});

IncomeSchema.virtual('date_rec_month').get(function () {
  return DateTime.fromJSDate(this.dateReceived).monthLong;
});

IncomeSchema.virtual('date_cre_formatted').get(function () {
  return this.dateCreated.toLocaleDateString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Income', IncomeSchema);
