const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('DiaCare API andando');
});

app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto ' + PORT);
});

module.exports = app;
