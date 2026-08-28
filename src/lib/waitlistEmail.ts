export function waitlistWelcomeEmail(siteUrl: string) {
	return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#231f20;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#231f20;padding:32px 16px;">
      <tr><td align="center">
        <table width="100%" style="max-width:600px;" cellpadding="0" cellspacing="0">

          <tr><td align="center" style="padding-bottom:24px;">
            <img src="${siteUrl}/favicon-192x192.png" alt="Cult Creative" width="64" height="64" style="display:block;border-radius:12px;" />
          </td></tr>

          <tr><td style="border-top:1px solid rgba(255,255,255,0.2);padding-top:32px;">
            <h1 style="margin:0 0 8px;color:#fff;font-size:32px;line-height:1.2;font-weight:bold;">
              Thanks For Joining The Waitlist
            </h1>
            <p style="margin:0 0 32px;color:#fff;font-size:18px;font-style:italic;font-family:Georgia,serif;">
              We're so excited for you to get your hands on it.
            </p>

            <p style="margin:0 0 20px;color:rgba(255,255,255,0.9);font-size:15px;line-height:1.6;">
              You'll be sent a download link to this email address once the early
              access has been sent out.
            </p>

            <p style="margin:0 0 20px;color:rgba(255,255,255,0.9);font-size:15px;line-height:1.6;">
              Until then, do check out our
              <a href="https://app.cultcreativeasia.com" style="color:#8a5afe;">platform</a> and
              <a href="https://instagram.com/cultcreativeasia" style="color:#8a5afe;">Instagram</a>
              for the latest news on campaigns and app updates!
            </p>

            <p style="margin:0 0 20px;color:rgba(255,255,255,0.9);font-size:15px;line-height:1.6;">
              We look forward to be working with you soon, take care!
            </p>

            <p style="margin:0 0 32px;color:rgba(255,255,255,0.9);font-size:15px;">
              The Cult Creative Team
            </p>
          </td></tr>

          <tr><td style="background:#f2f2f2;border-radius:8px;padding:24px;text-align:center;">
            <a href="mailto:hello@cultcreative.asia" style="color:#231f20;font-size:14px;font-weight:bold;">
              hello@cultcreative.asia
            </a>
            <p style="margin:16px 0 0;color:#8e8e93;font-size:11px;line-height:1.5;">
              Cult Creative — Empowering creators to shape the future of brands.<br/>
              Cult Creative Sdn. Bhd., A-5-3A, Block A, Jaya One,<br/>
              Jln Profesor Diraja Ungku Aziz, Seksyen 13, 46200 Petaling Jaya, Selangor<br/>
              Copyright © 2026 Cult Creative, All rights reserved
            </p>
          </td></tr>

        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}
