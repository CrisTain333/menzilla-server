const jwt = require("jsonwebtoken");
const Sib = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

const nodemailer = require("nodemailer");

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1day",
  });
};

const sendEmail = async (options, activationUrl) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMT_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMT_USER, // generated ethereal user
      pass: process.env.SMT_PASSWORD, // generated ethereal password
    },
  });

  await transporter
    .sendMail({
      from: "sukanta.das4104@gmail.com", // sender address
      to: options?.email, // list of receivers
      subject: "Activate your account", // Subject line
      html: `
          <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style type="text/css">
            body {
                margin: 0;
                background: #FEFEFE;
                color: #585858;
            }

            table {
                font-size: 15px;
                line-height: 23px;
                max-width: 500px;
                min-width: 460px;
                text-align: center;
            }

            .table_inner {
                min-width: 100% !important;
            }

            td {
                font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
                vertical-align: top;
            }

            .carpool_logo {
                margin: 30px auto;
            }

            .dummy_row {
                padding-top: 20px !important;
            }

            .section,
            .sectionlike {
                background: #C9F9E9;
            }

            .section {
                padding: 0 20px;
            }

            .sectionlike {
                padding-bottom: 10px;
            }

            .section_content {
                width: 100%;
                background: #fff;
            }

            .section_content_padded {
                padding: 0 35px 40px;
            }

            .section_zag {
                background: #F4FBF9;
            }

            .imageless_section {
                padding-bottom: 20px;
            }

            img {
                display: flex;
                margin: 0 auto;
            }

            .img_section {
                width: 100%;
                max-width: 500px;
            }

            .img_section_side_table {
                width: 100% !important;
            }

            h1 {
                font-size: 20px;
                font-weight: 500;
                margin-top: 40px;
                margin-bottom: 0;
            }

            .near_title {
                margin-top: 10px;
            }

            .last {
                margin-bottom: 0;
            }

            a {
                color: #ff9900;
                font-weight: 500;
                word-break: break-word;
                /* Footer has long unsubscribe link */
            }

            .button {
                display: block;
                width: 100%;
                max-width: 300px;
                background: #ff9900;
                border-radius: 8px;
                color: #fff;
                font-size: 18px;
                font-weight: normal;
                /* Resetting from a */
                padding: 12px 0;
                margin: 30px auto 0;
                text-decoration: none;
            }

            small {
                display: block;
                width: 100%;
                max-width: 330px;
                margin: 14px auto 0;
                font-size: 14px;
            }

            .signature {
                padding: 20px;
            }

            .footer,
            .footer_like {
                background: #ff9900;
            }

            .footer {
                padding: 0 20px 30px;
            }

            .footer_content {
                width: 100%;
                text-align: center;
                font-size: 12px;
                line-height: initial;
                color: #005750;
            }

            .footer_content a {
                color: #005750;
            }

            .footer_item_image {
                margin: 0 auto 10px;
            }

            .footer_item_caption {
                margin: 0 auto;
            }

            .footer_legal {
                padding: 20px 0 40px;
                margin: 0;
                font-size: 12px;
                color: #A5A5A5;
                line-height: 1.5;
            }

            .text_left {
                text-align: left;
            }

            .text_right {
                text-align: right;
            }

            .va {
                vertical-align: middle;
            }

            .stats {
                min-width: auto !important;
                max-width: 370px;
                margin: 30px auto 0;
            }

            .counter {
                font-size: 22px;
            }

            .stats_counter {
                width: 23%;
            }

            .stats_image {
                width: 18%;
                padding: 0 10px;
            }

            .stats_meta {
                width: 59%;
            }

            .stats_spaced {
                padding-top: 16px;
            }

            .walkthrough_spaced {
                padding-top: 24px;
            }

            .walkthrough {
                max-width: none;
            }

            .walkthrough_meta {
                padding-left: 20px;
            }

            .table_checkmark {
                padding-top: 30px;
            }

            .table_checkmark_item {
                font-size: 15px;
            }

            .td_checkmark {
                width: 24px;
                padding: 7px 12px 0 0;
            }

            .padded_bottom {
                padding-bottom: 40px;
            }

            .marginless {
                margin: 0;
            }

            /* Restricting responsive for iOS Mail app only as Inbox/Gmail have render bugs */
            @media only screen and (max-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
                table {
                    min-width: auto !important;
                }

                .section_content_padded {
                    padding-right: 25px !important;
                    padding-left: 25px !important;
                }

                .counter {
                    font-size: 18px !important;
                }
            }
        </style>
    </head>

    <body style="	margin: 0;
    	background: #FEFEFE;
    	color: #585858;
    ">
        <span class="preheader"
            style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;border-collapse: collapse;border: 0px;"></span>
        <!-- Carpool logo -->
        <table align="center" border="0" cellspacing="0" cellpadding="0" style="	font-size: 15px;
    	line-height: 23px;
    	max-width: 500px;
    	min-width: 460px;
    	text-align: center;
    ">
            <tbody>
                <tr>
                    <td style="	font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    	vertical-align: top;

        border: none !important;
        display: flex;
        justify-content: center;
        align-items: center;
    ">
                        <img src="https://i.ibb.co/yd69Dkw/letter-m-logo-design-with-black-orange-color-and-circle-cool-modern-icon-letters-logo-vector-removeb.png"
                            class="carpool_logo" style="    display: flex;
        margin: 0 auto;
        margin: 30px 4px;
        height: 70px;
        width: 70px;">
                        <span
                            style="font-size:xx-large; font-weight: 900; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; color: black;">enZilla</span>
                    </td>
                </tr>
                <!-- Header -->
                <tr>
                    <td class="sectionlike imageless_section" style="	font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    	vertical-align: top;
        border: none !important;
      padding-bottom: 10px;
    padding-bottom: 20px;"></td>
                </tr>
                <!-- Content -->
                <tr>
                    <td class="section" style="	font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    	vertical-align: top;
        border: none !important;
    	padding: 0 20px;
    ">
                        <table border="0" cellspacing="0" cellpadding="0" class="section_content" style="	font-size: 15px;
    	line-height: 23px;
    	max-width: 500px;
    	min-width: 460px;
    	text-align: center;
    	width: 100%;
    	background: #fff;
    ">
                            <tbody>
                                <tr>
                                    <td class="section_content_padded" style="	font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    	vertical-align: top;
        border: none !important;
    padding: 0 35px 40px;">
                                        <h1 style="	font-size: 20px;
    	font-weight: 500;
    	margin-top: 40px;
    	margin-bottom: 0;
    ">Hi ${options?.name}</h1>
                                        <p class="near_title last" style="margin-top: 10px;margin-bottom: 0;">Please verify
                                            that your email address is ${options?.email}, and that you entered it when
                                            signing up for Menzilla.</p>
                                        <a href=${activationUrl} style="	display: block;
    	width: 100%;
    	max-width: 300px;
    	background: #ff9900;
    	border-radius: 8px;
    	color: #fff;
    	font-size: 18px;
    	padding: 12px 0;
    	margin: 30px auto 0;
    	text-decoration: none;
    " target="_blank">Verify email</a>
                                        <small style="	display: block;
    	width: 100%;
    	max-width: 330px;
    	margin: 14px auto 0;
    	font-size: 14px;
    ">This link will expire in 24 hours</small>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <!-- Signature -->
                <tr>
                    <td class="section" style="	font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    	vertical-align: top;
        border: none !important;
    	padding: 0 20px;
    ">
                        <table border="0" cellspacing="0" cellpadding="0" class="section_content section_zag" style="	font-size: 15px;
    	line-height: 23px;
    	max-width: 500px;
    	min-width: 460px;
    	text-align: center;
    	width: 100%;
    	background: #fff;
    background: #F4FBF9;">
                            <tbody>
                                <tr>
                                    <td class="signature" style="	font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    	vertical-align: top;
        border: none !important;
    padding: 20px;">
                                        <p class="marginless" style="margin: 0;">Happy Shopping, <br>The Menzilla Team
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <!-- Legal footer -->
                <tr>
                    <td style="	font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    	vertical-align: top;
        border: none !important;
    ">
                        <p class="footer_legal" style="	padding: 20px 0 40px;
    	margin: 0;
    	font-size: 12px;
    	color: #A5A5A5;
    	line-height: 1.5;
    ">
                            If you did not enter this email address when signing up for Menzilla, disregard this
                            message.<br><br>
                            © 2023 Google Inc. 1600 Amphitheatre Parkway, Mountain View, CA 94043
                            <br><br>

                            This is a mandatory service email from Menzilla.
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>

    </body>
          `,
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });

  console.log("send email function offf");
};

