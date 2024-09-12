const nodemailer = require('nodemailer');

const sendEmailHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Set up Nodemailer transport
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const emailBody = `
    <h3>New Contact Form Submission</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;

  try {
    const result = await transport.sendMail({
      from: process.env.SMTP_EMAIL,
      to: 'justchilloo86@gmail.com', // Change to your email
      subject: 'New Message from Contact Form',
      html: emailBody,
    });

    res.status(200).json({ message: 'Email sent successfully', result });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
};

module.exports = sendEmailHandler;
