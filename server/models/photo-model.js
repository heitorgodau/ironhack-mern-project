const mongoose = require('mongoose');

const { Schema } = mongoose;

const photoSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  consultation: [{ type: Schema.Types.ObjectId, ref: 'Consultation' }],
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

const photo = mongoose.model('photo', photoSchema);
module.exports = photo;
