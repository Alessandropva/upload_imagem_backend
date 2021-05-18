import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer.js';
import Post from './models/Post.js';
import dotenv from 'dotenv';


dotenv.config();
const routes = express.Router();

routes.get("/", (req, res)=>{
    return res.json({hellow: "dida"});
    
});

routes.get("/postsdb", async(req, res)=>{
    const posts = await Post.find();
    return res.json(posts);
    
});

routes.delete('/posts/:id', async (req, res)=>{
  const post = await Post.findById(req.params.id);
  await post.remove();
  return res.send();
});

routes.post("/posts", multer(multerConfig).single("file"), async(req, res)=>{
    console.log(req.body);
    const {originalname: name, size, filename: key, url} = req.file;
    const post = await Post.create({
        name,
        size,
        key,
        url: process.env.APP_URL + key,
    });
    return res.json(post)
});


export default routes;