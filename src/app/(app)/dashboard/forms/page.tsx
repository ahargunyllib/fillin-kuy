import FormCard from "@/features/form-management/components/FormCard";
import { FormFilter } from "@/features/form-management/components/FormFilter";
import { Button } from "@/shared/components/ui/button";
import { HydrateClient, api } from "@/trpc/server";
import { PlusIcon } from "lucide-react";
import {
	type SearchParams,
	createLoader,
	parseAsString,
	parseAsStringLiteral,
} from "nuqs/server";

export default async function Page({
	searchParams: searchParamsPromise,
}: { searchParams: Promise<SearchParams> }) {
	const loadSearchParams = createLoader({
		search: parseAsString.withDefault(""),
		status: parseAsStringLiteral(["all", "closed", "active"]).withDefault(
			"all",
		),
	});

	const { search, status } = await loadSearchParams(searchParamsPromise);

	const forms = await api.forms.getForms({ search, status });

	return (
		<HydrateClient>
			<header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex justify-between w-full items-center gap-2 p-4 ">
					<div className="">
						<h3>Form management</h3>
						<p>Create and manage your forms</p>
					</div>
					<Button className="flex items-center gap-2">
						<PlusIcon /> Create
					</Button>
				</div>
			</header>
			<main className="p-4 space-y-4">
				<FormFilter />
				<div className="border rounded-lg">
					{forms.length === 0 ? (
						<div className="p-4 text-center text-muted-foreground">
							No forms found
						</div>
					) : (
						forms.map((form) => <FormCard key={form.id} {...form} />)
					)}
				</div>
			</main>
		</HydrateClient>
	);
}
