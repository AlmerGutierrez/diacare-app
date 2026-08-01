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
  res.json(db.medicamentos);
});

router.get('/:id', (req, res) => {
  const db = leerDB();
  const med = db.medicamentos.find(m => m.id === req.params.id);

  if (!med) {
    return res.status(404).json({ mensaje: 'No se encontro ese medicamento' });
  }

  res.json(med);
});

router.post('/', (req, res) => {
  const nombre = req.body.nombre;

  if (!nombre) {
    return res.status(400).json({ mensaje: 'Falta el nombre del medicamento' });
  }

  const db = leerDB();

  const nuevo = {
    id: Date.now().toString(),
    nombre: nombre,
    dosis: req.body.dosis || null,
    tipo: req.body.tipo || 'otro',
    fecha: new Date().toISOString()
  };

  db.medicamentos.push(nuevo);
  guardarDB(db);

  res.status(201).json(nuevo);
});

router.put('/:id', (req, res) => {
  const db = leerDB();
  const med = db.medicamentos.find(m => m.id === req.params.id);

  if (!med) {
    return res.status(404).json({ mensaje: 'No se encontro ese medicamento' });
  }

  if (req.body.nombre) med.nombre = req.body.nombre;
  if (req.body.dosis) med.dosis = req.body.dosis;
  if (req.body.tipo) med.tipo = req.body.tipo;

  guardarDB(db);
  res.json(med);
});

router.delete('/:id', (req, res) => {
  const db = leerDB();
  const index = db.medicamentos.findIndex(m => m.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'No se encontro ese medicamento' });
  }

  db.medicamentos.splice(index, 1);
  guardarDB(db);
  res.status(204).send();
});

module.exports = router;
