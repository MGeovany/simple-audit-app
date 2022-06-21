const Model = require('../Models/usersModel')

function createUser(req, res) {
  const user = new Model({
    username: req.body.username,
    password: req.body.password,
    access: req.body.access
  })
  user.save(function (error, user) {
    if (error) {
      res.status(500).send('No se ha podido agregar.')
    } else {
      res.status(200).json(user)
    }
  })
}

function updateUser(req, res) {
  Model.findById(req.params.id, function (err, user) {
    if (err) res.status(500).send('Error en la base de datos')
    else {
      if (user != null) {
        user.username = req.body.username
        user.password = req.body.password
        user.access = req.body.access
        user.save(function (error, user1) {
          if (error) res.status(500).send('Error en la base de datos')
          else {
            res.status(200).send('Modificado exitosamente')
          }
        })
      } else res.status(404).send('No se encontro esa persona')
    }
  })
}

function getAllUsers(req, res) {
  Model.find({}, function (err, users) {
    if (err) res.status(500).send('Error en la base de datos')
    else {
      if (users != null) {
        res.status(200).json(users)
      } else res.status(404).send('No se encontro la base de datos')
    }
  })
}

function getbyName(req, res) {
  Model.find({ username: req.query.username }, function (err, users) {
    if (err) res.status(500).send('Error en la base de datos6 ')
    else {
      if (users != null) {
        res.status(200).json(users)
      } else res.status(404).send('No se encontro la base de datos')
    }
  })
}

function getbyID(req, res) {
  Model.findById(req.params.id, function (err, users) {
    if (err) res.status(500).send('Error en la base de datos4 ')
    else {
      if (users != null) {
        res.status(200).json(users)
      } else res.status(404).send('No se encontro esa persona')
    }
  })
}

function deleteUser(req, res) {
  Model.findByIdAndRemove(req.params.id, function (err, users) {
    if (err) res.status(500).send('Error en la base de datos')
    else {
      if (users != null) {
        res.status(200).send('Eliminado exitosamente')
      } else res.status(404).send('No se encontro esa persona')
    }
  })
}

function authUser(req, res) {
  Model.findOne(
    { username: req.body.username, password: req.body.password },
    function (err, user) {
      if (err) res.status(500).send('Error en la base de datos')
      else {
        if (user != null) {
          user.password = ''
          res.status(200).json(user)
        } else res.status(404).send('No se encontro esa persona')
      }
    }
  )
}

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  getbyName,
  getbyID,
  deleteUser,
  authUser
}
