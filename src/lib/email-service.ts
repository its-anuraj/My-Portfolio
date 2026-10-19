import nodemailer from "nodemailer";

export interface ContactInput {
  name: string;
  email: string;
  message: string;
  _honey_field?: string;
}

export interface SanitizedContactData {
  name: string;
  email: string;
  message: string;
  submittedAtIso: string;
  submittedAtReadable: string;
}

export interface SendResult {
  success: boolean;
  accepted: boolean;
  provider: "resend" | "smtp" | "formsubmit_relay" | "dev_mock";
  messageId?: string;
  statusMessage: string;
  error?: string;
  details?: Record<string, unknown>;
}

// Strip CR/LF characters to prevent email header injection
export function sanitizeHeader(str: string): string {
  return str.replace(/[\r\n\t]/g, " ").trim();
}

/**
 * Validates and sanitizes incoming contact submission data.
 */
export function validateContactSubmission(body: Record<string, unknown>): {
  isValid: boolean;
  isSpam: boolean;
  error?: string;
  data?: SanitizedContactData;
} {
  // 1. Silent anti-spam honeypot detection
  const honey = body._honey_field || body.honey || body.website;
  if (typeof honey === "string" && honey.trim().length > 0) {
    return {
      isValid: false,
      isSpam: true,
      error: "Spam detected.",
    };
  }

  const rawName = typeof body.name === "string" ? body.name.trim() : "";
  const rawEmail = typeof body.email === "string" ? body.email.trim() : "";
  const rawMessage = typeof body.message === "string" ? body.message.trim() : "";

  // 2. Required fields check
  if (!rawName || !rawEmail || !rawMessage) {
    return {
      isValid: false,
      isSpam: false,
      error: "Please complete all required fields (Name, Email, Message).",
    };
  }

  // 3. Length checks
  if (rawName.length > 100) {
    return {
      isValid: false,
      isSpam: false,
      error: "Name must not exceed 100 characters.",
    };
  }

  if (rawEmail.length > 254) {
    return {
      isValid: false,
      isSpam: false,
      error: "Email address must not exceed 254 characters.",
    };
  }

  if (rawMessage.length < 5) {
    return {
      isValid: false,
      isSpam: false,
      error: "Message must be at least 5 characters long.",
    };
  }

  if (rawMessage.length > 3000) {
    return {
      isValid: false,
      isSpam: false,
      error: "Message must not exceed 3000 characters.",
    };
  }

  // 4. RFC 5322 compliant regex for email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(rawEmail)) {
    return {
      isValid: false,
      isSpam: false,
      error: "Please enter a valid email address.",
    };
  }

  const now = new Date();
  const submittedAtIso = now.toISOString();
  const submittedAtReadable = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Asia/Kolkata",
  }).format(now);

  return {
    isValid: true,
    isSpam: false,
    data: {
      name: sanitizeHeader(rawName),
      email: sanitizeHeader(rawEmail),
      message: rawMessage,
      submittedAtIso,
      submittedAtReadable,
    },
  };
}

/**
 * Builds rich HTML and plain text email content matching the portfolio's aesthetics.
 */
