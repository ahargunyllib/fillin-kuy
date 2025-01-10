import { ModeToggle } from "@/shared/components/ModeToggle";
import UnstyledLink from "@/shared/components/UnstyledLink";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { LoaderCircle, MenuIcon, PlusIcon } from "lucide-react";

export default function DesignSystemPage() {
	return (
		<section className="container mx-auto">
			<div className="layout mt-20 space-y-4">
				<ModeToggle />
				<div>
					<h1>Design System Page</h1>
					<p>These are the components that are used in the app.</p>
				</div>

				<div className="space-y-2">
					<h2>Typography</h2>
					<div className="p-4 border">
						<h1>Heading 1</h1>
						<h2>Heading 2</h2>
						<h3>Heading 3</h3>
						<h4>Heading 4</h4>
						<p>Paragraph </p>
					</div>
				</div>

				<div className="space-y-2">
					<div>
						<h1>Componenets</h1>
						<p>
							Some of the components are from{" "}
							<Button variant="link" className="p-0 text-blue-800">
								<UnstyledLink href="http://ui.shadcn.com">shadcn</UnstyledLink>
							</Button>
							,{" "}
							<Button variant="link" className="p-0 text-blue-800">
								<UnstyledLink href="http://originui.com">origin</UnstyledLink>
							</Button>
							,{" "}
							<Button variant="link" className="p-0 text-blue-800">
								<UnstyledLink href="http://twblocks.com">twblocks</UnstyledLink>
							</Button>
							,{" "}
							<Button variant="link" className="p-0 text-blue-800">
								<UnstyledLink href="https://ui.aceternity.com/">
									aceternity
								</UnstyledLink>
							</Button>
						</p>
					</div>
					<div className="p-4 border flex flex-col gap-4">
						<div className="space-y-2">
							<h3>Buttons</h3>
							<div className="flex flex-row gap-2 items-center">
								<Button>
									<PlusIcon /> Primary
								</Button>
								<Button disabled>
									<LoaderCircle
										className="-ms-1 me-2 animate-spin"
										size={16}
										strokeWidth={2}
										aria-hidden="true"
									/>
									Loading
								</Button>
								<Button variant="secondary">Secondary</Button>
								<Button variant="outline">Outline</Button>
								<Button variant="destructive">Destructive</Button>
								<Button variant="ghost">Ghost</Button>
								<Button variant="link">Link</Button>
								<Button size="sm">Small</Button>
								<Button size="lg">Large</Button>
								<Button size="icon">
									<MenuIcon />
								</Button>
							</div>
						</div>
						<div className="space-y-2">
							<h3>Inputs</h3>
							<div className="flex flex-row gap-2 items-center">
								<Input placeholder="Default" />
								<Input placeholder="File" type="file" />
								<Input placeholder="Disabled" disabled />
								<Textarea placeholder="Textarea" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
