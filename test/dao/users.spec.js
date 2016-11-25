import * as userCtrl from 'dao/controllers/users'
import * as colocCtrl from 'dao/controllers/colocationRequests'

let userId
let user
let colocId

describe('users collection basic behavior', () => {
  it('create basic user', async () => {
    const user = await userCtrl.createUser({ username: 'un1cqt3stus3r_y0urt3' })
    user.username.should.equal('un1cqt3stus3r_y0urt3')
    user._id.should.not.be.empty
    userId = user._id
  })

  it('get user by id', async () => {
    user = await userCtrl.getUser(userId)
    user.username.should.equal('un1cqt3stus3r_y0urt3')
  })
})

describe('colocationRequest collection basic behavior', () => {
  it('create colocationRequest', async () => {
    const colocationRequest = await colocCtrl.create({
      user,
      maxPrice: 450
    })
    colocationRequest._id.should.not.be.empty
    colocId = colocationRequest._id
  })

  it('contains a userId', async () => {
    const coloc = await colocCtrl.getById(colocId)
    expect(coloc.user.toString()).to.equal(userId.toString())
  })
})
