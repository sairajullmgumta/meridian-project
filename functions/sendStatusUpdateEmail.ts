import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { patient_name, email, status, department, date } = await req.json();

    const statusConfig = {
      Confirmed: {
        label: "Confirmed",
        color: "#059669",
        bg: "#f0fdf4",
        border: "#bbf7d0",
        textColor: "#166534",
        icon: "✅",
        message: "Great news! Your appointment has been <strong style='color:#059669;'>confirmed</strong>. We look forward to seeing you.",
      },
      Cancelled: {
        label: "Cancelled",
        color: "#e11d48",
        bg: "#fff1f2",
        border: "#fecdd3",
        textColor: "#9f1239",
        icon: "❌",
        message: "We're sorry to inform you that your appointment has been <strong style='color:#e11d48;'>cancelled</strong>. Please contact us to reschedule.",
      },
      Pending: {
        label: "Pending",
        color: "#d97706",
        bg: "#fffbeb",
        border: "#fde68a",
        textColor: "#92400e",
        icon: "⏳",
        message: "Your appointment status has been updated to <strong style='color:#d97706;'>Pending</strong>. Our team will be in touch shortly.",
      },
    };

    const cfg = statusConfig[status] || statusConfig["Pending"];

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #0d9488, #059669); padding: 40px 32px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Meridian Health</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Appointment Update</p>
        </div>
        <div style="padding: 40px 32px; background: #f8fafc; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
          <p style="color: #334155; font-size: 16px; margin: 0 0 16px;">Hello <strong>${patient_name}</strong>,</p>
          <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
            ${cfg.message}
          </p>

          <div style="background: white; border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              ${department ? `<tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 14px 20px; color: #94a3b8; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; width: 40%;">Department</td>
                <td style="padding: 14px 20px; color: #1e293b; font-size: 15px; font-weight: 600; text-transform: capitalize;">${department}</td>
              </tr>` : ""}
              ${date ? `<tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 14px 20px; color: #94a3b8; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Date</td>
                <td style="padding: 14px 20px; color: #1e293b; font-size: 15px; font-weight: 600;">${date}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 14px 20px; color: #94a3b8; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Status</td>
                <td style="padding: 14px 20px; font-size: 15px; font-weight: 700; color: ${cfg.color};">${cfg.icon} ${cfg.label}</td>
              </tr>
            </table>
          </div>

          <div style="background: ${cfg.bg}; border: 1px solid ${cfg.border}; border-radius: 10px; padding: 16px 20px; margin-bottom: 28px;">
            <p style="color: ${cfg.textColor}; font-size: 14px; margin: 0; line-height: 1.6;">
              If you have any questions, please call us at <strong>571-202-4306</strong> or reply to this email.
            </p>
          </div>

          <p style="color: #94a3b8; font-size: 13px; margin: 0; text-align: center;">
            © 2026 Meridian Health · 123 Healthcare Blvd, New York, NY 10001
          </p>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Meridian Health <onboarding@resend.dev>",
        to: [email],
        subject: `Appointment ${cfg.label} – Meridian Health`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ success: false, error: err }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});