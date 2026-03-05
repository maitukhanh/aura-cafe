import { Resend } from "resend";

interface OrderForEmail {
  id: string;
  customerName: string;
  phone: string;
  totalAmount: number;
  createdAt: Date;
}

export async function sendEmail(order: OrderForEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!apiKey || !adminEmail) {
    console.warn("Email credentials not configured, skipping notification.");
    return;
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "Aura Cafe <onboarding@resend.dev>",
      to: adminEmail,
      subject: `🛒 Đơn hàng mới #${order.id.slice(-6).toUpperCase()}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 500px; margin: 0 auto; padding: 32px; background: #fdfaf6; border-radius: 12px;">
          <h2 style="color: #3d2b1f; border-bottom: 2px solid #c5a059; padding-bottom: 12px;">
            ☕ Đơn hàng mới từ Aura Cafe
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 8px 0; color: #666;">Khách hàng:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #3d2b1f;">${order.customerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Số điện thoại:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #3d2b1f;">${order.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Tổng tiền:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #c5a059; font-size: 18px;">
                ${order.totalAmount.toLocaleString("vi-VN")}đ
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Thời gian đặt:</td>
              <td style="padding: 8px 0; color: #3d2b1f;">
                ${order.createdAt.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
              </td>
            </tr>
          </table>
          <p style="color: #999; font-size: 12px; margin-top: 24px; text-align: center;">
            Aura Cafe Management System
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
