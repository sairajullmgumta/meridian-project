import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { patient_name, email, department, preferred_date, preferred_time } = await req.json();

    const departmentLabels = {
      cardiology: "Cardiology",
      neurology: "Neurology",
      orthopedics: "Orthopedics",
      pediatrics: "Pediatrics",
      dermatology: "Dermatology",
      oncology: "Oncology",
      general_medicine: "General Medicine",
      emergency: "Emergency",
    };

    const timeLabels = {
      morning: "Morning (8AM - 12PM)",
      afternoon: "Afternoon (12PM - 5PM)",
      evening: "Evening (5PM - 8PM)",
    };

    const deptLabel = departmentLabels[department] || department;
    const timeLabel = timeLabels[preferred_time] || preferred_time || "To be confirmed";

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #0d9488, #059669); padding: 40px 32px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Meridian Health</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Appointment Confirmation</p>
        </div>
        <div style="padding: 40px 32px; background: #f8fafc; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
          <p style="color: #334155; font-size: 16px; margin: 0 0 24px;">Hello <strong>${patient_name}</strong>,</p>
          <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 28px;">
            Your appointment request has been <strong style="color: #0d9488;">confirmed</strong>. Here are your appointment details:
          </p>

          <div style="background: white; border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden; margin-bottom: 28px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 14px 20px; color: #94a3b8; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; width: 40%;">Department</td>
                <td style="padding: 14px 20px; color: #1e293b; font-size: 15px; font-weight: 600;">${deptLabel}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 14px 20px; color: #94a3b8; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Date</td>
                <td style="padding: 14px 20px; color: #1e293b; font-size: 15px; font-weight: 600;">${preferred_date}</td>
              </tr>
              <tr>
                <td style="padding: 14px 20px; color: #94a3b8; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Time Slot</td>
                <td style="padding: 14px 20px; color: #1e293b; font-size: 15px; font-weight: 600;">${timeLabel}</td>
              </tr>
            </table>
          </div>

          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 16px 20px; margin-bottom: 28px;">
            <p style="color: #166534; font-size: 14px; margin: 0; line-height: 1.6;">
              ✅ Our patient coordinators will reach out to confirm your exact appointment time. If you have any questions, call us at <strong>571-202-4306</strong>.
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
        subject: "Appointment Confirmation – Meridian Health",
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