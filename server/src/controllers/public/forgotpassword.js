const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const transporter = require('../../utils/nodemailer');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const forgotPasswordHandler = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 3600 * 1000);

    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpires },
    });

    const resetUrl = `https://jagocpns.id/auth/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: '"Jago CPNS Reset Password" <noreply@jagocpns.id>',
      to: email,
      subject: 'Reset Password',
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #333;">Reset Your Password</h2>
      <p style="color: #555;">Hello,</p>
      <p style="color: #555;">Kami menerima permintaan untuk mengatur ulang kata sandi Anda. Klik tombol di bawah untuk mengatur ulang</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #FFCB01; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p style="color: #555;">Jika tombol tidak berfungsi, salin dan tempel tautan berikut ke browser Anda:</p>
      <hr style="border: none; border-top: 1px solid #ddd;">
      <p style="color: #999; font-size: 12px;">If the button doesn't work, copy and paste the following link into your browser:</p>
      <p style="color: #007BFF; font-size: 12px; word-break: break-all;">${resetUrl}</p>
      <p style="color: #999; font-size: 12px;">Tautan ini akan kedaluwarsa dalam 1 jam.</p>
      <p style="color: #999; font-size: 12px;">Terima Kasih, <br> Tim Jagocpns.id</p>
    </div>
  `,
    });

    res.json({ message: 'Reset password link has been sent to your email.' });
  } catch (error) {
    console.error('Error in forgot password handler:', error);
    res
      .status(500)
      .json({ message: 'An error occurred, please try again later.' });
  }
};

const resetPasswordHandler = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: { gt: new Date() }, // Pastikan token belum kedaluwarsa
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password user dan hapus token serta masa berlakunya
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    res.json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('Error in reset password handler:', error);
    res
      .status(500)
      .json({ message: 'An error occurred, please try again later.' });
  }
};

module.exports = { forgotPasswordHandler, resetPasswordHandler };
