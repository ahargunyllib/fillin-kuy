import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "./server/db";
import { sessions } from "./server/db/schema";

export default async function middleware(req: NextRequest) {
	const sessionCookie = req.cookies.get("authjs.session-token");

	if (!sessionCookie) {
		const newUrl = new URL("/api/auth/signin", req.nextUrl.origin);
		return NextResponse.redirect(newUrl);
	}

	// ! This is not working
	// const sessionToken = sessionCookie.value;
	// const [session] = await db
	// 	.select()
	// 	.from(sessions)
	// 	.where(eq(sessions.sessionToken, sessionToken));

	// if (!session) {
	// 	const newUrl = new URL("/api/auth/signin", req.nextUrl.origin);
	// 	return NextResponse.redirect(newUrl);
	// }

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
