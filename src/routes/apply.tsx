import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/apply")({
  validateSearch: (search: Record<string, unknown>) => ({
    role: typeof search.role === "string" ? search.role : "",
  }),
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/register",
      search: { role: search.role },
    });
  },
  component: () => null,
});
