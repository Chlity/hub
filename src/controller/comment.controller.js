const CommentServers = require('../server/comment.server')
class Commentcontroller {
  async create(ctx, next) {
    const { content, moment_id } = ctx.request.body
    const { id } = ctx.user
    console.log(content, moment_id, id)
    const res = await CommentServers.sendingComment(moment_id, id, content)
    ctx.body = {
      code: 0,
      message: '发表评论成功',
      data: res
    }
  }
  async reply(ctx, next) {
    const { content, moment_id, comment_id } = ctx.request.body
    const { id } = ctx.user
    const res = await CommentServers.replyComment(moment_id, id, comment_id, content)
    ctx.body = {
      code: 0,
      message: '回复成功',
      data: res
    }
  }
}

module.exports = new Commentcontroller()
