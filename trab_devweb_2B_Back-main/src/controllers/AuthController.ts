import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CheckUserPassword } from "../util/HashPassword";
import { decodeToken, generateJWToken } from "../util/JWT";

const prisma = new PrismaClient();

class AuthController{
    constructor(){

    }

    async me(req: Request, res: Response){
        try{
            const token = req.body.token;
            const decodedUser = await decodeToken(token);
            return res.json({
                status: 200,
                user: decodedUser
            })

        }catch(e){
            return res.json({
                status: 500,
                message: "Ocorreu um erro interno."
            })
        }
    }

    async SignIn(req: Request, res: Response){
        try {
            const { email, passworld } = req.body;

            if(!email || !passworld){
                return res.json({
                    status: 400,
                    message: "Esse email ou senha não foram encontrados."
                });
            }

            const user = await prisma.user.findFirst({
                where: {
                    email,
                },
            });

            if(!user){
                
                return res.json({
                    status: 401,
                    message: "Esse email não existe. "
                });
            }

            const passwordCheck = await CheckUserPassword(passworld, user.passworld);

            if(!passwordCheck){
                return res.json({
                    status: 401,
                    message: "Usuário ou senha inválidos."
                });
            }

            
            const token = await generateJWToken(user);
            return res.json({
                status: 200,
                user:{
                    token
                },
                message: "Autenticação foi bem sucedida!"
            });
        }

        catch(error) {
            
            console.log(error);
            res.json({
                status: 500,
                message: error,
            });
        }
    }

    async SignUp(){

    }

    async SignOut(){
        
    }

}

export default new AuthController();
