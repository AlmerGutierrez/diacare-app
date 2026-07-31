const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('DiaCare API andando');
});

const glucosaRoutes = require('./routes/glucosa');
app.use('/glucosa', glucosaRoutes);

app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto ' + PORT);
});

module.exports = app;
