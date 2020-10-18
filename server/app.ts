const express = require('express');
const mongoose = require('mongoose');
const { createConnection } = require('typeorm');
const cors = require('cors');
require('reflect-metadata');
const LanguageEntity = require('./entity/Language');

const { Schema, connection, model } = mongoose;

const app = express();

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

    app.listen(3040, () => {
      console.log('Server is running');
    });
  })
  .catch((error) => console.log(error));
