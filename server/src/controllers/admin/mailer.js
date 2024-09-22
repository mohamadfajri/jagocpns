const transporter = require('../../utils/nodemailer');
const prisma = require('../../utils/prismaClient');

const emailTestHandler = async (req, res) => {
  const { email, body, subject } = req.body;

  if (!email || !body || !subject) {
    return res
      .status(400)
      .json({ message: 'Email, body, and subject are required' });
  }

  const mailOptions = {
    from: 'admin@jagocpns.id',
    to: email,
    subject: subject,
    html: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to send email', error: error.message });
  }
};

const broadcastHandler = async (req, res) => {
  const { range, subject, body } = req.body;

  if (!range || !subject || !body) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  const { start, end } = range;

  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          gte: start,
          lte: end,
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: 'No users found in the given range' });
    }

    const sendEmailPromises = users.map(async (user) => {
      const emailData = {
        from: 'admin@jagocpns.id',
        to: user.email,
        subject: subject,
        html: body,
      };

      try {
        await transporter.sendMail(emailData);
      } catch (error) {
        console.error(`Failed to send email to ${user.email}:`, error);
      }
    });

    await Promise.all(sendEmailPromises);

    res.status(200).json({ message: 'Broadcast complete' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { emailTestHandler, broadcastHandler };
