
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'info.barhogwarts@gmail.com', // Reemplaza con tu correo
    pass:  'uyexvioevtxcrryz'      // Reemplaza con tu contraseña o app password
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error al conectar con el servicio de correo:', error);
  } else {
    console.log('Conexión exitosa al servicio de correo.');
  }
});
=======
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'info.barhogwarts@gmail.com', // Reemplaza con tu correo
    pass:  'uyexvioevtxcrryz'      // Reemplaza con tu contraseña o app password
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error al conectar con el servicio de correo:', error);
  } else {
    console.log('Conexión exitosa al servicio de correo.');
  }
});

