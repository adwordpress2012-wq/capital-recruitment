import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/Section";
import { clearAdminToken, writeAdminToken } from "@/lib/admin-token";
import { adminLoginFn } from "@/capital/capital-fns";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin login — Capital Recruitment" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      clearAdminToken();
      const res = await adminLoginFn({ data: { password } });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      writeAdminToken(res.token);
      await navigate({ to: "/admin/jobs" });
    } catch {
      setError("Could not sign in. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <section className="container-x pt-12 pb-4">
        <div className="eyebrow mb-3">● Admin</div>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">Sign in</h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Internal tools for job listings and candidate applications. Access is protected by a
          server-side password.
        </p>
      </section>

      <Section className="!py-8">
        <form onSubmit={onSubmit} className="card-soft mx-auto max-w-md grid gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn-primary justify-center" disabled={pending}>
            Sign in <ArrowRight className="size-4" />
          </button>
          <p className="text-center text-xs text-muted-foreground">
            <Link to="/" className="underline-offset-2 hover:underline">
              Back to website
            </Link>
          </p>
        </form>
      </Section>
    </>
  );
}
