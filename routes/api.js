var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/*
mysql> USE music
Database changed
mysql> SHOW TABLES;
+-----------------+
| Tables_in_music |
+-----------------+
| songs           |
+-----------------+
1 row in set (0.01 sec)

mysql> SELECT * FROM songs;
+----+-------------------------+------+
| id | name                    | size |
+----+-------------------------+------+
|  1 | Maria - Dana Hill       |   20 |
|  2 | Hold me - Eleonor       |   15 |
|  3 | Donwn down - Nora Hagse |   21 |
+----+-------------------------+------+
3 rows in set (0.00 sec)


*/

// GET Songs list 
router.get("/", function(req, res, next) {
  db("SELECT * FROM songs;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// GET one song 
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  const result = await db(`SELECT * FROM songs WHERE id=${id};`);
  const song = result.data[0];

  if (!song) {
    res.status(404).send();
    return;
  }

  res.send(song);
});

// INSERT song BBDD
router.post("/", async (req, res, next) => {
  const { name, size} = req.body;

  try {
    await db(`
    INSERT INTO songs (name, size) VALUES ('${name}', '${size}');
  `);

    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
});

// DELETE  song from BBD
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  const result = await db(`SELECT * FROM songs WHERE id=${id};`);
  const song = result.data[0];

  if (!song) {
    res.status(404).send();
    return;
  }

  try {
    await db(`
    DELETE FROM songs where id=${id};
  `);

    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;