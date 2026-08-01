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
  res.json(db.glucosa);
});

router.get('/:id', (req, res) => {
  const db = leerDB();
  const medicion = db.glucosa.find(g => g.id === req.params.id);

  if (!medicion) {
    return res.status(404).json({ mensaje: 'No se encontro esa medicion' });
  }

  res.json(medicion);
});

router.post('/', (req, res) => {
  const nivel = req.body.nivel;

  if (!nivel) {
    return res.status(400).json({ mensaje: 'Falta el nivel de glucosa' });
  }

  const db = leerDB();

  const nuevaMedicion = {
    id: Date.now().toString(),
    nivel: nivel,
    momento: req.body.momento || 'sin especificar',
    fecha: new Date().toISOString()
  };

  db.glucosa.push(nuevaMedicion);
  guardarDB(db);

  res.status(201).json(nuevaMedicion);
});

router.put('/:id', (req, res) => {
  const db = leerDB();
  const medicion = db.glucosa.find(g => g.id === req.params.id);

  if (!medicion) {
    return res.status(404).json({ mensaje: 'No se encontro esa medicion' });
  }

  if (req.body.nivel) medicion.nivel = req.body.nivel;
  if (req.body.momento) medicion.momento = req.body.momento;

  guardarDB(db);
  res.json(medicion);
});

router.delete('/:id', (req, res) => {
  const db = leerDB();
  const index = db.glucosa.findIndex(g => g.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'No se encontro esa medicion' });
  }

  db.glucosa.splice(index, 1);
  guardarDB(db);
  res.status(204).send();
});

module.exports = router;
