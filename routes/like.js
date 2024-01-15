const { default: axios } = require("axios");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router(); 
const mysql = require("../mysql").pool;
const authenticateToken = require("./authenticateToken")

//Adicionar um Like ou desLike 
router.post("/:id",authenticateToken, async (req,res)=>{
    const userID = req.user.id_usuarios; 
    const receitaID = req.params.id;
    const reacao = req.body.reacao;

    mysql.getConnection( (error,conn)=>{ 
        if(error){return res.status(500).send({error:error})}

        
        mysql.getConnection((error, conn) => {
            if (error) {
                return res.status(500).send({ error: error });
            }
        
            conn.beginTransaction((err) => {
                if (err) {
                    return res.status(500).send({ error: err });
                }
        
                // conn.beginTransaction((error)=>{
                //     if(error){return res.status(500).send({error:error})}
                    
                //     conn.query(
                //         "SELECT * from social  WHERE id_usuario =? AND id_receita=?;", 
                //     [userID,receitaID],
                //     (error,resultado,fields)=>{
                //         if(error){return res.status(500).send({error:error})}
                //         if(resultado.length === 0 ){
                //             conn.query(
                //                 "INSERT into social (reacao,id_usuario,id_receita) VALUES (?,?,?)", 
                //                 [reacao,userID,receitaID],
                //                 (error,resultado,fields)=>{
                //                     if(error){return res.status(500).send({error:error})}
                //                     res.status(200).send({ adicionado:true});
                //                 })
                conn.query(
                    "SELECT * from social  WHERE id_usuario =? AND id_receita=?;",
                    [ userID, receitaID],
                    (error, resultado, fields) => {
                        if (error) {
                            conn.rollback(() => {
                                res.status(500).send({ error: error });
                            });
                        } else {
                        if(resultado.length !==  0){}
                            conn.query(
                                "UPDATE outra_tabela SET algum_valor = ? WHERE id = ?",
                                [valorAtualizado, idAtualizado],
                                (err, result, fields) => {
                                    if (err) {
                                        conn.rollback(() => {
                                            res.status(500).send({ error: err });
                                        });
                                    } else {
                                        conn.commit((error) => {
                                            if (error) {
                                                conn.rollback(() => {
                                                    res.status(500).send({ error: error });
                                                });
                                            } else {
                                                res.status(200).send({ adicionado: true });
                                            }
                                        });
                                    }
                                }
                            );
                        }
                    }
                );
            });
        });
        
            
        }
        )
   
    
    })


    router.patch("/:id",authenticateToken,(req,res)=>{
        const receitaID = req.params.id;
        const reacao = req.body.reacao;
        const userID = req.user.id_usuarios;

        mysql.getConnection( (error,conn)=>{ 
            if(error){return res.status(500).send({error:error})}
                conn.query(
                "UPDATE social SET reacao = ? WHERE id_usuario =? AND id_receita=?;", // Comando sql para inserir dados de um usuario
                [reacao,userID,receitaID],
                (error,resultado,fields)=>{
                    if(error){return res.status(500).send({error:error})}
                    res.status(200).send({ alterado:true});
                })
                }
            )
        })

        router.get("/:id",authenticateToken,(req,res)=>{
            const receitaID = req.params.id;
            const userID = req.user.id_usuarios;
    
            mysql.getConnection( (error,conn)=>{ 
                if(error){return res.status(500).send({error:error})}
                    conn.query(
                    "SELECT * from social  WHERE id_usuario =? AND id_receita=?;", // Comando sql para inserir dados de um usuario
                    [userID,receitaID],
                    (error,resultado,fields)=>{
                        if(error){return res.status(500).send({error:error})}
                        res.status(200).send({ response: resultado});
                    })
                    }
                )
            })

            router.delete("/:id",authenticateToken,(req,res)=>{
                const receitaID = req.params.id;
                const userID = req.user.id_usuarios;
        
                mysql.getConnection( (error,conn)=>{ 
                    if(error){return res.status(500).send({error:error})}
                        conn.query(
                        "DELETE FROM social WHERE id_usuario = ? AND id_receita = ?;", // Comando sql para inserir dados de um usuario
                        [userID,receitaID],
                        (error,resultado,fields)=>{
                            if(error){return res.status(500).send({error:error})}
                            res.status(200).send({ response: resultado});
                        })
                        }
                    )
                })

    

   

module.exports = router;