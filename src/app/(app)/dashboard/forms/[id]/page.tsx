import { Fragment } from "react";
import FormField from "../../../../../features/form-management/components/FormField";
import { fieldOptions } from "../../../../../server/db/schema";

export default async function Page({
	params: _params,
}: {
	params: Promise<{
		id: string;
	}>;
}) {
	const params = await _params;

	const fields: Omit<
		FormFieldEntity & {
			fieldOptions?: Omit<FormOptionEntity, "fieldId">[];
		},
		"formId"
	>[] = [
		{
			id: Math.random().toString(36).substring(7),
			description: null,
			label: "Label",
			type: "text",
			required: true,
			order: 0,
		},
	];

	return (
		<Fragment>
			<header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex justify-between w-full items-center gap-2 p-4 ">
					<div className="">
						<h3>Form management</h3>
						<p>Create and manage your forms</p>
					</div>
				</div>
			</header>
			<main className="m-4 p-4 border rounded-lg flex flex-col gap-2 justify-center items-center">
				<FormField fields={fields} />
			</main>
		</Fragment>
	);
}
