import nodemailer from 'nodemailer';

/**
 * Builds the function used to deliver contact messages.
 * With SMTP_* env vars set, mails are sent through SMTP.
 * Without them (local dev), messages are only logged to the console.
 */
export function createMailer(env = process.env) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = env;

  if (!SMTP_HOST) {
    return async (message) => {
      console.info('[contact] SMTP non configuré, message reçu :', message);
    };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  return async ({ name, email, message }) => {
    await transporter.sendMail({
      // The address must stay the SMTP account's (Gmail rewrites/rejects others),
      // but the display name can show who wrote the message.
      from: { name: `${name} via Portfolio`, address: CONTACT_FROM || SMTP_USER },
      to: CONTACT_TO || SMTP_USER,
      replyTo: { name, address: email },
      subject: `[Portfolio] Message de ${name} (${email})`,
      text: `${message}\n\n— ${name} (${email})`,
    });
  };
}
