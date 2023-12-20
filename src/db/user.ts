import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    // select: false means this field will not be extracted when searched for a user 
    authentication:{
        password:{type: String, required: true, select: false},
        salt:{type: String, select: false},
        sessionToken: {type: String, select: false}
    }
})

export const UserModel = mongoose.model('User', UserSchema)

export const getUsers = () => UserModel.find()
export const getUserByEmail = (email: string) => UserModel.findOne({email})
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    "authentication.sessionToken": sessionToken
});
export const getUserById = (id: string)=> UserModel.findById(id)
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject())
export const deleteById = (id: string) => UserModel.findByIdAndDelete(id)
export const updateById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)