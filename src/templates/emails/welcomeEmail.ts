export const welcomeEmail = (userName: string) => ({
  subject: "Welcome to E-commerce - Your Account Has Been Created!",
  text: `Dear ${userName},

Thank you for creating an account with E-commerce! We're excited to have you join our community.

Your account has been successfully created and you can now:
- Browse our extensive product catalog
- Add items to your wishlist
- Make purchases
- And much more!

If you have any questions or need assistance, please don't hesitate to contact our support team.

Best regards,
The E-commerce Team`,
  html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>Welcome to E-commerce!</h2>
    <p>Dear ${userName},</p>
    <p>Thank you for creating an account with E-commerce! We're excited to have you join our community.</p>
    <p>Your account has been successfully created and you can now:</p>
    <ul>
      <li>Browse our extensive product catalog</li>
      <li>Add items to your wishlist</li>
      <li>Make purchases</li>
      <li>And much more!</li>
    </ul>
    <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
    <p>Best regards,<br>The E-commerce Team</p>
  </div>`,
});
