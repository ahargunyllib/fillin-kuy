"use client";

import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/shared/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import { Switch } from "@/shared/components/ui/switch";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/lib/utils";
import { format } from "date-fns";
import {
	CalendarIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	CopyIcon,
	Trash2Icon,
	XIcon,
} from "lucide-react";
import { useState } from "react";

export default function FormField({
	fields: _fields,
}: {
	fields: Omit<
		FormFieldEntity & {
			fieldOptions?: Omit<FormOptionEntity, "fieldId">[];
		},
		"formId"
	>[];
}) {
	const [fields, setFields] =
		useState<
			Omit<
				FormFieldEntity & {
					fieldOptions?: Omit<FormOptionEntity, "fieldId">[];
				},
				"formId"
			>[]
		>(_fields);
	const [activeFieldId, setActiveFieldId] = useState<string | null>(null);

	return (
		<section className="w-full flex flex-col items-center gap-4">
			<div className="w-[604px] p-4 border rounded-lg flex flex-col gap-4">
				<h1>Title</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
					malesuada, libero vel ultricies posuere.
				</p>
			</div>
			<div className="flex flex-col gap-4">
				{fields.map((field) => (
					<div
						key={field.id}
						className="relative flex flex-row justify-center items-center"
					>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
							className={cn(
								"w-[604px] p-4 border rounded-lg flex flex-row items-start gap-2 cursor-pointer",
								activeFieldId === field.id && "border-ring",
							)}
							onClick={(e) => {
								e.stopPropagation();
								setActiveFieldId((prevId) =>
									prevId === field.id ? null : field.id,
								);
							}}
						>
							<div className="w-1/2 flex flex-col gap-2">
								<Input
									type="text"
									value={field.label}
									autoFocus
									onChange={(e) =>
										setFields((prevFields) =>
											prevFields.map((f) =>
												f.id === field.id
													? {
															...f,
															label:
																e.target.value === ""
																	? "Label"
																	: e.target.value,
														}
													: f,
											),
										)
									}
									className={cn(
										"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
										"p-0 mb-0 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
									)}
								/>
								<Input
									type="text"
									value={field.description || "Add description"}
									autoFocus
									onChange={(e) =>
										setFields((prevFields) =>
											prevFields.map((f) =>
												f.id === field.id
													? {
															...f,
															description:
																e.target.value === "" ? null : e.target.value,
														}
													: f,
											),
										)
									}
									className={cn(
										!field.description ? "opacity-50" : "",
										"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
										"p-0 mb-0 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
									)}
								/>
								{["select", "checkbox", "radio"].includes(field.type) ? (
									activeFieldId !== field.id ? (
										field.type === "select" ? (
											<Select>
												<SelectTrigger>
													<SelectValue placeholder={`Select ${field.label}`} />
												</SelectTrigger>
												<SelectContent>
													{field.fieldOptions?.map((option) => (
														<SelectItem
															key={option.id}
															value={option.value}
															disabled
														>
															{option.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										) : field.type === "checkbox" ? (
											<div className="flex flex-col gap-2">
												{field.fieldOptions?.map((option) => (
													<div
														key={option.id}
														className="flex items-center gap-2 "
													>
														<Checkbox value={option.value} disabled />
														<Label htmlFor={option.value}>{option.label}</Label>
													</div>
												))}
											</div>
										) : field.type === "radio" ? (
											<RadioGroup
												defaultValue={field.fieldOptions?.[0].value}
												className="flex flex-col gap-2"
											>
												{field.fieldOptions?.map((option) => (
													<div
														key={option.id}
														className="flex items-center gap-2 "
													>
														<RadioGroupItem value={option.value} disabled />
														<Label htmlFor={option.value}>{option.label}</Label>
													</div>
												))}
											</RadioGroup>
										) : null
									) : (
										<div className="flex flex-col gap-2">
											{field.fieldOptions?.map((option) => (
												<div
													key={option.id}
													className="flex items-center gap-2 "
												>
													<Input
														type="text"
														value={option.label}
														autoFocus
														onChange={(e) =>
															setFields((prevFields) =>
																prevFields.map((f) =>
																	f.id === field.id
																		? {
																				...f,
																				fieldOptions: f.fieldOptions?.map(
																					(o) =>
																						o.id === option.id
																							? {
																									...o,
																									label:
																										e.target.value === ""
																											? "Option 1"
																											: e.target.value,
																									value: e.target.value
																										.toLowerCase()
																										.replace(/\s/g, "-"),
																								}
																							: o,
																				),
																			}
																		: f,
																),
															)
														}
														className={cn(
															"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
															"p-0 mb-0 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
														)}
													/>
													<Button
														variant="destructive"
														size="icon"
														onClick={(e) => {
															e.stopPropagation();
															setFields((prevFields) =>
																prevFields.map((f) =>
																	f.id === field.id
																		? {
																				...f,
																				fieldOptions:
																					f.fieldOptions?.length || 0 > 1
																						? f.fieldOptions?.filter(
																								(o) => o.id !== option.id,
																							)
																						: [
																								{
																									id: Math.random()
																										.toString(36)
																										.substring(7),
																									label: "Option 1",
																									value: "option-1",
																								},
																							],
																			}
																		: f,
																),
															);
														}}
													>
														<XIcon />
													</Button>
												</div>
											))}
											<Label
												onClick={(e) => {
													e.stopPropagation();
													setFields((prevFields) =>
														prevFields.map((f) =>
															f.id === field.id
																? {
																		...f,
																		fieldOptions: [
																			...(f.fieldOptions || []),
																			{
																				id: Math.random()
																					.toString(36)
																					.substring(7),
																				label: "Add Option",
																				value: "Add Option"
																					.toLowerCase()
																					.replace(/\s/g, "-"),
																			},
																		],
																	}
																: f,
														),
													);
												}}
												className={cn(
													"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 opacity-50",
													"p-0 mb-0 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none cursor-pointer",
												)}
											>
												Add Option{" "}
											</Label>
										</div>
									)
								) : field.type === "number" ? (
									<Input
										type="text"
										inputMode="numeric"
										value={field.type}
										disabled
									/>
								) : field.type === "file" ? null : field.type === "url" ? (
									<Input
										type="text"
										inputMode="url"
										value={field.type}
										disabled
									/>
								) : field.type === "email" ? (
									<Input
										type="text"
										inputMode="email"
										value={field.type}
										disabled
									/>
								) : field.type === "textarea" ? (
									<Textarea value={field.type} disabled />
								) : field.type === "datetime" ? (
									<Input type="datetime-local" value={field.type} disabled />
								) : field.type === "date" ? (
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={"outline"}
												className={cn(
													"w-[240px] justify-start text-left font-normal",
													// !date && "text-muted-foreground",
												)}
											>
												<CalendarIcon />
												{/* biome-ignore lint/correctness/noConstantCondition: <explanation> */}
												{true ? (
													format(new Date(), "PPP")
												) : (
													<span>Pick a date</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={new Date()}
												onSelect={() => {}}
											/>
										</PopoverContent>
									</Popover>
								) : field.type === "time" ? (
									<Input type="time" value={field.type} disabled />
								) : (
									<Input type={field.type} value={field.type} disabled />
								)}
							</div>
							<div className="w-1/2 flex flex-col gap-2 h-full ">
								<Select
									value={field.type}
									onValueChange={(value: FieldType) => {
										setFields((prevFields) =>
											prevFields.map((f) =>
												f.id === field.id
													? {
															...f,
															type: value,
															fieldOptions: [
																"select",
																"checkbox",
																"radio",
															].includes(value)
																? f.fieldOptions || [
																		{
																			id: Math.random()
																				.toString(36)
																				.substring(7),
																			label: "Option 1",
																			value: "option-1",
																		},
																	]
																: undefined,
														}
													: f,
											),
										);
									}}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select type" />
									</SelectTrigger>
									<SelectContent>
										{fieldType.map((type) => (
											<SelectItem key={type.name} value={type.name}>
												{type.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<div className="flex flex-row items-center justify-end gap-2 h-full">
									<div className="flex items-center justify-end space-x-2">
										<Label htmlFor="required">Required</Label>
										<Switch id="required" />
									</div>
									<Button variant="outline" size="icon">
										<CopyIcon />
									</Button>
									<Button variant="destructive" size="icon">
										<Trash2Icon />
									</Button>
								</div>
							</div>
						</div>
						{activeFieldId === field.id && (
							<div className="absolute left-[612] flex flex-col gap-2 justify-center">
								<Button
									variant="ghost"
									size="icon"
									onClick={() => {
										setFields((prevFields) => {
											const index = prevFields.findIndex(
												(f) => f.id === field.id,
											);
											if (index === 0) return prevFields;
											const newFields = [...prevFields];
											newFields[index] = prevFields[index - 1];
											newFields[index - 1] = prevFields[index];
											return newFields;
										});
									}}
								>
									<ChevronUpIcon />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => {
										setFields((prevFields) => {
											const index = prevFields.findIndex(
												(f) => f.id === field.id,
											);
											if (index === prevFields.length - 1) return prevFields;
											const newFields = [...prevFields];
											newFields[index] = prevFields[index + 1];
											newFields[index + 1] = prevFields[index];
											return newFields;
										});
									}}
								>
									<ChevronDownIcon />
								</Button>
							</div>
						)}
					</div>
				))}
			</div>
			<div className="w-[604px] p-4 border rounded-lg flex flex-row gap-4">
				<Button
					className="w-full"
					variant="secondary"
					onClick={(e) => {
						e.stopPropagation();
						setFields([
							...fields,
							{
								id: Math.random().toString(36).substring(7),
								label: "Label",
								description: null,
								type: "text",
								required: true,
								order: fields.length,
							},
						]);
					}}
				>
					Add Field
				</Button>
				<Button>Save</Button>
			</div>
		</section>
	);
}

const fieldType = [
	{
		name: "text",
		label: "Text",
	},
	{
		name: "textarea",
		label: "Textarea",
	},
	{
		name: "select",
		label: "Select",
	},
	{
		name: "checkbox",
		label: "Checkbox",
	},
	{
		name: "radio",
		label: "Radio (max 5)",
	},
	{
		name: "date",
		label: "Date",
	},
	{
		name: "time",
		label: "Time",
	},
	{
		name: "datetime",
		label: "Datetime",
	},
	// {
	// 	name: "file",
	// 	label: "File",
	// },
	{
		name: "number",
		label: "Number",
	},
	{
		name: "email",
		label: "Email",
	},
	{
		name: "url",
		label: "URL",
	},
] as const;

export type FieldType = (typeof fieldType)[number]["name"];
