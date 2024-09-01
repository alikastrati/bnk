const express = require("express");
const app = express();
const db = require('./models')


app.use(express.json());

app.get('/', (req,res) => {
  res.send("Hello World!");
});


db.sequelize.sync().then(() => {
  app.listen(8080, 'localhost', () => {
    console.log("Listening on port 8080");
  });
});
