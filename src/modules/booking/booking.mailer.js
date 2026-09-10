import transporter from "../../config/mailer.js";


const humanize = (key) =>
    key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

// Turns any DB row object into clean "Label: value" HTML rows,
// skipping internal/id columns so it stays readable regardless of
// exact column names in services / service_types / common_issues.
const rowToHtmlRows = (row, skipKeys = ["id", "service_id", "created_at", "updated_at"]) => {
    if (!row) return "";
    return Object.entries(row)
        .filter(([key, value]) => !skipKeys.includes(key) && value !== null && value !== "")
        .map(([key, value]) => `<tr><td style="padding:4px 8px;color:#555;">${humanize(key)}</td><td style="padding:4px 8px;"><strong>${value}</strong></td></tr>`)
        .join("");
};

export const sendAdminBookingMail = async (booking) => {
    const {
        bookingId,
        customer_name,
        email,
        mobile,
        address,
        city,
        state,
        pincode,
        preferred_date,
        preferred_time,
        remarks,
        serviceRow,
        serviceTypeRow,
        issueRow,
    } = booking;

    const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;">
            <h2 style="color:#1a1a1a;">New Booking Received</h2>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <table style="border-collapse:collapse;width:100%;margin-bottom:16px;">
                <tr><td style="padding:4px 8px;color:#555;">Customer Name</td><td style="padding:4px 8px;"><strong>${customer_name}</strong></td></tr>
                <tr><td style="padding:4px 8px;color:#555;">Mobile</td><td style="padding:4px 8px;"><strong>${mobile}</strong></td></tr>
                ${email ? `<tr><td style="padding:4px 8px;color:#555;">Email</td><td style="padding:4px 8px;"><strong>${email}</strong></td></tr>` : ""}
                <tr><td style="padding:4px 8px;color:#555;">Address</td><td style="padding:4px 8px;"><strong>${address}</strong></td></tr>
                <tr><td style="padding:4px 8px;color:#555;">City</td><td style="padding:4px 8px;"><strong>${city || "-"}</strong></td></tr>
                <tr><td style="padding:4px 8px;color:#555;">State</td><td style="padding:4px 8px;"><strong>${state || "-"}</strong></td></tr>
                <tr><td style="padding:4px 8px;color:#555;">Pincode</td><td style="padding:4px 8px;"><strong>${pincode || "-"}</strong></td></tr>
                <tr><td style="padding:4px 8px;color:#555;">Preferred Date</td><td style="padding:4px 8px;"><strong>${preferred_date || "-"}</strong></td></tr>
                <tr><td style="padding:4px 8px;color:#555;">Preferred Time</td><td style="padding:4px 8px;"><strong>${preferred_time || "-"}</strong></td></tr>
                ${remarks ? `<tr><td style="padding:4px 8px;color:#555;">Remarks</td><td style="padding:4px 8px;"><strong>${remarks}</strong></td></tr>` : ""}
            </table>

            <h3 style="color:#1a1a1a;margin-bottom:4px;">Service Details</h3>
            <table style="border-collapse:collapse;width:100%;margin-bottom:16px;">
                ${rowToHtmlRows(serviceRow)}
                ${rowToHtmlRows(serviceTypeRow)}
                ${rowToHtmlRows(issueRow)}
            </table>

            <p style="color:#888;font-size:13px;">Please assign a technician for this booking.</p>
        </div>
    `;

    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Booking [${bookingId}] - ${customer_name}`,
        html,
    });
};

export const sendUserBookingMail = async (booking) => {
    const { bookingId, customer_name, email } = booking;

    if (!email) return; // user didn't provide an email, nothing to send

    const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;">
            <h2 style="color:#1a1a1a;">Thank you, ${customer_name}!</h2>
            <p>Your booking has been confirmed.</p>
            <p><strong>Booking No:</strong> ${bookingId}</p>
            <p>Our technician will contact you shortly to schedule the service.</p>
            <p style="color:#888;font-size:13px;margin-top:24px;">If you didn't request this, please ignore this email.</p>
        </div>
    `;

    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: `Booking Confirmed - ${bookingId}`,
        html,
    });
};