const sendOrderConfirmationEmail = async (order) => {
  // create reusable transporter object using the default SMTP transport
  console.log(order, "form send order email ");
  let transporter = nodemailer.createTransport({
    host: process.env.SMT_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMT_USER, // generated ethereal user
      pass: process.env.SMT_PASSWORD, // generated ethereal password
    },
  });

  await transporter
    .sendMail({
      from: "sukanta.das4104@gmail.com", // sender address
      to: order[0]?.user?.email, // list of receivers
      subject: "Order Confirmation", // Subject line
      html: `
      
      <!DOCTYPE HTML
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title></title>

    <style type="text/css">
        table,
        td {
            color: #000000;
        }

        @media only screen and (min-width: 660px) {
            .u-row {
                width: 640px !important;
            }

            .u-row .u-col {
                vertical-align: top;
            }

            .u-row .u-col-28p5 {
                width: 182.4px !important;
            }

            .u-row .u-col-33p33 {
                width: 213.31199999999998px !important;
            }

            .u-row .u-col-35p33 {
                width: 226.11199999999997px !important;
            }

            .u-row .u-col-38p17 {
                width: 244.28800000000004px !important;
            }

            .u-row .u-col-50 {
                width: 320px !important;
            }

            .u-row .u-col-64p67 {
                width: 413.88800000000003px !important;
            }

            .u-row .u-col-100 {
                width: 640px !important;
            }

        }

        @media (max-width: 660px) {
            .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }

            .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }

            .u-row {
                width: calc(100% - 40px) !important;
            }

            .u-col {
                width: 100% !important;
            }

            .u-col>div {
                margin: 0 auto;
            }
        }

        body {
            margin: 0;
            padding: 0;
        }

        table,
        tr,
        td {
            vertical-align: top;
            border-collapse: collapse;
        }

        p {
            margin: 0;
        }

        .ie-container table,
        .mso-container table {
            table-layout: fixed;
        }

        * {
            line-height: inherit;
        }

        a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
        }
    </style>



</head>

<body class="clean-body u_body"
    style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table
        style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%"
        cellpadding="0" cellspacing="0">
        <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->





                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 640px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="640" style="width: 640px;padding: 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 640px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:14px 10px 10px 18px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                                border="0">
                                                                <tr>
                                                                    <td style="padding-right: 0px;padding-left: 0px;"
                                                                        align="center">

                                                                        <img align="center" border="0"
                                                                            src="https://i.ibb.co/SJGnDdy/Screenshot-2023-07-13-114557.png"
                                                                            alt="Image" title="Image"
                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 196px;"
                                                                            width="196" />

                                                                    </td>
                                                                </tr>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container bayengage_cart_repeat"
                        style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 640px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ff9900; border-radius: 10px;">
                            <div
                                style="color: #ffffff; border-collapse: collapse;display: table;width: 100%;background-color: transparent; border-radius: 10px">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px;"><tr style="background-color: #bfedd2;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 15px;border-top: 20px solid #ffffff;border-left: 20px solid #ffffff;border-right: 20px solid #ffffff;border-bottom: 20px solid #ffffff;" valign="top"><![endif]-->
                                <div class="u-col u-col-100 border-radius: 10px"
                                    style="max-width: 320px;min-width: 640px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 15px;border-top: 20px solid #ffffff;border-left: 20px solid #ffffff;border-right: 20px solid #ffffff;border-bottom: 20px solid #ffffff;">
                                            <!--<![endif]-->

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="line-height: 130%; text-align: left; word-wrap: break-word;">
                                                                <p
                                                                    style="font-size: 14px; line-height: 130%; text-align: center;">
                                                                    <span
                                                                        style="font-family: arial, helvetica, sans-serif; font-size: 32px; line-height: 41.6px;"><strong><span
                                                                                style="line-height: 41.6px; font-size: 32px;"><span
                                                                                    style="line-height: 41.6px; font-size: 32px; color: #ffffff">Order
                                                                                    confirmation</span></span></strong></span>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 20px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="line-height: 170%; text-align: left; word-wrap: break-word;">
                                                                <p
                                                                    style="line-height: 170%; text-align: center; font-size: 14px;">
                                                                    <span
                                                                        style="font-family: arial, helvetica, sans-serif; font-size: 14px; line-height: 23.8px;"><span
                                                                            style="color: #ffffff;font-size: 16px; line-height: 27.2px;">Hey ${
                                                                              order[0]
                                                                                ?.user
                                                                                ?.name
                                                                            },</span></span>
                                                                </p>
                                                                <p
                                                                    style="line-height: 170%; text-align: center; font-size: 14px;">
                                                                    <span
                                                                        style="font-family: arial, helvetica, sans-serif; font-size: 14px; line-height: 23.8px;"><span
                                                                            style="color: #ffffff; font-size: 16px; line-height: 27.2px;">We've
                                                                            got your order! Your world is about to look
                                                                            a whole lot better. We'll drop</span></span>
                                                                </p>
                                                                <p
                                                                    style="line-height: 170%; text-align: center; font-size: 14px;">
                                                                    <span
                                                                        style="font-family: arial, helvetica, sans-serif; font-size: 14px; line-height: 23.8px;"><span
                                                                            style="color: #ffffff; font-size: 16px; line-height: 27.2px;">you
                                                                            another email when your order
                                                                            Delivered.</span></span>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 20px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                <p
                                                                    style="font-size: 14px; line-height: 140%; text-align: center;">
                                                                    <span
                                                                        style="color: #ffffff;font-size: 16px; line-height: 22.4px; font-family: arial, helvetica, sans-serif;"><strong>ORDER
                                                                            ID: #{order[0]?._id?.slice(
                                                                              0,
                                                                              8
                                                                            )}</strong></span>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 640px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="640" style="width: 640px;padding: 10px 20px 0px 15px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 640px;display: table-cell;vertical-align: top;">
                                    <div
                                        style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 10px 20px 0px 15px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <!--<![endif]-->

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 16px; line-height: 22.4px; color: #000000;"><strong>ITEMS
                                                                            ORDERED</strong></span></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container ordered_products" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 640px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">

                            ${order[0]?.cart?.map((ele) => {
                              return `
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px;"><tr style="background-color: #ffffff;"><![endif]-->
                    
                        <!--[if (mso)|(IE)]><td align="center" width="244" style="width: 244px;padding: 12px 0px 12px 15px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                        <div class="u-col u-col-38p17" style="max-width: 320px;min-width: 244px;display: table-cell;vertical-align: top;">
                            <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <!--[if (!mso)&(!IE)]><!-->
                                <div
                                    style="padding: 12px 0px 12px 15px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                    <!--<![endif]-->
                    
                                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                                        cellspacing="0" width="100%" border="0">
                                        <tbody>
                                            <tr>
                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:5px 10px;font-family:arial,helvetica,sans-serif;"
                                                    align="left">
                    
                                                    <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                        <p style="font-size: 14px; line-height: 140%;"><span
                                                                style="font-size: 16px; line-height: 22.4px;">${
                                                                  ele
                                                                    ?.product
                                                                    ?.name
                                                                }</span>
                                                        </p>
                                                    </div>
                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                    
                                    <!--[if (!mso)&(!IE)]><!-->
                                </div><!--<![endif]-->
                            </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]><td align="center" width="182" style="width: 182px;padding: 12px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                        <div class="u-col u-col-28p5" style="max-width: 320px;min-width: 182px;display: table-cell;vertical-align: top;">
                            <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <!--[if (!mso)&(!IE)]><!-->
                                <div
                                    style="padding: 12px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                    <!--<![endif]-->
                    
                                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                                        cellspacing="0" width="100%" border="0">
                                        <tbody>
                                            <tr>
                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:5px 10px;font-family:arial,helvetica,sans-serif;"
                                                    align="left">
                    
                                                    <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                        <p style="font-size: 14px; line-height: 140%;"><span
                                                                style="font-size: 16px; line-height: 22.4px;">${
                                                                  ele.quantity
                                                                }</span>
                                                        </p>
                                                    </div>
                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                    
                                    <!--[if (!mso)&(!IE)]><!-->
                                </div><!--<![endif]-->
                            </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]><td align="center" width="213" style="width: 213px;padding: 12px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                        <div class="u-col u-col-33p33" style="max-width: 320px;min-width: 213px;display: table-cell;vertical-align: top;">
                            <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <!--[if (!mso)&(!IE)]><!-->
                                <div
                                    style="padding: 12px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                    <!--<![endif]-->
                    
                                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                                        cellspacing="0" width="100%" border="0">
                                        <tbody>
                                            <tr>
                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:5px 20px 5px 10px;font-family:arial,helvetica,sans-serif;"
                                                    align="left">
                    
                                                    <div style="line-height: 140%; text-align: right; word-wrap: break-word;">
                                                        <p style="font-size: 14px; line-height: 140%;"><span
                                                                style="font-size: 16px; line-height: 22.4px;">${
                                                                  ele
                                                                    ?.product
                                                                    ?.discountPrice *
                                                                  ele?.quantity
                                                                }</span>
                                                        </p>
                                                    </div>
                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                    
                                    <!--[if (!mso)&(!IE)]><!-->
                                </div><!--<![endif]-->
                            </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  
                  `;
                            })}
                        </div>
                    </div>


                  



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 640px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="640" style="width: 640px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 640px;display: table-cell;vertical-align: top;">
                                    <div
                                        style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <!--<![endif]-->

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <table height="0px" align="center" border="0"
                                                                cellpadding="0" cellspacing="0" width="100%"
                                                                style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px dotted #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                <tbody>
                                                                    <tr style="vertical-align: top">
                                                                        <td
                                                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                            <span>&#160;</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                  


                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 640px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="414" style="width: 414px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-64p67"
                                    style="max-width: 320px;min-width: 414px;display: table-cell;vertical-align: top;">
                                    <div
                                        style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <!--<![endif]-->

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 10px 25px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                <p
                                                                    style="font-size: 14px; line-height: 140%; text-align: left;">
                                                                    <span
                                                                        style="font-size: 14px; line-height: 19.6px;"><strong>Total
                                                                            amount:</strong></span>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="226" style="width: 226px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-35p33"
                                    style="max-width: 320px;min-width: 226px;display: table-cell;vertical-align: top;">
                                    <div
                                        style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <!--<![endif]-->

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 21px 10px 10px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                <p
                                                                    style="font-size: 14px; line-height: 140%; text-align: right;">
                                                                    <span
                                                                        style="font-size: 14px; line-height: 19.6px;"><strong>$${
                                                                          order[0]
                                                                            ?.totalPrice
                                                                        }</strong></span>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 640px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="640" style="width: 640px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 640px;display: table-cell;vertical-align: top;">
                                    <div
                                        style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <!--<![endif]-->

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 0px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <table height="0px" align="center" border="0"
                                                                cellpadding="0" cellspacing="0" width="100%"
                                                                style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px dotted #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                <tbody>
                                                                    <tr style="vertical-align: top">
                                                                        <td
                                                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                            <span>&#160;</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 640px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="320" style="width: 320px;padding: 10px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-50"
                                    style="max-width: 320px;min-width: 320px;display: table-cell;vertical-align: top;">
                                    <div
                                        style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 10px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <!--<![endif]-->

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <h4
                                                                style="margin: 0px; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 14px;">
                                                                <strong>Shipping address</strong>
                                                            </h4>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:6px 10px 10px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <h3
                                                                style="margin: 0px; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 14px;">
                                                                ${
                                                                  order[0]
                                                                    ?.shippingAddress
                                                                    ?.address1
                                                                }
                                                            </h3>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="320" style="width: 320px;padding: 10px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-50"
                                    style="max-width: 320px;min-width: 320px;display: table-cell;vertical-align: top;">
                                    <div
                                        style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 10px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <!--<![endif]-->

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 640px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="640" style="width: 640px;padding: 0px 20px 20px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 640px;display: table-cell;vertical-align: top;">
                                    <div
                                        style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px 20px 20px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <!--<![endif]-->

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 10px 0px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 14px; line-height: 19.6px;">Please
                                                                        do not hesitate to contact us on if you have any
                                                                        questions.</span></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 10px 0px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 14px; line-height: 19.6px;">Many
                                                                        thanks,</span></p>
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 14px; line-height: 19.6px;">Menzilla</span>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 640px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px;"><tr style="background-color: transparent;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="640" style="width: 640px;padding: 20px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 640px;display: table-cell;vertical-align: top;">
                                    <div
                                        style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 20px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <!--<![endif]-->

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>


                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
            </tr>
        </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
</body>

</html>
        `,
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });

  console.log("order confirmation  email function of");
};

module.exports = {
  createActivationToken,
  sendEmail,
  sendOrderConfirmationEmail,
};
