require("rootpath")();
const express = require('express');
const app = express();

const userDb = require("../datasource/userDB.js");


app.get('/', getAll);

app.get('/:idusuario', getByidu);

app.post('/', create);

app.put('/:idusuario', update);

app.delete('/del/:idusuario', eliminar);

app.delete('/:iduser', eliminacionlogica);

// Metododo para listar todos los usuarios
function getAll(req, res) {
    userDb.getAll(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para buscar usuarios por su id
function getByidu(req, res) {
    userDb.getByidu(req.params.idusuario,function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para agregar usuarios
function create(req, res) {
    userDb.create(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para modificar usuarios
function update(req, res) {
    userDb.update(req.params.idusuario, req.body, function (result) {
        if (result.code == 3) {
            res.status(500).send(err);
        } else if (result.code == 2) {
            res.status(404).json(result);
        } else {
            res.json(result);
        }
    });
}
// Metodo par eliminar fisicmente usuarios de la base de datos
function eliminar(req, res) {
    userDb.delete(req.params.idusuario,  function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.detail.affectedRows == 0) {
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}
// Metodo par eliminar usuarios cambiando el estado a 0
function eliminacionlogica(req, res) {
    userDb.logdelete(req.params.idusuario, function (result) {
        if (result.code == 3) {
            res.status(500).send(err);
        } else if (result.code == 2) {
                res.status(404).json(result);  
        } else if (result.code == 1) {      
            res.json(result);
        }
    });
}

module.exports = app;