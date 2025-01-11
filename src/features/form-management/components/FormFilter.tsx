"use client";

import { Input } from "@/shared/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import { Filter, Search } from "lucide-react";
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import { useEffect, useState } from "react";

export function FormFilter() {
	const [{ search, status }, setQuery] = useQueryStates(
		{
			search: parseAsString.withDefault(""),
			status: parseAsStringLiteral(["all", "closed", "active"]).withDefault(
				"all",
			),
		},
		{
			history: "push",
			shallow: false,
		},
	);

	const [debouncedSearch, setDebouncedSearch] = useState(search);

	useEffect(() => {
		const handler = setTimeout(() => {
			if (debouncedSearch !== search) {
				setQuery({ search: debouncedSearch });
			}
		}, 300); // Debounce delay

		return () => {
			clearTimeout(handler);
		};
	}, [debouncedSearch, search, setQuery]);

	return (
		<div className="flex items-center gap-4">
			<div className="relative flex-1">
				<Input
					placeholder="Search forms..."
					className="pl-10"
					value={debouncedSearch}
					onChange={(e) => setDebouncedSearch(e.target.value)}
				/>
			</div>
			<Select
				defaultValue="all"
				value={status}
				onValueChange={(value: "all" | "active" | "closed") =>
					setQuery({ status: value })
				}
			>
				<SelectTrigger className="w-[180px]">
					<Filter className="w-4 h-4 mr-2" />
					<SelectValue placeholder="Filter by status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Forms</SelectItem>
					<SelectItem value="active">Active</SelectItem>
					<SelectItem value="closed">Closed</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
