// const User=require('../models/User')
// const mangoose=require('mongoose')

// const getAllUsers=async(req,res)=>{
//    try {
//      const users=await User.find({})
//      res.status(200).json({users})
//    } catch (error) {
//     console.log(error)
//     res.status(400).json({error})
//    }
// }

// const createUser=async(userData,res)=>{
// try{
//   const newUser=new User({
//     ...userData
//   })
//   await newUser.save().then((data)=>{
//     res.status(200).json({data})
//   }).catch((err)=>res.status(404).json({err}))
// }
// catch(err){
//   res.status(500).json({err})
// }
// }

// const getUserById=async(req,res)=>{
//     const user=await User.findById(req.params.id).exec()
//     if(!user){
//         return res.status(404).json({message:`no user is available ${req.params.id}`})
//     }
//     try{
//         await User.findOne({_id:req.params.id}).then((data)=>{
//                 res.status(200).json({message:"successful",data})
//         }).catch((err)=>res.status(404).json({err}))
//     }
//     catch(error){
//         res.status(404).json({error})
//     }
// }

// const deleteById=async(req,res)=>{
    
//     const user=await User.findById(req.params.id).exec()
//     if(!user){
//         return  res.status(404).json({message:`no id is available ${req.params.id}`})
//     }
//     try{
//         await User.deleteOne({_id:req.params.id}).then((data)=>{
//                 res.status(200).json({messsge:`successfully deleted ${req.params.id}`})
//         }).catch((error)=>res.status(404).json({error}))
//     }
//     catch(error){
//         res.status(404).json({error})
//     }
// }

//  const updateById=async(req,res)=>{
//     const user=await User.findById(req.params.id).exec()
//     if(!user){
//         return  res.status(404).json({message:`no id is available ${req.params.id}`})
//     }
//     try{
//         await User.findByIdAndUpdate(req.params.id,{$set:req.body}).then((data)=>{
//             res.status(200).json({message:`successfully updated ${req.params.id}`})
//         }).catch((error)=>res.status(404).json({error}))
//     }
//     catch(err){
//         res.status(404).json({err})
//     }
//  }
// module.exports={
//     getAllUsers,
//     createUser,
//     getUserById,
//     deleteById,
//     updateById
// }