const transporter = require("./mailer");

async function sendMail({to, subject ,text, html }) {
    return transporter.sendMail({
        from : 'TEAM_CONTEST',
        to,
        subject,
        text,
        html,
    });
}

module.exports = sendMail;
