var express = require('express');
var router = express.Router();
var banco = require('../app-banco');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/registrar',(req,res,next)=>{
  banco.conectar().then(()=>{
    console.log(`Chegou para registro: ${JSON.stringify(req.body)}`);

    var nome = req.body.nome;
    var telefone = req.body.senha;
    var email = req.body.email;
    var senha = req.body.senha;

    return banco.sql.query(`INSERT INTO cadastromingardi (Nome,Telefone,email,senha) values
    ('${nome}','${telefone}','${email}','${senha}')`);
  }).then(()=>{
    res.send(200);
  }).catch(err=>{
    console.log(err);
  }).finally(()=>{
    banco.sql.close();
  })
});

router.post('/entrar',(req,res,next)=>{
  banco.conectar().then(()=>{
    console.log(`Chegou para registro: ${JSON.stringify(req.body)}`);

    // Dados do formulário do organizador
    var email = req.body.email;
    var senha = req.body.senha;

    return banco.sql.query(`SELECT * FROM cadastromingardi where email = '${email}' and senha ='${senha}'`);
  }).then((consulta)=>{
    console.log(consulta.recordset);
    if(consulta.recordset.length == 1){
      res.send(consulta.recordset[0]);
    }else{
      res.sendStatus(404);
    }
  }).catch(err=>{
    console.log(err);
  }).finally(()=>{
    banco.sql.close();
  })
});


module.exports = router;
