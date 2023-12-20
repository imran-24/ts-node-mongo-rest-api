import { getUserBySessionToken } from '../db/user';
import express from 'express'
import { merge, get } from "lodash";

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try{

        const {id} = req.params
        const currentUserId = get(req, 'identity._id') as string
        if(!currentUserId) return res.sendStatus(403)

        if(currentUserId.toString() !== id){
            return res.sendStatus(403)
        }

        next()
    }catch(error){
        console.log(error)
        return res.sendStatus(500)
    }
}

export const isAuthenticated = async(req: express.Request, res: express.Response, next: express.NextFunction) =>{
    try{
        const sessionToken =  req.cookies["IMRAN-AUTH"];
        
        if(!sessionToken) return res.sendStatus(403)

        const existingUser = await getUserBySessionToken(sessionToken)

        if(!existingUser) return res.sendStatus(403)
        // merge function make a union call of 2 object and make a single onject
        // there is not field called identity in req . 
        // indentity is merged into req  
        merge(req, {identity: existingUser})
        return next()
    }catch(error){
        console.log(error)
        return res.sendStatus(500)
    } 
}