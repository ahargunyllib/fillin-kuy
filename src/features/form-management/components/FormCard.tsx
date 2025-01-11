import { format } from "date-fns";
import { Calendar, Clock, User } from "lucide-react";

export default function FormCard(form: FormEntity) {
	return (
		<div
			key={form.id}
			className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors"
		>
			<div className="space-y-1">
				<h4 className="font-medium">{form.title}</h4>
				<p className="text-sm text-muted-foreground">{form.description}</p>
			</div>
			<div className="flex items-center gap-4 text-sm text-muted-foreground">
				<div className="flex items-center gap-1">
					<User className="w-3 h-3" />
					{/* {form.creator.name} */}
				</div>
				<div className="flex items-center gap-1">
					<Calendar className="w-3 h-3" />
					{format(form.createdAt, "HH:mm, EE dd MMM yyyy")}
				</div>
				{form.closedAt && (
					<div className="flex items-center gap-1">
						<Clock className="w-3 h-3" />
						Closed: {format(form.closedAt, "HH:mm, EE dd MMM yyyy")}
					</div>
				)}
			</div>
		</div>
	);
}
