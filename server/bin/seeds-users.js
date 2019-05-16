const mongoose = require('mongoose');

// eslint-disable-next-line import/no-unresolved

const dbName = 'project-wireheart';
mongoose.connect(`mongodb://localhost/${dbName}`);

const Users = require('../models/user-model');

const users = [
  {
    username: 'DoctorHeitor',
    password: '$2a$10$lRLO13v6ZgYjX28V3eP2tOnK3xBsc0upfOtI7qfg3diYT9rLWWVwy',
    name: 'Heitor',
  },
  {
    username: 'DoctorThanos',
    password: '$2a$10$lRLO13v6ZgYjX28V3eP2tOnK3xBsc0upfOtI7qfg3diYT9rLWWVwy',
    name: 'thanos',
  },
  {
    username: 'DoctorJef',
    password: '$2a$10$lRLO13v6ZgYjX28V3eP2tOnK3xBsc0upfOtI7qfg3diYT9rLWWVwy',
    name: 'Jefferson',
  },
];

Users.create(users, (err) => {
  if (err) { throw (err); }
  console.log(`Created ${users.length} users`);
  mongoose.connection.close();
});
