import { Injectable, ConflictException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configuración del transportador de nodemailer
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Cambiar si usas otro proveedor
      auth: {
        user: 'info.barhogwarts@gmail.com', // Configurar en variables de entorno
        pass: 'uyexvioevtxcrryz', // Contraseña o token de aplicación
      },
    });
  }

  async sendEmail(email: string, ): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: 'info.barhogwarts@gmail.com', // Correo remitente
        to: email,
        subject: 'Bienvenid@ a nuestro Bar',
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="es">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>Nueva plantilla de correo electrónico 2025-01-17</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<noscript>
         <xml>
           <o:OfficeDocumentSettings>
           <o:AllowPNG></o:AllowPNG>
           <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
      </noscript>
<![endif]--><!--[if !mso]><!-- -->
  <link href="https://fonts.googleapis.com/css2?family=Aclonica&display=swap" rel="stylesheet"><!--<![endif]--><!--[if mso]><xml>
    <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
      <w:DontUseAdvancedTypographyReadingMail/>
    </w:WordDocument>
    </xml><![endif]-->
  <style type="text/css">.rollover:hover .rollover-first {
  max-height:0px!important;
  display:none!important;
}
.rollover:hover .rollover-second {
  max-height:none!important;
  display:block!important;
}
.rollover span {
  font-size:0px;
}
u + .body img ~ div div {
  display:none;
}
#outlook a {
  padding:0;
}
span.MsoHyperlink,
span.MsoHyperlinkFollowed {
  color:inherit;
  mso-style-priority:99;
}
a.n {
  mso-style-priority:100!important;
  text-decoration:none!important;
}
a[x-apple-data-detectors],
#MessageViewBody a {
  color:inherit!important;
  text-decoration:none!important;
  font-size:inherit!important;
  font-family:inherit!important;
  font-weight:inherit!important;
  line-height:inherit!important;
}
.d {
  display:none;
  float:left;
  overflow:hidden;
  width:0;
  max-height:0;
  line-height:0;
  mso-hide:all;
}
@media only screen and (max-width:600px) {.bg { padding-right:0px!important } .bf { padding-bottom:20px!important } .be { padding-right:20px!important } .bd { padding-left:20px!important } .bc { padding:20px!important }  *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important }  .z p { } .y p { }  h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left }       .b td a { font-size:11px!important }  .z p, .z a { font-size:14px!important } .y p, .y a { font-size:12px!important }  .u, .u h1, .u h2, .u h3, .u h4, .u h5, .u h6 { text-align:center!important }     .t .rollover:hover .rollover-second, .u .rollover:hover .rollover-second, .v .rollover:hover .rollover-second { display:inline!important }      .m, .m .n, .o, .o td, .b { display:inline-block!important }  .g table, .h table, .i table, .g, .i, .h { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important }      .b td { width:1%!important } table.a, .esd-block-html table { width:auto!important } .h-auto { height:auto!important } }
@media screen and (max-width:384px) {.mail-message-content { width:414px!important } }</style>
 </head>
 <body bis_status="ok" bis_frame_id="2570" class="body" style="width:100%;height:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><!--[if mso]><xml>
    <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
      <w:DontUseAdvancedTypographyReadingMail></w:DontUseAdvancedTypographyReadingMail>
    </w:WordDocument>
    </xml><![endif]-->
  <div dir="ltr" class="es-wrapper-color" lang="es" style="background-color:#EFF7F6"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#eff7f6"></v:fill>
			</v:background>
		<![endif]-->
   <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#EFF7F6">
     <tr>
      <td valign="top" style="padding:0;Margin:0">
       <table cellspacing="0" cellpadding="0" align="center" class="h" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="ba" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
             <tr>
              <td align="left" style="padding:20px;Margin:0">
               <table cellspacing="0" cellpadding="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td valign="top" align="center" class="bg" style="padding:0;Margin:0;width:560px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;display:none"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellspacing="0" cellpadding="0" align="center" class="g" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table cellspacing="0" cellpadding="0" bgcolor="#010101" align="center" class="z" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#010101;width:600px">
             <tr>
              <td align="left" style="padding:0;Margin:0">
               <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td valign="top" align="center" class="bg bf" style="padding:0;Margin:0;width:600px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr class="es-visible-simple-html-only">
                      <td align="center" style="padding:0;Margin:0;position:relative"><img src="https://ftcoyky.stripocdn.email/content/guids/bannerImgGuid/images/image17371394442509377.png" alt="Bienvenido a Hogwarts Bar" title="Bienvenido a Hogwarts Bar" width="600" height="608" class="adapt-img" style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" background="https://ftcoyky.stripocdn.email/content/guids/CABINET_096f1467ede64f30b16e7ed801a85ec92b513f0b377693866b94eafdb1722ea7/images/frame_4077589.png" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-image:url(https://ftcoyky.stripocdn.email/content/guids/CABINET_096f1467ede64f30b16e7ed801a85ec92b513f0b377693866b94eafdb1722ea7/images/frame_4077589.png);background-repeat:no-repeat;background-position:center top;border-width:2px 2px 0;border-style:solid solid solid;border-color:#bf9000 #bf9000 #00000000" role="presentation">
                     <tr>
                      <td align="center" class="be bd" style="Margin:0;padding-top:30px;padding-right:30px;padding-bottom:10px;padding-left:30px"><h2 class="u" style="Margin:0;font-family:Aclonica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:28px;font-style:normal;font-weight:normal;line-height:33.6px;color:#FFFFFF">Gracias por registrarte en nuestra web, bienvenid@!</h2></td>
                     </tr>
                     <tr>
                      <td align="left" class="be bd" style="Margin:0;padding-top:30px;padding-right:30px;padding-bottom:10px;padding-left:30px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;line-height:24px;letter-spacing:0;color:#EFEFEF;font-size:16px">Estimado/a <em>mago</em> o <em>bruja</em>,</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;line-height:24px;letter-spacing:0;color:#EFEFEF;font-size:16px">¡Con gran alegría, te damos la bienvenida a <strong>Hogwarts Bar</strong>! 🧙‍♂️✨ Un lugar donde la magia fluye tan libre como la cerveza de mantequilla y cada rincón está encantado con un hechizo de buena compañía y deliciosas pociones.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;line-height:24px;letter-spacing:0;color:#EFEFEF;font-size:16px">Al cruzar nuestras puertas, te encontrarás en un refugio digno de magos y brujas, donde los calderos burbujean con cócteles encantados y los platos están inspirados en el Gran Comedor de Hogwarts. Prepárate para probar el famoso <em>Felix Felicis Fizz</em>, o atreverte con un trago de <em>Fuego Fatuo</em>.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;line-height:24px;letter-spacing:0;color:#EFEFEF;font-size:16px">Aquí, las casas no importan: ya seas de Gryffindor, Slytherin, Hufflepuff o Ravenclaw, siempre tendrás un asiento junto a la chimenea y una bebida que calentará hasta los corazones más fríos.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;line-height:24px;letter-spacing:0;color:#EFEFEF;font-size:16px">📜 <strong>Reglas del Bar:</strong></p>
                       <ul style="font-family:Poppins, sans-serif;padding:0px 0px 0px 40px;margin-top:15px;margin-bottom:15px">
                        <li style="color:#EFEFEF;margin:0px 0px 15px;font-size:16px">No se permite el uso de hechizos para engatusar al bartender.</li>
                        <li style="color:#EFEFEF;margin:0px 0px 15px;font-size:16px">Cualquier intento de <em>Wingardium Leviosa</em> sobre las bebidas será sancionado con una ronda extra para la casa.</li>
                        <li style="color:#EFEFEF;margin:0px 0px 15px;font-size:16px">Diviértete, comparte y que la magia sea tu guía.</li>
                       </ul><p style="Margin:0;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;line-height:24px;letter-spacing:0;color:#EFEFEF;font-size:16px"><strong>Nos vemos en Hogwarts Bar, donde la noche nunca termina y la magia siempre está en el aire.</strong></p><p style="Margin:0;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;line-height:24px;letter-spacing:0;color:#EFEFEF;font-size:16px">Con un brindis y un "¡Expecto Patronum!",</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;line-height:24px;letter-spacing:0;color:#EFEFEF;font-size:16px">El equipo de Hogwarts Bar.</p></td>
                     </tr>
                     <tr>
                      <td align="center" class="bc" style="padding:30px;Margin:0;font-size:0px"><a target="_blank" href="https://viewstripo.email" style="mso-line-height-rule:exactly;text-decoration:underline;color:#EFEFEF;font-size:16px"><img src="https://ftcoyky.stripocdn.email/content/guids/e659db8b-bfd8-4c8b-a89b-8455584addda/images/1019productocarta27286.jpg" alt="" width="496" class="adapt-img" style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a></td>
                     </tr>
                   </table></td>
                 </tr>
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" background="https://ftcoyky.stripocdn.email/content/guids/CABINET_096f1467ede64f30b16e7ed801a85ec92b513f0b377693866b94eafdb1722ea7/images/frame_4077590.png" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-image:url(https://ftcoyky.stripocdn.email/content/guids/CABINET_096f1467ede64f30b16e7ed801a85ec92b513f0b377693866b94eafdb1722ea7/images/frame_4077590.png);background-repeat:no-repeat;background-position:center bottom;border-width:0 2px 2px;border-style:solid solid solid;border-color:#00000000 #bf9000 #bf9000" role="presentation">
                     <tr>
                      <td align="left" class="be bd" style="Margin:0;padding-right:30px;padding-left:30px;padding-top:10px;padding-bottom:30px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;line-height:21px;letter-spacing:0;color:#EFEFEF;font-size:14px">Accio, Bar Hogwarts!🌟</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;line-height:21px;letter-spacing:0;color:#EFEFEF;font-size:14px"><br></p><p style="Margin:0;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;line-height:21px;letter-spacing:0;color:#EFEFEF;font-size:14px">Un saludo,</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;line-height:21px;letter-spacing:0;color:#EFEFEF;font-size:14px">Mago o hechizera<br>El equipo de Bar Hogwagrts</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:30px;padding-bottom:40px">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;line-height:24px;letter-spacing:0;color:#EFEFEF;font-size:16px"><br></p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" align="center" class="i" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="y" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#010101;width:600px">
             <tr>
              <td align="left" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:30px;padding-bottom:30px">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-bottom:25px;font-size:0">
                       <table cellpadding="0" cellspacing="0" class="a o" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:30px"><a target="_blank" href="https://viewstripo.email" style="mso-line-height-rule:exactly;text-decoration:underline;color:#EFEFEF;font-size:14px"><img src="https://ftcoyky.stripocdn.email/content/assets/img/social-icons/circle-white/facebook-circle-white.png" alt="Fb" title="Facebook" width="24" style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a></td>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:30px"><a target="_blank" href="https://viewstripo.email" style="mso-line-height-rule:exactly;text-decoration:underline;color:#EFEFEF;font-size:14px"><img src="https://ftcoyky.stripocdn.email/content/assets/img/social-icons/circle-white/instagram-circle-white.png" alt="Ig" title="Instagram" width="24" style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a></td>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:30px"><a target="_blank" href="https://viewstripo.email" style="mso-line-height-rule:exactly;text-decoration:underline;color:#EFEFEF;font-size:14px"><img src="https://ftcoyky.stripocdn.email/content/assets/img/social-icons/circle-white/youtube-circle-white.png" alt="Yt" title="Youtube" width="24" style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a></td>
                          <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://viewstripo.email" style="mso-line-height-rule:exactly;text-decoration:underline;color:#EFEFEF;font-size:14px"><img src="https://ftcoyky.stripocdn.email/content/assets/img/social-icons/circle-white/tiktok-circle-white.png" alt="Tt" title="TikTok" width="24" style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a></td>
                         </tr>
                       </table></td>
                     </tr>
                     <tr>
                      <td style="padding:0;Margin:0">
                       <table cellpadding="0" cellspacing="0" width="100%" class="b" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr class="links">
                          <td align="center" valign="top" width="100.00%" id="esd-menu-id-2" style="Margin:0;border:0;padding-bottom:2px;padding-top:2px;padding-right:5px;padding-left:5px">
                           <div style="vertical-align:middle;display:block"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:none;font-family:Poppins, sans-serif;display:block;color:#EFEFEF;font-size:14px"></a>
                           </div></td>
                         </tr>
                       </table></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-bottom:25px;padding-top:25px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;line-height:21px;letter-spacing:0;color:#EFEFEF;font-size:14px">© 2025 Bar Hogwarts.</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellspacing="0" cellpadding="0" align="center" class="i" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table cellspacing="0" cellpadding="0" align="center" class="y" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" role="none">
             <tr>
              <td align="left" style="Margin:0;padding-top:20px;padding-right:20px;padding-left:20px;padding-bottom:20px">
               <table cellspacing="0" cellpadding="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:560px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;line-height:21px;letter-spacing:0;color:#EFEFEF;font-size:14px">Escriba su texto y trabaje con sus estilos de texto y fusione listas y etiquetas</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  </div>
 </body>
</html>`
      });

      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error al enviar el email:', error);
      throw new ConflictException('Error al enviar email');
    }
  }
}
