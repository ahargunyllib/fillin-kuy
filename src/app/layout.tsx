import "@/shared/styles/globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Provider from "../shared/components/providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "FillinKuy",
	description: "FillinKuy is a web app for filling out forms.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
