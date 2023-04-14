const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let sqlText = 'SELECT * FROM "tasks";';

    pool.query(sqlText)
    .then((dbRes) => {
        let tasks = dbRes.rows;
        res.send(tasks)
    }).catch((dbErr) => {
        console.log('SQL qurey in GET /koalas failed')
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    let name = req.body.name;
    let description = req.body.description;

    sqlText = `
    INSERT INTO "tasks"
    ("name", "description", "is_completed")
    VALUES
    ($1, $2, $3);`

    sqlValues = [name, description, false]

    pool.query(sqlText, sqlValues)
    .then((dbRes) => {
        res.sendStatus(201);
    }).catch((dbErr) => {
        console.log('SQL query in POST /koalas failed')
    })
})

router.put('/:id', (req, res) => {
    let idToUpdate = req.params.id;
    let sqlText = `
    UPDATE "tasks"
    SET "is_completed"=TRUE
    WHERE id=$1;
    `
    let sqlValues = [idToUpdate];
    pool.query(sqlText, sqlValues)
    .then((dbRes) => {
        res.sendStatus(201);
    }).catch((dbErr) => {
        res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
    let idToDelete = req.params.id;
    console.log(idToDelete);
     let sqlText = `
     DELETE FROM "tasks"
     WHERE "id"=$1;`

     let sqlValues = [idToDelete];

     pool.query(sqlText, sqlValues)
     .then((dbRes) => {
        res.sendStatus(201)
     }).catch((dbErr) => {
        res.sendStatus(500);
     })
})

module.exports = router;