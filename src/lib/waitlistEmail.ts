/**
 * Images are referenced by `cid:` and attached by the caller, so they render
 * without a network fetch — no remote-image blocking, and no dependency on
 * the site being reachable.
 */
export const EMAIL_IMAGES = [
	{ cid: "cc-logo", path: "public/images/email-logo.png" },
	{ cid: "cc-phone", path: "public/images/email-phone.png" },
	{ cid: "cc-instagram", path: "public/images/social/instagram.png" },
	{ cid: "cc-linkedin", path: "public/images/social/linkedin.png" },
	{ cid: "cc-globe", path: "public/images/social/globe.png" },
] as const;

export function waitlistWelcomeEmail() {
	return `
<!doctype html>
<html>
  <head>
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />

    <style>
      :root { color-scheme: dark; supported-color-schemes: dark; }

      /* Default markup is the mobile stack: phone, then copy. Clients that
         honour <style> get the desktop columns instead — copy left, phone
         right. The Gmail app strips this block and shows the stack, which is
         the correct layout there anyway. */
      @media only screen and (min-width: 601px) {
        .e-phone {
          float: right !important;
          width: 220px !important;
          padding-left: 20px !important;
        }
        .e-copy {
          float: left !important;
          width: 320px !important;
        }
      }

    </style>
  </head>
  
  <body style="margin:0;padding:0;background:#231f20;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#231f20;padding:32px 16px;">
      <tr><td align="center">
        <table width="100%" style="max-width:600px;" cellpadding="0" cellspacing="0">

          <tr><td align="center" style="padding-bottom:24px;">
            <img src="cid:cc-logo" alt="Cult Creative" width="180" height="73" style="display:block;border:0;" />
          </td></tr>

          <tr><td style="border-top:1px solid rgba(255,255,255,0.2);padding-top:32px;">
            <h1 style="margin:0 0 8px;color:#fff;font-size:32px;line-height:1.2;font-weight:bold;">
              Thanks For Joining The Waitlist
            </h1>
            <p style="margin:0 0 28px;color:#fff;font-size:18px;font-style:italic;font-family:Times,serif;">
              We're so excited for you to get your hands on it.
            </p>

            <!--
              Default (and Gmail-app) rendering is this stack: phone, then
              copy. The min-width media query in <head> floats them into
              columns on clients that honour it.
            -->
            <div class="e-phone" style="width:100%;text-align:center;">
              <img src="cid:cc-phone" alt="The Cult Creative creator app" width="200" style="display:inline-block;border:0;max-width:100%;height:auto;margin:0 0 24px;" />
            </div>

            <div class="e-copy" style="width:100%;">
              <p style="margin:0 0 20px;color:rgba(255,255,255,0.9);font-size:15px;line-height:1.4;">
                You'll be sent a download link to this email address once
                the early access has been sent out.
              </p>

              <p style="margin:0 0 20px;color:rgba(255,255,255,0.9);font-size:15px;line-height:1.4;">
                Until then, do check out our
                <a href="https://app.cultcreativeasia.com" style="color:#8a5afe;">platform</a> and
                <a href="https://instagram.com/cultcreativeasia" style="color:#8a5afe;">Instagram</a>
                for the latest news on campaigns and app updates!
              </p>

              <p style="margin:0 0 20px;color:rgba(255,255,255,0.9);font-size:15px;line-height:1.4;">
                We look forward to be working with you soon, take care!
              </p>

              <p style="margin:0 0 24px;color:rgba(255,255,255,0.9);font-size:15px;line-height:1.4;">
                The Cult Creative Team
              </p>
            </div>

            <div style="clear:both;font-size:0;line-height:0;">&nbsp;</div>
          </td></tr>

          <tr><td style="background:#f2f2f2;border-radius:8px;padding:24px;text-align:center;">
            <table cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 16px;">
              <tr>
                <td style="padding:0 10px;">
                  <a href="https://instagram.com/cultcreativeasia" target="_blank">
                    <img src="cid:cc-instagram" alt="Instagram" width="28" height="28" style="display:block;border:0;" />
                  </a>
                </td>
                <td style="padding:0 10px;">
                  <a href="https://www.linkedin.com/company/cultcreativeapp/" target="_blank">
                    <img src="cid:cc-linkedin" alt="LinkedIn" width="28" height="28" style="display:block;border:0;" />
                  </a>
                </td>
                <td style="padding:0 10px;">
                  <a href="https://cultcreativeasia.com" target="_blank">
                    <img src="cid:cc-globe" alt="Website" width="28" height="28" style="display:block;border:0;" />
                  </a>
                </td>
              </tr>
            </table>

            <a href="mailto:hello@cultcreative.asia" style="color:#231f20;font-size:14px;font-weight:bold;">
              hello@cultcreative.asia
            </a>
            <p style="margin:16px 0 0;color:#8e8e93;font-size:11px;line-height:1.5;">
              Cult Creative — Empowering creators to shape the future of brands.<br/>
            </p>
            <p style="margin:16px 0 0;color:#8e8e93;font-size:11px;line-height:1.5;">
              Cult Creative Sdn. Bhd.<br/> 
              A-5-3A, Block A, Jaya One,<br/>
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
