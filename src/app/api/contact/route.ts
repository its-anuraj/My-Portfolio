import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limiter";
import { validateContactSubmission, sendContactMessage } from "@/lib/email-service";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // 1. Extract client IP for rate limiting
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const clientIp = forwarded ? forwarded.split(",")[0].trim() : realIp || "127.0.0.1";

  // 2. Check rate limit: 5 requests per 10 minutes per IP
  const rateLimit = checkRateLimit(clientIp, 5, 10 * 60 * 1000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `Too many submissions from your connection. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.resetInSeconds),
        },
      }
    );
  }

  // 3. Safe JSON parsing
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Malformed request payload. JSON body is required.",
      },
      { status: 400 }
    );
  }

  // 4. Validate & sanitize inputs (includes honeypot check)
  const validation = validateContactSubmission(body);

  // If honeypot caught a bot, return silent success without dispatching email
  if (validation.isSpam) {
    return NextResponse.json({
      success: true,
      message: "Message received. Thank you!",
    });
  }

  if (!validation.isValid || !validation.data) {
    return NextResponse.json(
      {
        success: false,
        error: validation.error || "Invalid form submission data.",
      },
      { status: 400 }
    );
  }

  // 5. Deliver the message to the configured portfolio inbox
  try {
    const result = await sendContactMessage(validation.data);

    if (result.success && result.accepted) {
      return NextResponse.json({
        success: true,
        message: "Message sent successfully! Thank you for reaching out.",
        provider: result.provider,
        timestamp: validation.data.submittedAtIso,
      });
    }

    // Backend or email provider rejected/failed
    const errorMessage = result.error || result.statusMessage || "Unable to send your message at this time.";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        provider: result.provider,
      },
      { status: 502 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error occurred while processing message.";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}

// Disallow other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to submit contact messages." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
