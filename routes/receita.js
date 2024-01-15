const { default: axios } = require("axios");
const express = require("express");
const router = express.Router(); // Utilizando o metodo Router do express
const mysql = require("../mysql").pool;
const authenticateToken = require("./authenticateToken")

//Consultar todas as Receitas
router.get("/", (req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query("SELECT receitas.*, usuarios.nome FROM receitas JOIN usuarios ON usuarios.id_usuarios = receitas.id_usuarios; ",
        (error,resultado,fields)=>{
            conn.release()
            if(error){return res.status(500).send({error:error})}
            return res.status(200).send({
                response:resultado
            })
        })
    })
})

//Consultar somente 1 receita
router.get("/:id_recipe",authenticateToken , async (req,res,next)=>{
    try{
        const idReceita =  parseInt(req.params.id_recipe)  // Localizar o Id da receita

        //Consultando os ingrediente de acordo com o id da receita
        const responseIngrediente = await axios.get(`http://localhost:4000/ingredient/${idReceita}`)
        const ingredientes = responseIngrediente.data

        //Consultando todos os procedimentos de acordo com o id da receita
        const responseProcedimento = await axios.get(`http://localhost:4000/proceeding/${idReceita}`)
        const procedimentos = responseProcedimento.data

        mysql.getConnection((error,conn)=>{
            if(error){return res.status(500).send({error:error})}
            conn.query( "SELECT * FROM receitas WHERE id_receitas = ?",
            [idReceita],
            (error,resultado,fields)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                const idUsuario = resultado[0].id_usuarios;

                axios.get(`http://localhost:4000/user/${idUsuario}`).then((responseUser) => {
                        //Consultando todos os usuarios com o id da receita
                        const usuario = responseUser.data;
                        //Adicionando no objeto resultado, umas array com todos os ingredientes
                        resultado[0].ingredientes = ingredientes.response[0]
                        //Adicionando no objeto resultado, umas array com todos os procedimentos
                        resultado[0].procedimentos = procedimentos.response
                        //Adicionando no objeto resultado, um objeto com dados do usuarios
                        resultado[0].usuario ={ "nome": usuario.response[0].nome , "id_usuario":  usuario.response[0].id_usuarios}

                        //Mandando a resposta 
                        res.status(200).send({
                            response:resultado,
                        });
                    })
                    .catch((error) => {
                        if(error){return res.status(500).send({error:error})}
                    });
            });
        })
    }catch(error){
        if(error){return res.status(500).send({error:error})}
    }
}) 


//Consultar todas as receitas de 1 usuarios

router.patch("/", authenticateToken, (req,res,next)=>{
    const id = req.user.id_usuarios;
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query("SELECT * from receitas where id_usuarios = ?",
       [id],
        (error,resultado,fields)=>{
            conn.release()
            if(error){return res.status(500).send({error:error})}
            return res.status(200).send({
                response:resultado
            })
        })
    }) 
})


//Adicionar uma receita
router.post("/", authenticateToken, async (req,res,next)=>{
    let responseRecipe; //Guardar respostas das inserções da receita
    let responseProcedimento; //Guardar respostas dos Procedimentos
    let responseIngrediente; //Guardar respostas dos Ingredientes

    mysql.getConnection( (error,conn)=>{ //query sql para Criar uma receita
        if(error){return res.status(500).send({error:error})}
         conn.query(
            "INSERT INTO receitas (titulo,porcoes,tempo,descricao,dificuldade,id_usuarios,img_url) VALUES (?,?,?,?,?,?,?);", // Comando sql para inserir dados de um usuario
            [req.body.titulo,req.body.porcoes,req.body.tempo,req.body.descricao,req.body.dificuldade,req.user.id_usuarios,req.body.img],
            (error,resultado,fields)=>{
                if(error){return res.status(500).send({error:error})}

                //Levar os Objetos da forma correta para Post
                const bodyProcedimento = {"procedimentos":req.body.procedimentos}
                const bodyIngrediente = {"ingredientes":req.body.ingredientes}

                //Fazer o Post no Ingrediente
                const postIngrediente =  axios.post(`http://localhost:4000/ingredient/${resultado.insertId}`,bodyIngrediente)
                .then((response)=>{
                    responseIngrediente = response.data
                })
                .catch((error)=>{
                    if(error){return res.status(500).send({error:error})}
                })
                
                //Fazer o Post no Procedimento
                const postProcedimento = axios.post(`http://localhost:4000/proceeding/${resultado.insertId}`,bodyProcedimento)
                .then((response)=>{
                    responseProcedimento = response.data
                })
                .catch((error)=>{
                    if(error){return res.status(500).send({error:error})}
                })
            }
        )
    })
    res.status(201).send({ // Mandar uma mensagem de sucesso
        mensage:"Receita criada com sucesso!"
    }) 
})

