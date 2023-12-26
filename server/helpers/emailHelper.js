import nodemailer from "nodemailer";

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL_ADDR, // replace with your email
    pass: process.env.USER_EMAIL_PASS, // replace with your email password
  },
});


let emailHelper = {};

/**
 * Function to send an email.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject.
 * @param {string} text - Plain text content of the email.
 * @param {string} html - HTML content of the email.
 */
emailHelper.sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.USER_EMAIL_ADDR,
    to,
    subject,
    text,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

emailHelper.generateHTMLTemplate = (payload, templateName) => {
    let template = process.env[templateName];
    
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        template = template.replaceAll("{" + key + "}", payload[key]);
      }
    }
    console.log(payload, template);
    return template;
}

export default emailHelper;
