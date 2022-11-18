import mongoose from 'mongoose';

const {Schema} = mongoose;

const commentSchema = new Schema({
    comment:{
        type:String,
        required:true,
        trim:true,
    },
    postedBy:{
        type: Schema.Types.ObjectId, ref: 'user'
    },

},{timestamps:true});

export default mongoose.model('comment',commentSchema)
