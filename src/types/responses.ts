import { Document, ObjectId } from "mongoose";

export interface User {
    _id?: ObjectId; 
    email: string;
    username: string;
   
}

export interface IEmailUser extends Document, Omit<User, '_id'> {
    password: string;
}

export interface IGoogleUser extends Document, Omit<User, '_id'> {
    googleId: string;
}