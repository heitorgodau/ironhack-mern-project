const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  reason: { type: String },
  date: { type: Date },
  hour: { type: String },
  id_patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  id_doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const appointment = mongoose.model('appointment', appointmentSchema);
module.exports = appointment;
