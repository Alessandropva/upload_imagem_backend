import mongoose from 'mongoose';
import fs from 'fs';
import {promisify} from 'util';
import path from 'path';

const PostSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
});

//midleware mongoose

PostSchema.pre("remove", function(){
    return promisify(fs.unlink)(path.resolve("src/temp/uploads", this.key));
    //return fs.unlink(path.resolve("src/temp/uploads", this.key), ()=>console.log("sucesso"));
    
});

export default mongoose.model("Post", PostSchema);