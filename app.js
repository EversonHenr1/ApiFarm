const express = require("express") //importando express
const app = express(); //Importando um metodo do express
const morgan = require("morgan");

//importando os arquivos das rotas
const rotaReceitas = require("./routes/receitas")
const rotaUsuarios = require("./routes/usuarios");

app.use(morgan("dev")) // Irá dar um feedback de todos os requerimentos que ocorreram
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Configurando o header Cabeçario
app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Origin","*");//Permitir qualquer usuario
        res.header(
            "Access-Control-Allow-Header",
            "Origin,X-Requested-With,Content-Type,Accept,Authorization")
        if(req.method === "OPTIONS"){
            res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET");
            return res.status(200).send({});
        }
        next();
    })
   


//Criando as rotas
app.use("/recipe",rotaReceitas)
app.use("/user",rotaUsuarios)

//Quando não encontrar nenhuma rota
app.use((req,res,next)=>{
    const erro = new Error("Não encontrado");
    erro.status = 404;
    next(erro)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    return res.send({
        erro:{
            mensagem: error.message
        }
    })
})

module.exports = app; 