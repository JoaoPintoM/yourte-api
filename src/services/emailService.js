const apiKey = 'key-45b49236dd9441c04d88ffae7b3740e3'
const domain = 'mg.tipi.be'
const mailgun = require('mailgun-js')({ apiKey: apiKey, domain: domain })

const data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'piro@live.be',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
}

export const sendEmail = (emailAdress, colocationReference, body) => {
  mailgun.messages().send(data, (error, body) => {
    if (error) {
      console.log(error)
      return {}
    }
    return { emailAdress, colocationReference, body }
  })
}
