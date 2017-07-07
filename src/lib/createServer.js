import Koa from 'koa'
import Router from 'koa-router'
import convert from 'koa-convert'
import { scopePerRequest } from 'awilix-koa'
import cors from 'kcors'
import respond from 'koa-respond'
import createApis from './createApis'
import bodyParser from 'koa-bodyparser'
import jwt from 'koa-jwt'
import jsonwebtoken from 'jsonwebtoken'

import logger from './logger'
import getConfiguredContainer from './configureContainer'
import notFoundHandler from '../middleware/notFound'

// MongoDB
import mongoose from 'mongoose'
// sessions
import session from 'koa-generic-session'
import MongoStore from 'koa-generic-session-mongo'
import CSRF from 'koa-csrf'
import passport from 'koa-passport'
import { config } from '../config/config'

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<Koa>} The configured app.
 */
export default async function createServer () {
  logger.debug('Creating server...', { scope: 'startup' })
  const app = new Koa()
  const router = new Router()

  console.log('connecting to MongoDB...')
  mongoose.connect(process.env.MONGODB_URI || 'localhost')
  mongoose.Promise = global.Promise

  // trust proxy
  app.proxy = true

  app.keys = ['your-session-secret']
  app.use(convert(session({
    store: new MongoStore()
  })))

  // adds ctx.ok(), ctx.notFound(), etc..
  app.use(respond())
  app.use(convert(cors()))
  app.use(bodyParser())

  app.use((ctx, next) => {
    return next()
  })

  // app.use(new CSRF({
  //   invalidSessionSecretMessage: 'Invalid session secret',
  //   invalidSessionSecretStatusCode: 403,
  //   invalidTokenMessage: 'Invalid CSRF token',
  //   invalidTokenStatusCode: 403,
  //   excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
  //   disableQuery: false
  // }))
  //
  // // your middleware here is for CSRF
  // app.use((ctx, next) => {
  //   if (![ 'GET', 'POST' ].includes(ctx.method)) {
  //     return next()
  //   }
  //   if (ctx.method === 'GET') {
  //     ctx.body = ctx.csrf
  //     return next()
  //   }
  //   ctx.body = 'OK'
  // })

  // authentication
  require('./auth')
  app.use(passport.initialize())
  app.use(passport.session())

  // Container is configured with our services and whatnot.
  const container = getConfiguredContainer()

  // Creates an Awilix scope per request. Check out the awilix-koa
  // docs for details: https://github.com/jeffijoe/awilix-koa
  app.use(scopePerRequest(container))

  // Adds middleware that creates a new Container Scope for each request.
  app.use((ctx, next) => {
    if (ctx.request.headers && ctx.request.headers.authorization) {
      const token = ctx.request.headers.authorization.replace('Bearer ', '')
      console.log(token)
      jsonwebtoken.verify(token, 'hOeizoKoezosPke', (err, decoded) => {
        if (err) console.log('err') // bar
        console.log(decoded)
      })
    }
    // faking authentication just to demo Awilix capabilities
    ctx.state.container.registerValue({
      currentUser: {
        id: ctx.state.user
      }
    })
    return next()
  })

  // Unprotected middleware
  app.use((ctx, next) => {
    if (ctx.url.match(/^\/public/)) {
      ctx.body = 'unprotected\n'
    } else {
      return next()
    }
  })

  app.use((ctx, next) => {
    if (ctx.url.match(/^\/authOK/)) {
      ctx.body = `Welcome ${ctx.state.user.username}`
    } else {
      return next()
    }
  })

  router.get('/auth/facebook',
    passport.authenticate('facebook')
  )

  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/api/users2'
    }), (ctx, next) => {
      console.log('YES BABY')
      console.log(ctx.state.user)

      const jwt = jsonwebtoken.sign({
        userId: ctx.state.user._id.toString(),
        username: ctx.state.user.username,
        picture: ctx.state.user.picture
      }, 'hOeizoKoezosPke')
      ctx.body = jwt

      ctx.redirect(`${config.WEB.URL}/token/${jwt}`)
    }
  )

  app.use(jwt({ secret: 'hOeizoKoezosPke' })
     .unless({ path: [/^\/auth/, /^\/public/] }))

  // Unprotected middleware
  app.use((ctx, next) => {
    if (ctx.url.match(/^\/public/)) {
      ctx.body = 'unprotected\n'
    } else {
      return next()
    }
  })

  // app.use(jwt({ secret: 'hOeizoKoezosPke' }))
  app.use(jwt({ secret: 'hOeizoKoezosPke', key: 'jwtdata' }).unless({ path: [/^\/auth/] }))
  // app.use(jwt({ secret: 'hOeizoKoezosPke', passthrough: true }))

  // Protected middleware
  app.use((ctx, next) => {
    if (ctx.url.match(/^\/api/)) {
      console.log(ctx.url)
      ctx.body = 'protected\n'
    }
    return next()
  })

  app.use((ctx, next) => {
    console.log('=======================================================')
    console.log('=======================================================')
    console.log('jwtdata', ctx.state.jwtdata)
    // console.log('token', ctx.state.token)
    // console.log('token', ctx.state.token)
    // jsonwebtoken.verify(ctx.state.jwtdata.toString(), 'hOeizoKoezosPke', (err, decoded) => {
    //   console.log(err)
    //   console.log(decoded)
    // })
    //
    // console.log('state.user', ctx.state.user)
    console.log('=======================================================')
    console.log('=======================================================')
    return next()
  })

  // Create the API's.
  createApis(router)

  // Install routes
  app.use(router.allowedMethods())
  app.use(router.routes())

  // Default handler when nothing stopped the chain.
  app.use(notFoundHandler)

  logger.debug('Server created, ready to listen', { scope: 'startup' })
  return app
}
