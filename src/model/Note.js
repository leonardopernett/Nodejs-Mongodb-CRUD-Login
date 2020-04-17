const {Schema, model}= require('mongoose');

const noteSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

module.exports = model('Note', noteSchema)