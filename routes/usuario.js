const express = require("express")
const router = express.Router();
const mysql = require("../mysql").pool
const jwt = require("jsonwebtoken");
const authenticateToken = require("./authenticateToken")

const SECRET_KEY = "keyApiFarm"

//Fazer o Login
router.post("/login", (req,res,next)=>{
    const {email,senha} = req.body;
    let final;
    //SELECT * FROM `usuarios` WHERE  email ="everson@gmail" and senha = "everson781"
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            "SELECT * FROM `usuarios` WHERE  email = ? and senha = ?",
            [email,senha],
            (error,resultado,fields)=>{
                conn.release();
                if(resultado != ""){
                        const token = jwt.sign(resultado[0],SECRET_KEY);
                        return  res.status(200).send({token:token})
                } 
                else{
                    return res.status(401).send({response:"sem cadastro!"})
                }
                   
            }
        )
    
    })


})

//Consultar todos os Usuarios
router.get("/",authenticateToken,(req,res,next)=>{
    return res.status(200).send({id:req.user.id_usuarios,nome:req.user.nome})
})



//Consultando  somente 1 usuario
router.get("/id",authenticateToken,(req,res,next)=>{
    //Identificação passada pelo parametro
    const id_user = req.user.id_usuarios;
    console.log(id_user)
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            "SELECT * FROM  usuarios WHERE id_usuarios = ?;",
            [id_user],
            (error,resultado,fields)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}

                return res.status(200).send({response:resultado}) //Irá Mandar um objeto com todos os dados daquele id
            }
        )
    })
})

router.get("/:id",(req,res,next)=>{
    //Identificação passada pelo parametro
    const id_user = req.params.id;
    console.log(id_user)
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            "SELECT * FROM  usuarios WHERE id_usuarios = ?;",
            [id_user],
            (error,resultado,fields)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                return res.status(200).send({response:resultado}) //Irá Mandar um objeto com todos os dados daquele id
            }
        )
    })
})

//Consultar 1 dado especifico de 1 usuario
router.get("/:id_user/:colums",(req,res,next)=>{
    const id = req.params.id_user; //id
    const coluna = req.params.colums; //coluna desejada
    let query; //comando sql 

    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        switch (coluna){
            case "nome":
                query = "SELECT nome FROM usuarios WHERE id_usuarios = ?;" // Pegar o nome de acordo com id
                break;
            case "email":
                query = "SELECT email FROM usuarios WHERE id_usuarios = ?;" // Pegar o email de acordo com id
                break;
            case "senha":
                query = "SELECT senha FROM usuarios WHERE id_usuarios = ?;" // Pegar a senha de acordo com id
                break;
            default:
                query = "";
        }
        conn.query(
           query,
            [id],
            (error,resultado,fields)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                
                return res.status(200).send({response:resultado}) //Irá Mandar um objeto com 1 dado expecficos do id
            }
        )
    })

})

//Adicionando um usuarios
router.post("/",(req,res,next)=>{

    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            "INSERT INTO usuarios (nome,email,senha) VALUES (?,?,?);", // Comando sql para inserir dados de um usuario
            [req.body.nome, req.body.email, req.body.senha],
            (error,resultado,fields)=>{
                if(error){return res.status(500).send({error:error})}
                const usuario ={
                    nome:req.body.nome,
                    senha:req.body.senha,
                    email:req.body.email,
                    id_usuarios:resultado.insertId
                }
                const token = jwt.sign(usuario,SECRET_KEY);
                return res.status(201).send({
                    mensage:"Usuario adicionado com Sucesso",
                    id_user:resultado.insertId,
                    token:token
                })
            }
        )
    })
})

//Alterar um usuario

router.put("/",authenticateToken,(req,res,next)=>{
    
    mysql.getConnection((error,conn)=>{
        //Guardando os dados adquiridos
        const email = req.body.email
        const nome = req.body.nome
        const senha = req.body.senha
        const id = req.user.id_usuarios;
        //Array com os valores
        let values
        //Validação
        if(email && senha &&nome){ // Alterar todos os campos
            query =  "UPDATE usuarios SET nome = ?, senha = ?, email = ? WHERE id_usuarios =?;"
            values = [nome,senha,email,id]
        }else if(email && senha){ //Alterar email e senha
            query =  "UPDATE usuarios SET senha = ?, email = ? WHERE id_usuarios =?;"
            values = [senha,email,id]
        }else if(senha && nome){ //Alterar senha e nome
            query = "UPDATE usuarios SET senha= ?, nome = ? WHERE id_usuarios = ?;"
            values = [senha,nome,id]
        }else if(nome && email){ //Alterar nome
            query = "UPDATE usuarios SET nome= ?, email= ? WHERE id_usuarios = ?;"
            values = [nome,email,id]
        }else if(email || senha || nome){ // Alterar somente 1 campo
           const atributo =  Object.keys(req.body);
           const valor =Object.values(req.body); 
           query = `UPDATE usuarios SET ${atributo} = ? WHERE id_usuarios = ?;`
           values= [valor,id]
        }
        if(error){return res.status(500).send({error:error})}
        conn.query(
                query,
                values,(error,resultado,fields)=>{
                    conn.release();
                    if(error){return res.status(500).send({error:error})}
                    res.status(202).send({
                        mensagem:"Usuario Alterado com sucesso",
                    })
                }
        )
    })  
})

//Excluindo um usuario
router.delete("/",(req,res,next)=>{
    const id = req.body.id;
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            "DELETE FROM usuarios WHERE id_usuarios = ?;", // Comando sql para DELETA um usuario
            [id],
            (error,resultado,fields)=>{
                if(error){return res.status(500).send({error:error})}
                return res.status(202).send({
                    mensage:`Usuario ${id} excluido com sucesso`
                })
            }
        )
    })
})


module.exports = router;