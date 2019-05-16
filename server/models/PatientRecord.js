const mongoose = require('mongoose');

const { Schema } = mongoose;

const PatientRecord = new Schema({
  name: { type: String },
  gender: { type: String, enum: ['male', 'female', 'asexual', 'other'] },
  birthdate: { type: Date },
  address: { type: String },
  maritalStatus: { type: String },
  affiliation: { type: String },
  telResidential: { type: String },
  cellphone: { type: String },
  healthInsurance: { type: String },
  email: { type: String },
  bloodType: { type: String },
  familyHistory: { type: String },
  surgicalHistory: { type: String },
  allergies: { type: String },
  id_patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  id_doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Patient = mongoose.model('Patient', PatientRecord);
module.exports = Patient;
