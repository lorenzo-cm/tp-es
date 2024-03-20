import nodemailer from 'nodemailer';
import { emailConfig } from '../mail/mail.js';

export const sendConfirmationEmail = async (userEmail, confirmationCode) => {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: emailConfig.auth.user,
    to: userEmail,
    subject: 'Confirmação de Cadastro',
    text: `Seu código de confirmação é: ${confirmationCode}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
};
