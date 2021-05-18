import multer from 'multer';
import path from 'path';
import crypto from 'crypto';


const config = {
    dest: path.resolve("src/temp/uploads"),
    storage: multer.diskStorage({
          destination: (req, file, cb)=>{
              cb(null, path.resolve("src/temp/uploads"));
          },

          filename: (req, file, cb)=>{
              crypto.randomBytes(16, (err, hash)=>{
                  if(err) cb(err);
                  const fileName = `${hash.toString('hex')}-${file.originalname}`;
                  cb(null, fileName)
              })
          }, 
    }),
    limits:{
      fileSize: 100 * 1024 * 1024,
    },
    fileFilter: (req, file, cb)=>{
          const allowedMimes = [
              'image/jpeg',
              'image/jpg',
              'image/pjpeg',
              'image/png',
              'image/gif',
              'video/x-ms-wmv'
              
          ];
          if (allowedMimes.includes(file.mimetype)){
              cb(null, true);
          }else{
              cb(new Error(`invalid file type: ${file.mimetype}`)) ;
          }
        },

}

   export default config;



