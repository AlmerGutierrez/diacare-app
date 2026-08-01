const express = require('express');
const fs = require('fs');
const router = express.Router();

function leerDB() {
  const data = fs.readFileSync('./db.json');
  return JSON.parse(data);
}

function guardarDB(db) {
  fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
}

router.get('/', (req, res) => {
  const db = leerDB();
  res.json(db.comidas);
});

router.get('/:id', (req, res) => {
  const db = leerDB();
  const comida = db.comidas.find(c => c.id === req.params.id);

  if (!comida) {
    return res.status(404).json({ mensaje: 'No se encontro esa comida' });
  }

  res.json(comida);
});

router.post('/', (req, res) => {
  const descripcion = req.body.descripcion;

  if (!descripcion) {
    return res.status(400).json({ mensaje: 'Falta la descripcion de la comida' });
  }

  const db = leerDB();

  const nuevaComida = {
    id: Date.now().toString(),
    descripcion: descripcion,
    carbohidratos: req.body.carbohidratos || 0,
    fecha: new Date().toString()
  };

  db.comidas.push(nuevaComida);
  guardarDB(db);

  res.status(201).json(nuevaComida);
});

router.put('/:id', (req, res) => {
  const db = leerDB();
  const comida = db.comidas.find(c => c.id === req.params.id);

  if (!comida) {
    return res.status(404).json({ mensaje: 'No se encontro esa comida' });
  }

  if (req.body.descripcion) comida.descripcion = req.body.descripcion;
  if (req.body.carbohidratos !== undefined) comida.carbohidratos = req.body.carbohidratos;

  guardarDB(db);
  res.json(comida);
});

router.delete('/:id', (req, res) => {
  const db = leerDB();
  const index = db.comidas.findIndex(c => c.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'No se encontro esa comida' });
  }

  db.comidas.splice(index, 1);
  guardarDB(db);
  res.status(204).send();
});

module.exports = router;
