const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConsultationSchema = new Schema({
  reason: { type: String },
  cid: { type: String },
  exam: { type: String },
  symptoms: { type: String },
  conduct: { type: String },
  id_patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  id_doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Consultation = mongoose.model('Consultation', ConsultationSchema);
module.exports = Consultation;