function buildEmailTemplates(data: SanitizedContactData) {
  const subject = `New Portfolio Contact Message from ${data.name}`;

  const text = [
    `NEW PORTFOLIO CONTACT MESSAGE`,
    `=============================`,
    ``,
    `Sender Name: ${data.name}`,
    `Sender Email: ${data.email}`,
    `Date & Time: ${data.submittedAtReadable} (${data.submittedAtIso})`,
    ``,
    `MESSAGE:`,
    `-----------------------------`,
    data.message,
    `-----------------------------`,
    ``,
    `Reply directly to this email to respond to ${data.name}.`,
  ].join("\n");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #F8F5EE;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1A1A1A;
    }
    .container {
      max-width: 600px;
      margin: 32px auto;
      background: #FFFFFF;
      border: 1px solid #E6D8B8;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(180, 154, 90, 0.12);
    }
    .header {
      background: linear-gradient(135deg, #1A1A1A 0%, #2A2518 100%);
      padding: 32px;
      text-align: center;
      border-bottom: 2px solid #B49A5A;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      color: #F8F5EE;
      letter-spacing: -0.01em;
    }
    .badge {
      display: inline-block;
      margin-top: 8px;
      padding: 4px 12px;
      border-radius: 9999px;
      background: rgba(180, 154, 90, 0.25);
      border: 1px solid #B49A5A;
      color: #E6D8B8;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .content {
      padding: 32px;
    }
    .field-card {
      background: #FAF8F2;
      border: 1px solid #EAE3D2;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 24px;
    }
    .field-row {
      display: flex;
      padding: 6px 0;
      border-bottom: 1px dashed #E2D9C3;
      font-size: 14px;
    }
    .field-row:last-child {
      border-bottom: none;
    }
    .field-label {
      font-weight: 600;
      color: #7A6F54;
      width: 110px;
      flex-shrink: 0;
    }
    .field-value {
      color: #1A1A1A;
      font-weight: 500;
      word-break: break-word;
    }
    .field-value a {
      color: #9D8449;
      text-decoration: underline;
    }
    .message-box {
      background: #FFFFFF;
      border-left: 4px solid #B49A5A;
      padding: 20px;
      border-radius: 0 12px 12px 0;
      background: #FDFBF7;
      border-top: 1px solid #EFEAE0;
      border-right: 1px solid #EFEAE0;
      border-bottom: 1px solid #EFEAE0;
      font-size: 15px;
      line-height: 1.65;
      color: #222222;
      white-space: pre-wrap;
    }
    .footer {
      padding: 20px 32px;
      background: #FAF8F2;
      border-top: 1px solid #EAE3D2;
      text-align: center;
      font-size: 12px;
      color: #8C826C;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Portfolio Inquiry</h1>
      <span class="badge">Contact Form Submission</span>
    </div>
    <div class="content">
      <div class="field-card">
        <div class="field-row">
          <span class="field-label">Sender Name:</span>
          <span class="field-value">${data.name}</span>
        </div>
        <div class="field-row">
          <span class="field-label">Sender Email:</span>
          <span class="field-value"><a href="mailto:${data.email}">${data.email}</a></span>
        </div>
        <div class="field-row">
          <span class="field-label">Submitted At:</span>
          <span class="field-value">${data.submittedAtReadable}</span>
        </div>
      </div>

      <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #7A6F54;">
        Message Content
      </h3>
      <div class="message-box">${data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
    </div>
    <div class="footer">
      Delivered securely via personal portfolio contact form.<br>
      You can reply directly to this email to reach <strong>${data.name}</strong> (${data.email}).
    </div>
  </div>
</body>
</html>
  `;

  return { subject, text, html };
}

/**
 * Delivers the message using the best available configured email provider.
 * Supports:
 * 1. Resend API (HTTP REST, zero config dependencies, recommended for Vercel)
 * 2. Nodemailer SMTP (Gmail App Password, Outlook, Postmark, AWS SES, or custom SMTP)
 * 3. Server-side FormSubmit Relay (Server-to-server fallback if keys are missing)
 * 4. Dev Mock (if explicitly enabled via ENABLE_DEV_MOCK_DELIVERY=true for offline testing)
 */
export async function sendContactMessage(data: SanitizedContactData): Promise<SendResult> {
  const destinationEmail = process.env.CONTACT_DESTINATION_EMAIL || "ajsinghindolia@gmail.com";
  const { subject, text, html } = buildEmailTemplates(data);

  // ── Option A: Resend API ──────────────────────────────────────────────────
  if (process.env.RESEND_API_KEY) {
    try {
      const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [destinationEmail],
          reply_to: data.email,
          subject,
          text,
          html,
        }),
      });

      const responseData = await res.json().catch(() => ({}));

      if (res.ok && responseData.id) {
        return {
          success: true,
          accepted: true,
          provider: "resend",
          messageId: responseData.id,
          statusMessage: "Message accepted by Resend and queued for delivery.",
        };
      }

      const resendError = responseData.message || responseData.error || `HTTP ${res.status}`;
      return {
        success: false,
        accepted: false,
        provider: "resend",
        statusMessage: "Resend rejected the message dispatch.",
        error: String(resendError),
      };
    } catch (err: unknown) {
      return {
        success: false,
        accepted: false,
        provider: "resend",
        statusMessage: "Failed to communicate with Resend API.",
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  // ── Option B: SMTP via Nodemailer ─────────────────────────────────────────
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const isSecure = process.env.SMTP_SECURE === "true" || (!process.env.SMTP_PORT || process.env.SMTP_PORT === "465");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "465", 10),
        secure: isSecure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
      });

      const fromAddress = process.env.CONTACT_FROM_EMAIL || `"${data.name} (Portfolio)" <${process.env.SMTP_USER}>`;

      const info = await transporter.sendMail({
        from: fromAddress,
        to: destinationEmail,
        replyTo: data.email,
        subject,
        text,
        html,
      });

      return {
        success: true,
        accepted: (info.accepted && info.accepted.length > 0) || true,
        provider: "smtp",
        messageId: info.messageId,
        statusMessage: "Message accepted by SMTP server for inbox delivery.",
      };
    } catch (err: unknown) {
      return {
        success: false,
        accepted: false,
        provider: "smtp",
        statusMessage: "SMTP server rejected the email transmission.",
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  // ── Option C: Server-Side FormSubmit Relay Fallback ────────────────────────
  // Only attempts server-side dispatch if neither Resend nor SMTP is configured
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const relayResponse = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(destinationEmail)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        _subject: subject,
        _replyto: data.email,
        _template: "table",
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const relayData = await relayResponse.json().catch(() => ({}));

    // FormSubmit returns { success: "true", message: ... } on success
    if (relayResponse.ok && (relayData.success === "true" || relayData.success === true)) {
      return {
        success: true,
        accepted: true,
        provider: "formsubmit_relay",
        statusMessage: "Message accepted by relay server for forwarding.",
        details: { relayMessage: relayData.message },
      };
    }

    // Check if FormSubmit reported an activation requirement
    if (relayData.message && typeof relayData.message === "string" && relayData.message.toLowerCase().includes("activate")) {
      return {
        success: false,
        accepted: false,
        provider: "formsubmit_relay",
        statusMessage: "Email activation pending.",
        error: "FormSubmit requires one-time activation. Check ajsinghindolia@gmail.com to activate the form, or configure RESEND_API_KEY in your environment.",
      };
    }

    // If relay failed and dev mode is active
    if (process.env.NODE_ENV === "development" && process.env.ENABLE_DEV_MOCK_DELIVERY === "true") {
      console.log("[DEV MOCK] Contact Form Message Received:", {
        to: destinationEmail,
        data,
      });
      return {
        success: true,
        accepted: true,
        provider: "dev_mock",
        statusMessage: "Development mock delivery accepted.",
      };
    }

    return {
      success: false,
      accepted: false,
      provider: "formsubmit_relay",
      statusMessage: "Relay server could not deliver the message.",
      error: relayData.message || `Relay server responded with status ${relayResponse.status}`,
    };
  } catch (err: unknown) {
    if (process.env.NODE_ENV === "development" && process.env.ENABLE_DEV_MOCK_DELIVERY === "true") {
      console.log("[DEV MOCK fallback] Contact Form Message:", {
        to: destinationEmail,
        data,
      });
      return {
        success: true,
        accepted: true,
        provider: "dev_mock",
        statusMessage: "Development mock delivery accepted.",
      };
    }

    const isTimeout = err instanceof Error && err.name === "AbortError";
    return {
      success: false,
      accepted: false,
      provider: "formsubmit_relay",
      statusMessage: isTimeout ? "Delivery request timed out." : "Email dispatch service unavailable.",
      error: isTimeout
        ? "The email service took too long to respond. Please try again or email directly."
        : (err instanceof Error ? err.message : String(err)),
    };
  }
}
