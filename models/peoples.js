const mongoose=require('mongoose')
const peopleSchema=mongoose.Schema({
    name:{
    type:String,
    required:true,
    trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
        },
        mobile:{
            type:String,
            required:true,
            trim:true
            },
            password:{
                type:String,
                required:true,
                trim:true
                },
                avatar:{
                    type:String,
                    required:true,
                    trim:true
                    },
                        role:{
                            type:String,
                            enum:['admin','user'],
                            default:'user'
                            }
},{timestamps:true})

//create model
const People=mongoose.model('People',peopleSchema)

module.exports=People