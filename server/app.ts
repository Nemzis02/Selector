const express = require('express');
const mongoose = require('mongoose');
const { createConnection } = require('typeorm');
const cors = require('cors');
const webpush = require('web-push');
require('reflect-metadata');
const LanguageEntity = require('./entity/Language');

const vapidKeys = {
  publicKey:
    'BGyvhaLpMTMenH5uEXcMNVlYGONvkfPMvo11pY7QdbDrzqrw20DS6jZN9P-sCWY6gQsAAJCGahm-0VJ3RlxmbeY',
  privateKey: 'xrd__KBJkafduMhTaaXq5JZV_NiG1AR1tls8tUKTudQ',
};

console.log(vapidKeys);
webpush.setVapidDetails(
  'mailto:web-push-book@gauntface.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const { Schema, connection, model } = mongoose;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/languages', {
  useNewUrlParser: true,
});

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  console.log('Mongoose has connected');
});

const languageSchema = new Schema({
  name: String,
});

const Language = model('Language', languageSchema);

const triggerPushMsg = (subscription, dataToSend) => {
  return webpush.sendNotification(subscription, dataToSend).catch((err) => {
    throw err;
  });
};

createConnection()
  .then(async (connection) => {
    app.get('/mongo', async (req, res) => {
      const languages = await Language.find();
      res.json(languages);
    });

    app.get('/postgres', async (req, res) => {
      const { ratingMin = 0, ratingMax = 11 } = req.query;

      const languages = await connection
        .getRepository(LanguageEntity)
        .createQueryBuilder('language')
        .where(`language.rating BETWEEN ${ratingMin} AND ${ratingMax}`)
        .orderBy('language.rating', 'DESC')
        .getMany();
      res.json(languages);
    });

    app.post('/trigger-push-msg', function (req, res) {
      const { subscription, payload } = req.body;
      triggerPushMsg(JSON.parse(subscription), JSON.stringify(payload));

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ data: { success: true } }));
    });

    app.listen(3040, () => {
      console.log('Server is running');
    });
  })
  .catch((error) => console.log(error));