//Alterar uma receita


    //Alterar uma receita
router.put("/",(req,res,next)=>{
    const id =req.body.id_receitas; // pega o id 
    const titulo = req.body.titulo; // pega o titulo
    const porcoes = req.body.porcoes; //Pega a porcoes
    const tempo = req.body.tempo; //Pega a tempo
    const descricao = req.body.descricao; //Pega a descricao
    const dificuldade = req.body.dificuldade; //Pega a dificuldade
    const url = req.body.url
    let arrayValue;
    let query; //Query para o banco
    if(titulo && porcoes && tempo && descricao && dificuldade){
        query = "UPDATE receitas SET titulo = ?, porcoes= ?, tempo= ?, descricao= ?, dificuldade= ?,img_url= ? WHERE id_receitas = ?;"
        arrayValue = [titulo,porcoes,tempo,descricao,dificuldade,url,id]
    }else if(titulo){
        query = "UPDATE receitas SET titulo = ? WHERE id_receitas = ?;"
        arrayValue = [titulo,id]
    }else if(porcoes){
        query = "UPDATE receitas SET porcoes= ? WHERE id_receitas = ?;"
        arrayValue = [porcoes,id]
    }else if(tempo){
        query = "UPDATE receitas SET tempo= ? WHERE id_receitas = ?;"
        arrayValue = [tempo,id]
    }else if(descricao){
        query = "UPDATE receitas SET descricao= ? WHERE id_receitas = ?;"
        arrayValue = [descricao,id]
    }else if(dificuldade){
        query = "UPDATE receitas SET dificuldade= ? WHERE id_receitas = ?;"
        arrayValue = [dificuldade,id]
    }
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            query,
            arrayValue,
            (error,resultado,field)=>{
                conn.release()
                if(error){return res.status(500).send({error:error})}
                return res.status(202).send({
                    mensagem:"Alterado com sucesso"
                })
            })
    })
})

//Excluir uma receita
router.delete("/:id",authenticateToken,async(req,res,next)=>{
   //Variaveis para armazenar as respostas
   let responseProcedimento;
   let responseIngrediente;
   let responseRecipe;
   let id =  parseInt(req.params.id);
   
   //fazer o delete no procedimento
   const deleteProcedimento = await axios.delete(`http://localhost:4000/proceeding/${id}`);
   responseProcedimento = deleteProcedimento.data;

   //fazer o delete no ingrediente
   const deleteIngrediente =  await axios.delete(`http://localhost:4000/ingredient/${id}`);
   responseIngrediente = deleteIngrediente.data

  
   mysql.getConnection((error,conn)=>{ //fazer uma query no banco de dados para excluir as receitas
    if(error){return res.status(500).send({error:error})}
    conn.query("DELETE FROM receitas WHERE id_receitas = ?;",
    [id],
    (error,resultado,fields)=>{
        conn.release()
        if(error){return res.status(500).send({error:error})}
       responseRecipe = resultado
    })
    })

    return  res.status(202).send({ 
        mensage:"Sua receita foi excluida"
    })
})



module.exports = router;