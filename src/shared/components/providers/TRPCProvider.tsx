"use client";

import { TRPCReactProvider } from "@/trpc/react";

export default function TRPCProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <TRPCReactProvider>{children}</TRPCReactProvider>;
}
