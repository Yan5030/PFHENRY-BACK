
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'info.barhogwarts@gmail.com', 
    pass:  'uyexvioevtxcrryz'  
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to the mail service:', error);
  } else {
    console.log('Successful connection to the mail service.');
  }
});

