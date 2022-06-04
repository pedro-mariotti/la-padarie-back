const mysql = require('../../database').pool

//retornando todos os usuarios
exports.getAllUsers = (req, res) => {
  // esse res fica mais responsavel pelos status
  mysql.getConnection((error, conn) => {
    //erro na conexao
    // console.log('Erro GET')
    if (error) {
      return res.status(500).send({ error: error })
    }
    conn.query('SELECT * FROM user', (error, response) => {
      //esse response e da query
      //erro na query
      if (error) {
        conn.release()
        return res.status(500).send({ error: error })
      }
      res.status(200).send({
        message: 'Exibindo todos os usuarios',
        response: response //response da query
      })
    })
  })
}

exports.createUser = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error })
    }
    conn.query(
      'INSERT INTO user (name, bread) VALUES (?,?)',
      [req.body.name, req.body.bread],
      error => {
        conn.release()
        if (error) {
          console.log(req)
          return res.status(500).send({ error: error })
        }
        res.status(201).send({
          message: 'Usuario cadastrado com sucesso'
        })
      }
    )
  })
}

exports.updateUser = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error })
    }
    conn.query(
      'UPDATE user SET name = ?, bread = ? WHERE id = ?',
      [req.body.name, req.body.bread, req.body.id],
      error => {
        conn.release()
        if (error) {
          return res.status(500).send({ error: error })
        }
        res.status(200).send({
          message: 'Usuario atualizado com sucesso'
        })
      }
    )
  })
}

exports.deleteUser = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error })
    }
    console.log(req.body)
    conn.query('DELETE from user WHERE id = ?', [req.body.id], error => {
      conn.release()
      if (error) {
        return res.status(500).send({ error: error })
      }
      res.status(200).send({
        message: 'Usuario deletado com sucesso'
      })
    })
  })
}
