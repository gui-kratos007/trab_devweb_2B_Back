import bcrypt from "bcrypt";

const saltRounds = 10;

export async function CreateHashPassword(passworld: string){
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(passworld, salt);
        return hash;
    } 
    
    catch(error){
        console.log(error);
        return null
    }
}

export async function CheckUserPassword(passworld: string, hash: string) {
    try {
      return await bcrypt.compare(passworld, hash);
    } 

    catch (error) {
      console.log(error);
      return null;
    }
}