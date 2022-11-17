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
    image:{
        type:String,
        required:true,
        trim:true,
    },
    cloudinary_id: {
        type: String,
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
    }],
    savedBy:[{
        type: Schema.Types.ObjectId, ref: 'user'
    }]
})


export default mongoose.model('quote',quoteSchema)