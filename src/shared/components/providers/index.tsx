"use client";

import { ThemeProvider } from "@/shared/components/providers/ThemeProvider";
import type React from "react";
import SessionProvider from "./SessionProvider";
import TRPCProvider from "./TRPCProvider";

export default function Provider({ children }: React.PropsWithChildren) {
	return (
		<SessionProvider>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<TRPCProvider>{children}</TRPCProvider>
			</ThemeProvider>
		</SessionProvider>
	);
}
