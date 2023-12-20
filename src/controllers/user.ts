import { getUsers, deleteById, getUserById } from '../db/user'
import express from 'express'

export const getAllUsers = async(req: express.Request, res: express.Response)=>{
    try{
        const users = await getUsers()
        return res.json(users).status(200).end();
    }catch(error){
        console.log(error)
        return res.sendStatus(500)
    }
}

export const deleteUser = async (req: express.Request, res: express.Response)=>{
    try{
        const {id} = req.params
        const user = await deleteById(id)
        return res.json(user)
    }catch(error){
        console.log(error)
        return res.sendStatus(500)
    }
}

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body

    if (!username) return res.sendStatus(401);

    const user = await getUserById(id);
    
    user.username = username;
    await user.save()
    
    return res.status(200).json(user).end();

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
