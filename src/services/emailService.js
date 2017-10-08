const apiKey = 'key-45b49236dd9441c04d88ffae7b3740e3'
const domain = 'mg.tipi.be'
const mailgun = require('mailgun-js')({ apiKey: apiKey, domain: domain })

const data = {
  from: 'My Tipi<me@samples.mailgun.org>',
  to: 'piro@live.be',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
}

export const sendEmail = (emailAdress, colocationReference, body) => {
  data.to = emailAdress;
  data.subject = colocationReference.name;
  data.text = body.message;
  console.log(data);
  return mailgun.messages().send(data)
}
