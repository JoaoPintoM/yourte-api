import Koa from 'koa'
import Router from 'koa-router'
import convert from 'koa-convert'
import { scopePerRequest } from 'awilix-koa'
import cors from 'kcors'
import respond from 'koa-respond'
import createApis from './createApis'
import bodyParser from 'koa-bodyparser'
import jwt from 'koa-jwt'

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

  app.use(new CSRF({
    invalidSessionSecretMessage: 'Invalid session secret',
    invalidSessionSecretStatusCode: 403,
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403,
    excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
    disableQuery: false
  }))

  // your middleware here is for CSRF
  app.use((ctx, next) => {
    if (![ 'GET', 'POST' ].includes(ctx.method)) {
      return next()
    }
    if (ctx.method === 'GET') {
      ctx.body = ctx.csrf
      return
    }
    ctx.body = 'OK'
  })

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
    // faking authentication just to demo Awilix capabilities
    ctx.state.container.registerValue({
      currentUser: {
        id: ctx.request.query.userId
      }
    })
    return next()
  })

  // app.use((ctx, next) => {
  //   return next().catch((err) => {
  //     if (err.status === 401) {
  //       ctx.status = 401
  //       ctx.body = 'Protected resource, use Authorization header to get access\n'
  //     } else {
  //       throw err
  //     }
  //   })
  // })
  //
  // // Unprotected middleware
  // app.use((ctx, next) => {
  //   if (ctx.url.match(/^\/public/)) {
  //     ctx.body = 'unprotected\n'
  //   } else {
  //     return next()
  //   }
  // })
  //
  // app.use(jwt({ secret: 'hOeizoKoezosPke' }))
  //
  // // Protected middleware
  // app.use((ctx) => {
  //   if (ctx.url.match(/^\/api/)) {
  //     ctx.body = 'protected\n'
  //   }
  // })
  //
  // app.use((ctx, next) => {
  //   console.log(ctx.state.user)
  //   return next()
  // })

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
