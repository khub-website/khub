import nodemailer from "nodemailer";

export const runtime = "nodejs";

const REQUIRED_ENV_VARS = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "CONTACT_FORM_TO_EMAIL",
];

function getMissingEnvVars() {
  return REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
}

function buildTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure:
      process.env.SMTP_SECURE === "true" ||
      Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function isValidEmail(value) {
  return /^\S+@\S+\.\S+$/.test(value);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request) {
  const missingEnvVars = getMissingEnvVars();

  if (missingEnvVars.length > 0) {
    return Response.json(
      {
        message: `Email service is not configured. Missing: ${missingEnvVars.join(", ")}`,
      },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const firstName = body?.firstName?.trim() || "";
    const lastName = body?.lastName?.trim() || "";
    const email = body?.email?.trim() || "";
    const phone = body?.phone?.trim() || "";
    const inquiry = body?.inquiry?.trim() || "other";
    const message = body?.message?.trim() || "";

    if (!firstName || !lastName || !phone || !message || !isValidEmail(email)) {
      return Response.json(
        { message: "Please complete all fields with a valid email address." },
        { status: 400 }
      );
    }

    const transporter = buildTransporter();
    const recipient = process.env.CONTACT_FORM_TO_EMAIL;
    const fromAddress = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
    const fullName = `${firstName} ${lastName}`.trim();
    const normalizedInquiry =
      inquiry === "other"
        ? "Other"
        : inquiry.charAt(0).toUpperCase() + inquiry.slice(1);

    await transporter.sendMail({
      from: fromAddress,
      to: recipient,
      replyTo: email,
      subject: `New contact form submission from ${fullName}`,
      text: [
        "New contact form submission",
        "",
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Inquiry: ${normalizedInquiry}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Inquiry:</strong> ${escapeHtml(normalizedInquiry)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      `,
    });

    return Response.json({
      message: "Message sent successfully. We'll be in touch soon.",
    });
  } catch (error) {
    console.error("Contact form email failed", error);

    return Response.json(
      { message: "We couldn't send your message right now. Please try again." },
      { status: 500 }
    );
  }
}
