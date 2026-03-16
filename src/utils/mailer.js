// require("dotenv").config({
//     path: require("path").resolve(__dirname, "../../.env"),
// });
// const Nodemailer = require("nodemailer");
// const { MailtrapTransport } = require("mailtrap");

// const TOKEN = process.env.MAILTRAP_TOKEN;

// const sendMail = async (to, subject, text, html) => {
//     // try {
//     //     const transport = Nodemailer.createTransport(
//     //         MailtrapTransport({
//     //             token: TOKEN,
//     //         }),
//     //     );
//     //     const sender = {
//     //         address: process.env.MAILTRAP_SENDER,
//     //         name: process.env.MAILTRAP_NAME,
//     //     };
//     //     // const recipients = ["pragyanprakhar@gmail.com"]; // Without domain the receiver will be same !

//     //     const info = transport
//     //         .sendMail({
//     //             from: sender,
//     //             to,
//     //             subject,
//     //             text,
//     //             html
//     //             /* category: "Integration Test", */
//     //         })
//     //         .then(console.log, console.error);

//     //     return info;
//     // } catch (error) {
//     //     console.error("Error sending email:-> ",error);
//     //     throw new Error("Failed to send email");
//     // }

//     const transporter = nodemailer.createTransport({
//         service: process.env.MAIL_SERVICE,
//         host: process.env.MAIL_HOST,
//         port: process.env.MAIL_PORT,
//         secure: false,
//         auth: {
//             user: process.env.MAIL_USER,
//             pass: process.env.MAIL_PASS,
//         },
//     });
//     const messageContent = "Hello, ....";
//     const mailOptions = {
//         from: {
//             name: "...",
//             address: process.env.MAIL_USER,
//         },
//         to: ["...@gmail.com"],
//         subject: "...",
//         text: messageContent,
//         html: `<messageContent>`,
//         attachments: [
//             {
//                 filename: "MusCo.png",
//                 path: path.join(__dirname, "MusCo.png"),
//                 contentType: "image/png",
//             },
//             {
//                 filename: "MusCo.pdf",
//                 path: path.join(__dirname, "MusCo.pdf"),
//                 contentType: "application/pdf",
//             },
//         ],
//     };
// };

// module.exports = { sendMail };

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

module.exports = transporter;

// Looking to send emails in production? Check out our Email API/SMTP product!
// var transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//         user: "802f8f179c7966",
//         pass: "f519e82a7c61f5",
//     },
// });
