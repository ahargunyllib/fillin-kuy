import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const formRouter = createTRPCRouter({
	getForms: protectedProcedure
		.input(
			z.object({
				search: z.string().optional(),
				status: z.enum(["all", "active", "closed"]).optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;
			const forms = await ctx.db.query.forms.findMany({
				where: (forms, { eq, and, or, isNull, isNotNull }) =>
					and(
						eq(forms.ownerId, userId),
						or(
							eq(forms.title, input.search || ""),
							input.status === "active"
								? isNull(forms.closedAt)
								: input.status === "closed"
									? isNotNull(forms.closedAt)
									: isNotNull(forms.id),
						),
					),
			});
			return forms;
		}),
});
