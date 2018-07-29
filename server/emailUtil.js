const emailConfig = require('./emailConfig')();
const mailgun = require('mailgun-js')(emailConfig);


module.exports = (from, recipient, message) => {

  const data = {
    from: from,
    to: recipient,
    subject: message.subject,
    text: message.text,
  };
  return new Promise((resolve, reject) => {
    mailgun.messages().send(data, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });  
  });

};

