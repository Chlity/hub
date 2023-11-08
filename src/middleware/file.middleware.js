const multer = require('@koa/multer')

const upload = multer({
  dest: './uploads'
})
const hanleupload = upload.single('avatar')

module.exports = { hanleupload }
