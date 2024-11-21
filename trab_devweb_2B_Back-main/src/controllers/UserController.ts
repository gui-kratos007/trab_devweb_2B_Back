import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateHashPassword } from "../util/HashPassword";

const prisma = new PrismaClient();

class UserController {
    constructor(){

    }

    // Listar usuários
    async listUser(req: Request, res: Response){
        try {
            const users = await prisma.user.findMany();
  
            res.json(users)
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }

    // Inserir usuários
    async createUser(req: Request, res: Response) {
      try {
        const userdata = req.body;
  
        if (!userdata.email && !userdata.passworld) {
          return res.status(400).json({
            status: 400,
            message:
              "Você precisa passar o email e a senha no corpo da requisição",
          });
        }
  
        userdata.passworld = await CreateHashPassword(userdata.passworld);
  
        console.log(userdata.passworld);
  
        const newuserPrisma = await prisma.user.create({
          data: userdata,
        });
  
        console.log(userdata);
  
        res.json({
          status: 200,
          newuser: newuserPrisma,
        });
      } catch (error) {
        console.log(error);
        res.json({
          status: 500,
          message: error,
        });
      }
    }

    // Editar usuários
    async updateUser(req: Request, res: Response){
        try {
            const id = req.params.id;
            const body = req.body;
        
            const updatedUser = await prisma.user.update({
              where: {
                id: parseInt(id),
              },
              data: body,
            });
        
            if (updatedUser) {
              return res.json({
                status: 200,
                updatedUser: updatedUser,
              });
            }
          } catch (error) {
            console.log(error);
            res.json({
              status: 500,
              message: error,
            });
          }
    }

    // Deletar usuários
    async deleteUser(req: Request, res: Response){
        try {
            const id = req.params.id;
        
            await prisma.user.delete({
              where: {
                id: parseInt(id),
              },
            });
        
            res.status(200).json({
              status: 200,
              message: "Usuário deletado com sucesso",
            });
          } catch (error) {
            console.log(error);
            res.status(400).json({
              message: "Fala ao deletar o registro",
            });
          }
    }
}

export default new UserController();