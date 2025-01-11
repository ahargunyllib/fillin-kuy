"use client";

import { ThemeProvider } from "@/shared/components/providers/ThemeProvider";
import type React from "react";
import NuqsProvider from "./NuqsProvider";
import SessionProvider from "./SessionProvider";
import TRPCProvider from "./TRPCProvider";

export default function Provider({ children }: React.PropsWithChildren) {
	return (
		<SessionProvider>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<NuqsProvider>
					<TRPCProvider>{children}</TRPCProvider>
				</NuqsProvider>
			</ThemeProvider>
		</SessionProvider>
	);
}
