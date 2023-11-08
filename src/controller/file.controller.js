const Fileserver = require('../server/file.server')
const fs = require('fs')
const { SERVER_PATH, SERVER_PROT } = require('../config/sever')
class Filecontroller {
  async upload(ctx, next) {
    const { mimetype, size, filename } = ctx.request.file
    const { id } = ctx.user
    const res = await Fileserver.uploadImgInfo(id, filename, mimetype, size)
    const urlPath = `${SERVER_PATH}:${SERVER_PROT}/file/avatar/${id}`
    const val = await Fileserver.updateUserAvatar(id, urlPath)
    ctx.body = {
      code: 0,
      message: '上传头像成功',
      data: res
    }
  }
  async fetch(ctx, next) {
    const { userId } = ctx.params
    const res = await Fileserver.fetchImge(userId)
    ctx.type = res.mimetype
    ctx.body = fs.createReadStream(`./uploads/${res.filename}`)
  }
}

module.exports = new Filecontroller()
