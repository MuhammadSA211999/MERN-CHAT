const multer=require('multer')
const createErrors=require('http-errors')
const path=require('path')
const uploader=(subFolderPath,allowedFilesTypes,fileSize,fileError)=>{
const uploadsFolder=`${__dirname}/../public/uploads/${subFolderPath}/`
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadsFolder)
    },
    filename:(req,file,cb)=>{
        const fileExtension=path.extname(file.originalname)
         const fileName=file.originalname.replace(fileExtension,'').toLowerCase().split(' ').join('-')+'-'+Date.now()
         cb(null,fileName+fileExtension)
    }
})
const upload=multer({
    storage,
    limits:{
        fileSize:fileSize
    },
    fileFilter:(req,file,cb)=>{
      if(allowedFilesTypes.includes(file.mimetype)){
         cb(null,true)
      }
      else{
       cb(createErrors(fileError))
      }
    }
})
return upload
}

module.exports=uploader