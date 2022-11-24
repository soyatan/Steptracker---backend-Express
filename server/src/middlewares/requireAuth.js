const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');



const User=mongoose.model('User');


module.exports = (req,res,next) =>{
    console.log('requireauth called')
    //if(req.path==='/signin')  
    
    const {authorization} = req.headers;
    
    
//authorization = 'Bearer hdjkasdlkj'
    if(!authorization) {
        return res.status(401).send({error:"You must be logged in"});
    }
    const token = authorization.replace('Bearer ','');
    
    jwt.verify(token,'MY_SECRET_KEY1234', async (err,payload) =>{
        if(err){
            return res.status(401).send({error:'You must be logged in'});
        }
        const {userId} = payload;
        
        const user= await User.findById(userId);

        req.user=user;
        next();


     })
}