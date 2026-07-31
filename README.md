# DiaCare - Tarea 3 Programacion III

Este es un pequeño CRUD que hice para la tarea de Git y Git Flow. La idea del proyecto
es llevar el control de tres cosas relacionadas con la diabetes:

- Mediciones de glucosa
- Medicamentos o insulina que se aplique la persona
- Comidas y cuantos carbohidratos tienen

Lo hice con Node y Express, y en vez de usar una base de datos de verdad use un archivo
db.json para guardar todo, para no complicar tanto el proyecto.

## Como correrlo

```
npm install
npm start
```

Corre en el puerto 3000.

## Rutas que tiene

Para glucosa: GET /glucosa , GET /glucosa/:id , POST /glucosa , PUT /glucosa/:id , DELETE /glucosa/:id

Para medicamentos: GET /medicamentos , GET /medicamentos/:id , POST /medicamentos , PUT /medicamentos/:id , DELETE /medicamentos/:id

Para comidas: GET /comidas , GET /comidas/:id , POST /comidas , PUT /comidas/:id , DELETE /comidas/:id

## Ramas del proyecto

Segui la metodologia de Git Flow con las ramas main, develop y qa, y cree 5 ramas de
feature/hotfix para ir agregando cada parte del proyecto poco a poco, con sus pull
requests hacia develop, qa y main.
