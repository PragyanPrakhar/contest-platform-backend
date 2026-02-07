const loginMail = ({ username }) => ({
    subject: "New Login Detected 🔐",
    text: `Hi ${username},

You just logged into your Contest Platform account.

If this was you, you can safely ignore this email.
If not, please secure your account immediately.

Happy coding 🚀
Team Contest Platform`,
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Hello ${username}, 🔐</h2>

            <p>
                A new login to your account was detected.
            </p>

            <p>
                <strong>If this was you</strong>, no action is needed.<br/>
                <strong>If this wasn't you</strong>, please reset your password immediately.
            </p>

            <p style="margin-top: 20px;">
                Stay safe,<br/>
                <strong>Team Contest Platform</strong>
            </p>
        </div>
    `,
});

module.exports = loginMail;
