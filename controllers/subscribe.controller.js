const Subscribe = require("../models/Subscribe");

const sgMail = require("@sendgrid/mail");
exports.enter_subscribers = (req, res) => {
  const { email } = req.body;

  const user = Subscribe.findOne({ email: email });
  if (user) {
    return res.send(
      "You already subscribed to our newsletter. Thank you for Subscribe Recroot"
    );
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: req.body.email,
    from: "dilanjachandrarathna@gmail.com", // Use the email address or domain you verified above
    // fromname: "recroot",
    subject: "Recrrot Subscribe",
    text: `Tnank you`,
    html: `<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Revue</title>
    <style type="text/css">
      #outlook a {padding:0;}
      body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;} 
      .ExternalClass {width:100%;}
      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div, .ExternalClass blockquote {line-height: 100%;}
      .ExternalClass p, .ExternalClass blockquote {margin-bottom: 0; margin: 0;}
      #backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important;}
      
      img {outline:none; text-decoration:none; -ms-interpolation-mode: bicubic;} 
      a img {border:none;} 
      .image_fix {display:block;}
  
      p {margin: 1em 0;}
  
      h1, h2, h3, h4, h5, h6 {color: black !important;}
      h1 a, h2 a, h3 a, h4 a, h5 a, h6 a {color: black;}
      h1 a:active, h2 a:active,  h3 a:active, h4 a:active, h5 a:active, h6 a:active {color: black;}
      h1 a:visited, h2 a:visited,  h3 a:visited, h4 a:visited, h5 a:visited, h6 a:visited {color: black;}
  
      table td {border-collapse: collapse;}
      table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }
  
      a {color: #3498db;}
      p.domain a{color: black;}
  
      hr {border: 0; background-color: #d8d8d8; margin: 0; margin-bottom: 0; height: 1px;}
  
      @media (max-device-width: 667px) {
        a[href^="tel"], a[href^="sms"] {
          text-decoration: none;
          color: blue;
          pointer-events: none;
          cursor: default;
        }
  
        .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
          text-decoration: default;
          color: orange !important;
          pointer-events: auto;
          cursor: default;
        }
  
        h1[class="profile-name"], h1[class="profile-name"] a {
          font-size: 32px !important;
          line-height: 38px !important;
          margin-bottom: 14px !important;
        }
  
        span[class="issue-date"], span[class="issue-date"] a {
          font-size: 14px !important;
          line-height: 22px !important;
        }
  
        td[class="description-before"] {
          padding-bottom: 28px !important;
        }
        td[class="description"] {
          padding-bottom: 14px !important;
        }
        td[class="description"] span, span[class="item-text"], span[class="item-text"] span {
          font-size: 16px !important;
          line-height: 24px !important;
        }
  
        span[class="item-link-title"] {
          font-size: 18px !important;
          line-height: 24px !important;
        }
  
        span[class="item-header"] {
          font-size: 22px !important;
        }
  
        span[class="item-link-description"], span[class="item-link-description"] span {
          font-size: 14px !important;
          line-height: 22px !important;
        }
  
        .link-image {
          width: 84px !important;
          height: 84px !important;
        }
  
        .link-image img {
          max-width: 100% !important;
          max-height: 100% !important;
        }
      }
  
      @media (max-width: 500px) {
        .column {
          display: block !important;
          width: 100% !important;
          padding-bottom: 8px !important;
        }
      }
  
      @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
        a[href^="tel"], a[href^="sms"] {
          text-decoration: none;
          color: blue;
          pointer-events: none;
          cursor: default;
        }
  
        .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
          text-decoration: default;
          color: orange !important;
          pointer-events: auto;
          cursor: default;
        }
      }
  
    </style>
    <!--[if gte mso 9]>
      <style type="text/css">
        #contentTable {
          width: 600px;
        }
      </style>
    <![endif]-->
  </head>
  <body style="width:100% !important;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
  <table cellpadding="0" cellspacing="0" border="0" id="backgroundTable" style="margin:0; padding:0; width:100% !important; line-height: 100% !important; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;background-color: #F9FAFB;" width="100%">
    <tbody><tr>
      <td width="10" valign="top">&nbsp;</td>
      <td valign="top" align="center">
        <!--[if (gte mso 9)|(IE)]>
        <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFF; border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
          <tr>
            <td>
        <![endif]-->
        <table cellpadding="0" cellspacing="0" border="0" align="center" style="width: 100%; max-width: 600px; background-color: #FFF; border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;" id="contentTable">
          <tbody><tr>
            <td width="600" valign="top" align="center" style="border-collapse:collapse;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" style="background: #F9FAFB;" width="100%">
  <tbody><tr>
  <td align="center" valign="top">
  <div style="font-family: &quot;lato&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; line-height: 28px;">&nbsp;</div>
  </td>
  </tr>
  </tbody></table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" style="border: 1px solid #E0E4E8;" width="100%">
  <tbody><tr>
  <td align="center" style="padding: 56px 56px 28px 56px;" valign="top">
  <a style="color: #3498DB; text-decoration: none;" href="https://www.getrevue.co/profile/brightonsmith?utm_campaign=Subscription+confirmation&amp;utm_content=profile-image&amp;utm_medium=email&amp;utm_source=confirmation" target="_blank"><img style="width: 300px; height: 100px; border: 0;" alt="Weekly newsletter of CyanVariable360 Studios" src="https://moonlit-palmier-63f820.netlify.app/static/media/logo.ea1ba502b4fec28e320c972077cca8bf.svg">
  </a></td>
  </tr>
  <tr>
  <td align="left" style="padding: 0 56px 28px 56px;" valign="top">
  <div style="font-family: &quot;lato&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; line-height: 28px;font-size: 18px; color: #333; font-weight: bold;">Thank you for subscribing to <strong>Weekly newsletter of recroot</strong>!</div>
  </td>
  </tr>
  <tr>
  <td align="left" style="padding: 0 56px 28px 56px;" valign="top">
  <div style="font-family: &quot;lato&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; line-height: 28px;font-size: 18px; color: #333;">
  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.  <a target="_blank" href="https://google.com">profile page</a> Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. <a target="_blank" href="https://google.com">here</a>!
  </div>
  </td>
  </tr>
  <tr>
  <td align="left" style="padding: 0 56px 56px 56px;" valign="top">
  <div style="font-family: &quot;lato&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; line-height: 28px;font-size: 18px; color: #333;">Oh by the way, I wouldn't mind if you gave my digest some love through <a target="_blank" href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.getrevue.co%2Fprofile%2Fbrightonsmith&amp;text=Join%20me%20in%20following%20this%20newsletter%3F%20%F0%9F%91%80%20Weekly%20newsletter%20of%20CyanVariable360%20Studios&amp;original_referer=&amp;related=revue&amp;via=revue">Twitter</a> or <a target="_blank" href="https://m.facebook.com/login.php?skip_api_login=1&amp;api_key=966242223397117&amp;signed_next=1&amp;next=http%3A%2F%2Fm.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttps%253A%252F%252Fwww.getrevue.co%252Fprofile%252Fbrightonsmith&amp;cancel_url=http%3A%2F%2Fm.facebook.com%2Fdialog%2Fclose_window%2F%3Fapp_id%3D966242223397117%26connect%3D0%23_%3D_&amp;display=touch&amp;locale=en_US&amp;_rdr">Facebook</a> :-)</div>
  </td>
  </tr>
  <tr>
  <td align="center" bgcolor="#F9FAFB" style="padding: 28px 56px;" valign="top">
  <div style="font-family: &quot;lato&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; line-height: 28px;font-size: 16px; color: #666666; font-weight: 900;">Invite your friends to subscribe:</div>
  <div style="font-family: &quot;lato&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; line-height: 28px;font-size: 16px; color: #000;">
  </div>
  </td>
  </tr>
  </tbody></table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" style="background: #F9FAFB;" width="100%">
  <tbody><tr>
  <td align="center" style="padding: 28px 56px;" valign="top">
  <div style="font-family: &quot;lato&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; line-height: 28px;font-size: 16px; line-height: 24px; color: #A7ADB5;">Make sure you add this email addres to your address book. This way you won't miss a single newsletter.</div>
  </td>
  </tr>
  <tr>
  <td align="center" style="padding: 0 56px 28px 56px;" valign="middle">
  <span style="font-family: &quot;lato&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; line-height: 28px;font-size: 16px; color: #A7ADB5; vertical-align: middle;">Powered by</span>
  &nbsp;
  </td>
  </tr>
  </tbody></table>
  
            </td>
          </tr>
        </tbody></table>
        <!--[if (gte mso 9)|(IE)]>
            </td>
          </tr>
        </table>
        <![endif]-->
      </td>
      <td width="10" valign="top">&nbsp;</td>
    </tr>
  </tbody></table> 
  
  
  
  
  </body>`,
  };

  (async () => {
    try {
      await sgMail.send(msg);
      console.log(email);
      console.log("Email Send Sucessfully");
      // res.status(200).json({ message: "Email Send Sucessfully" });
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();

  const subscribe = new Subscribe({
    email: email,
  });
  subscribe
    .save()
    .then(() => {
      return res.send(
        "Email saved succesffuly. Thank you for Subscribe Recroot"
      );
    })
    .catch((err) => console.log(err.message));
};
