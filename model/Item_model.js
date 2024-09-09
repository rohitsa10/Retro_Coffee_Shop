const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    img:{
        type:String
    },
    category:{
        type:String,
        default:"Espresso"
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    units:{
        type:Number,
        require:true,
        default:0
    },
    softDelete:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Item = mongoose.model('item',ItemSchema);