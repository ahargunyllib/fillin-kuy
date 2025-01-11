import { AppSidebar } from "@/features/dashboard/components/Sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	);
}
