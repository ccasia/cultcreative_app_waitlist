import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import { join } from "node:path";
import { EMAIL_IMAGES, waitlistWelcomeEmail } from "@/lib/waitlistEmail";

const sheets = google.sheets("v4");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
	try {
		const { email } = await request.json();

		if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
			return NextResponse.json(
				{ error: "Please enter a valid email address." },
				{ status: 400 },
			);
		}

		const cleanEmail = email.trim().toLowerCase();
		const spreadsheetId = process.env.WAITLIST_SHEET_ID;

		if (!spreadsheetId) {
			console.error("WAITLIST_SHEET_ID not configured");
			return NextResponse.json(
				{ error: "Server misconfigured." },
				{ status: 500 },
			);
		}

		// 1. Append to the sheet — this is the part that must succeed.
		const auth = new google.auth.GoogleAuth({
			credentials: {
				type: "service_account",
				private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
				client_email: process.env.GOOGLE_CLIENT_EMAIL,
			} as Record<string, string | undefined>,
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
		});

		await sheets.spreadsheets.values.append({
			auth,
			spreadsheetId,
			range: "'Waitlist'!A:C",
			valueInputOption: "USER_ENTERED",
			requestBody: {
				values: [[new Date().toISOString(), cleanEmail, "app-waitlist"]],
			},
		});

		// 2. Send the confirmation — best-effort, never fails the signup.
		try {
			const transport = nodemailer.createTransport({
				service: "gmail",
				host: "smtp.gmail.com",
				secure: false,
				auth: {
					user: process.env.SMTP_EMAIL,
					pass: process.env.SMTP_PASSWORD,
				},
			});

			await transport.sendMail({
				from: `"Cult Creative" <${process.env.SMTP_EMAIL}>`,
				to: cleanEmail,
				subject: "Thanks for joining the waitlist!",
				html: waitlistWelcomeEmail(),
				attachments: EMAIL_IMAGES.map((img) => ({
					cid: img.cid,
					filename: img.path.split("/").pop(),
					path: join(process.cwd(), img.path),
					contentDisposition: "inline" as const,
				})),
			});
		} catch (mailError) {
			console.error("Waitlist confirmation email failed:", mailError);
		}

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("Waitlist submission error:", error);
		return NextResponse.json(
			{ error: "Failed to register. Please try again." },
			{ status: 500 },
		);
	}
}
