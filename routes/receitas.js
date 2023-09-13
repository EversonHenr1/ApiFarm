const express = require("express");
const router = express.Router(); // Utilizando o metodo Router do express
//const mysql = require("../mysql").pool;


//Consultar todas as Receitas

router.get("/",(req,res,next)=>{
    res.status(200).send({
        mensagem:"Usando Get na rota de receitas"
    })

    
})

//Consultar somente 1 receita

router.get("/:id_receipe",(req,res,next)=>{
    const id = req.params.id_receipe
    res.status(200).send({
        mensagem:"Usando GET de um produto exclusivo",
        id: id
    })
})

//Adicionar uma receita

router.post("/",(req,res,next)=>{

    res.status(201).send({
        mensagem:"Usando POST na rota de receitas",
        produtoCriado:produto
    })
})

//Alterar uma receita

router.patch("/",(req,res,next)=>{
   
    res.status(202).send({
        mensagem:"Usando PATCH na rota de receitas"
    })
})

//Excluir uma receita

router.delete("/",(req,res,next)=>{
   
    res.status(203).send({
        mensagem:"Usando DELETE na rota de receitas"
    })
})


module.exports = router;