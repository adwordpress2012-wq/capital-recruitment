import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_PUBLIC_ORIGIN } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary mt-6">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-outline">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Capital Recruitment Agency — Labour Hire Liverpool NSW & Sydney" },
      {
        name: "description",
        content:
          "Labour hire and recruitment agency based in Liverpool NSW. Workforce solutions Australia: warehousing recruitment, construction labour hire, security labour hire, industrial staffing and employer workforce solutions.",
      },
      {
        name: "keywords",
        content:
          "labour hire Sydney, labour hire Liverpool NSW, recruitment agency Liverpool NSW, workforce solutions Australia, warehousing recruitment, construction labour hire, security labour hire, industrial staffing, candidate applications, employer workforce solutions",
      },
      {
        property: "og:title",
        content: "Capital Recruitment Agency — Connecting People. Powering Success.",
      },
      { property: "og:description", content: "Premium workforce solutions across Australia." },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: `${SITE_PUBLIC_ORIGIN}/logo/capital-recruitment-full.png`,
      },
      { property: "og:image:width", content: "581" },
      { property: "og:image:height", content: "538" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: `${SITE_PUBLIC_ORIGIN}/logo/capital-recruitment-full.png`,
      },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", href: "/favicon-32x32.png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
      </QueryClientProvider>
    </RootDocument>
  );
}
