import { UsersRepository } from 'dao/repositories/users'
import * as colocCtrl from 'dao/repositories/colocationRequests'
import * as roommateCtrl from 'dao/repositories/roommateRequests'

let userId
let user
let colocId
let roommateRequestId

const usersRepo = new UsersRepository()

describe('users collection basic behavior', () => {
  it('create basic user', async () => {
    const user = await usersRepo.createUser({ username: 'un1cqt3stus3r_y0urt3', testing: true })
    user.username.should.equal('un1cqt3stus3r_y0urt3')
    user._id.should.not.be.empty
    userId = user._id
  })

  it('get user by id', async () => {
    user = await usersRepo.getUser(userId)
    user.username.should.equal('un1cqt3stus3r_y0urt3')
  })
})

describe('colocationRequest collection basic behavior', () => {
  it('create colocationRequest', async () => {
    const colocationRequest = await colocCtrl.create({
      user,
      maxPrice: 450,
      testing: true
    })
    colocationRequest._id.should.not.be.empty
    colocId = colocationRequest._id
  })

  it('it should contains a userId', async () => {
    const coloc = await colocCtrl.getById(colocId)
    expect(coloc.user.toString()).to.equal(userId.toString())
  })

  it('it should be retrieve with a user ._id', async () => {
    const coloc = await colocCtrl.getUserColocationsRequests(userId)
    expect(coloc).to.be.not.empty
    expect(coloc[0].user.toString()).to.equal(userId.toString())
  })

  it('cannot be created without user', async () => {
    try {
      await colocCtrl.create({ maxPrice: 450, testing: true })
    } catch (e) {
      expect(e).to.not.be.null
    }
  })
})

describe('roommatesRequest collection basic behavior', () => {
  it('create roommatesRequest', async () => {
    const roommatesRequest = await roommateCtrl.create({
      user,
      price: 450,
      testing: true
    })
    roommatesRequest._id.should.not.be.empty
    roommateRequestId = roommatesRequest._id
  })

  it('it should contains a userId', async () => {
    const roomate = await roommateCtrl.getById(roommateRequestId)
    expect(roomate.user.toString()).to.equal(userId.toString())
  })

  it('cannot be created without user', async () => {
    try {
      await roommateCtrl.create({ price: 450, testing: true })
    } catch (e) {
      expect(e).to.not.be.null
    }
  })
})

describe('Cleaning DAO', () => {
  it('Testing users should be deleted', async () => {
    await usersRepo.deleteTestUsers()
    const users = await usersRepo.getTestUsers()
    expect(users).to.be.empty
  })

  it('Testing colocRequests should be deleted', async () => {
    await colocCtrl.deleteTesting()
    const cR = await colocCtrl.getTests()
    expect(cR).to.be.empty
  })

  it('Testing roommateRequests should be deleted', async () => {
    await roommateCtrl.deleteTesting()
    const rr = await roommateCtrl.getTests()
    expect(rr).to.be.empty
  })
})
