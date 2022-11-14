import mongoose from 'mongoose';

const {Schema} = mongoose;

const quoteSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    quote:{
        type:String,
        required:true,
        trim:true,
    },
    category:{
        type:String,
        required:true,
        trim:true,
        defaults:'Others'
    },
    about:{
        type:String,
        required:true,
        trim:true,
    },
    postedBy:{
        type: Schema.Types.ObjectId, ref: 'user'
    },
    comments:[{
        type: Schema.Types.ObjectId, ref: 'comment'
    }]
})


export default mongoose.model('quote',quoteSchema)