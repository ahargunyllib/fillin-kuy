"use client";

import {
	AudioWaveformIcon,
	BookOpenIcon,
	BotIcon,
	CommandIcon,
	FrameIcon,
	GalleryVerticalEndIcon,
	MapIcon,
	NotepadTextIcon,
	PieChartIcon,
	Settings2Icon,
	SquareTerminalIcon,
} from "lucide-react";
import type * as React from "react";

import { NavSecondary } from "@/features/dashboard/components/SecNav";
import { TeamSwitcher } from "@/features/dashboard/components/TeamSwticher";
import { NavUser } from "@/features/dashboard/components/UserNav";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/shared/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// This is sample data.
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEndIcon,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveformIcon,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: CommandIcon,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Playground",
			url: "#",
			icon: SquareTerminalIcon,
			isActive: true,
			items: [
				{
					title: "History",
					url: "#",
				},
				{
					title: "Starred",
					url: "#",
				},
				{
					title: "Settings",
					url: "#",
				},
			],
		},
		{
			title: "Models",
			url: "#",
			icon: BotIcon,
			items: [
				{
					title: "Genesis",
					url: "#",
				},
				{
					title: "Explorer",
					url: "#",
				},
				{
					title: "Quantum",
					url: "#",
				},
			],
		},
		{
			title: "Documentation",
			url: "#",
			icon: BookOpenIcon,
			items: [
				{
					title: "Introduction",
					url: "#",
				},
				{
					title: "Get Started",
					url: "#",
				},
				{
					title: "Tutorials",
					url: "#",
				},
				{
					title: "Changelog",
					url: "#",
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2Icon,
			items: [
				{
					title: "General",
					url: "#",
				},
				{
					title: "Team",
					url: "#",
				},
				{
					title: "Billing",
					url: "#",
				},
				{
					title: "Limits",
					url: "#",
				},
			],
		},
	],
	features: [
		{
			name: "Forms",
			url: "/dashboard/forms",
			icon: NotepadTextIcon,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { status } = useSession();
	const router = useRouter();

	if (status === "unauthenticated") {
		router.replace("/api/auth/signin");
		return null;
	}

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				{/* <NavMain label="Form" items={data.navMain} /> */}
				<NavSecondary label="Features" items={data.features} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
