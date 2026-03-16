// subject: `Registered Successfully: ${contestTitle} 🏁`,
const contestRegistrationText = `Hi user,

You have successfully registered for the contest.

Make sure to:
- Join before the contest starts
- Read the rules carefully
- Manage your time wisely

Best of luck 🍀
Team Contest Platform`;
const contestRegistrationHTML = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>You're in ! 🏁</h2>

            <p>
                You have successfully registered for:
            </p>

            <h3 style="color: #4f46e5;">contest</h3>

            <p>
                📌 Make sure to:
            </p>
            <ul>
                <li>Join before the contest starts</li>
                <li>Read the rules carefully</li>
                <li>Manage your time wisely</li>
            </ul>

            <p style="margin-top: 20px;">
                Best of luck 🍀<br/>
                <strong>Team Contest Platform</strong>
            </p>
        </div>
    `;

module.exports = { contestRegistrationText, contestRegistrationHTML };
