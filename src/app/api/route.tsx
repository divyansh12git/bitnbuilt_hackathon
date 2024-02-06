"use client"

import { NextRequest,NextResponse } from "next/server";
import connectDB from "../../../database/db";
import mongoose from "mongoose";
import userSchema from "../../../database/scherma";




const blog=  mongoose.model('users',userSchema);
export async function GET(){
    
    await connectDB();
    console.log("HI")
    let data=await blog.find().exec()
    mongoose.connection.close();
    if(data==null)
     return NextResponse.json({result:"no-data"});

    return NextResponse.json(data);
}