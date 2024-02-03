import express from "express";
import mongoose  from "mongoose";


const app=express();
const port=3001;
const uri = "mongodb+srv://Divyansh:Divyansh@cluster0.n8u9pu6.mongodb.net/?retryWrites=true&w=majority";
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}



async function run() {
    mongoose.connect(uri).then(()=>
    console.log("Mongo Atlas connected Successfully")
    ).catch(
        (err)=>console.log(err)
    );

    var result= await User.find().then((a)=>{
        console.log(a)
    }).catch((err)=>{
        console.log(err);
    })
    // console.log(result);
    mongoose.connection.close();
    
}

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    doctor:String,
    id:Number
})

const User= mongoose.models['Users'] || mongoose.model("Users",userSchema);

const user=new User({
    name:"dsad Gupta",
    email:"jjbkj.com",
    doctor:"Kush",
    id:1
});

run();


user.save();
app.get('/',(req,res)=>{
    res.send("HEllo World");
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


