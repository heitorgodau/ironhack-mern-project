const mongoose = require('mongoose');
const Doctor = require('../models/Medico'); // Traz o banco
// const Movie = require('../models/Movie');

const doctor = 'schedule-medical-consultation';
mongoose.connect('mongodb://heroku_59rd6s1q:glpvds76h72jd22766pfl4asl8@ds151076.mlab.com:51076/heroku_59rd6s1q');

const doctors = [
  {
    name: 'ABADIA ROCHA FINHOLDT',
    crm: '194528',
    specialty: 'CLÍNICO GERAL',
    email: 'abadia.finholdt@saudeplus.com.br',
  },
  {
    name: 'JOAQUIM DIEGO ANTONIO DA CRUZ',
    crm: '781692',
    specialty: 'ALERGISTA',
    email: 'joaquim.cruz@saudeplus.com.br',
  },
  {
    name: 'FERNANDA RAQUEL REGINA BARROS',
    crm: '231567',
    specialty: 'CARDIOLOGISTA',
    email: 'fernanda.barros@saudeplus.com.br',
  },
  {
    name: 'MIGUEL THALES SILVA',
    crm: '215765',
    specialty: 'CIRURGIÃO CARDÍACO',
    email: 'miguel.silva@saudeplus.com.br',
  },
  {
    name: 'BIANCA JOSEFA EMILY NOVAES',
    crm: '865345',
    specialty: 'ENDOCRINOLOGISTA',
    email: 'bianca.novaes@saudeplus.com.br',
  },
  {
    name: 'HENRIQUE MURILO VITOR',
    crm: '234765',
    specialty: 'DERMATOLOGISTA',
    email: 'henrique.vitor@saudeplus.com.br',
  },
  {
    name: 'FELIPE CALEBE MELO',
    crm: '345123',
    specialty: 'OFTALMOLOGISTA',
    email: 'felipe.melo@saudeplus.com.br',
  },
  {
    name: 'JENNIFER SARAH CARDOSO',
    crm: '654372',
    specialty: 'NEUROLOGISTA',
    email: 'jennifer.cardoso@saudeplus.com.br',
  },
  {
    name: 'STEFANY ELIANE DA ROSA',
    crm: '438910',
    specialty: 'ORTOPEDISTA',
    email: 'stefany.rosa@saudeplus.com.br',
  },
  {
    name: 'OLIVER THOMAS VIANA',
    crm: '253176',
    specialty: 'PNEUMOLOGISTA',
    email: 'oliver.viana@saudeplus.com.br',
  },
];

Doctor.create(doctors, (err) => { // Cria a estrutura do banco
  if (err) { throw (err); }
  // console.log(`Created ${celebrity.length} celebritys`);
  console.log(`Created ${doctors.length} doctors`);
  mongoose.connection.close();
});


