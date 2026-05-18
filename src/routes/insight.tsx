import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/insight")({
  beforeLoad: () => {
    throw redirect({ to: "/insights" });
  },
});
