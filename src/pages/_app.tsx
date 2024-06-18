// import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";

import { api } from "@/utils/api";
import "@/styles/globals.css";
import { ThemeColorWrapper } from "@/components/theme-color-wrapper";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "sonner";
import TailwindBreakpointIndicator from "@/components/breakpoint-indicator";
import { env } from "@/env";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeColorWrapper>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          themes={["light", "dark"]}
        >
          <Toaster position="top-right" expand={true} richColors />
          {/* <main className={GeistSans.className}> */}
          <main className="font-sans">
            <Component {...pageProps} />
            <Analytics mode={env.NEXT_PUBLIC_NODE_ENV} />
          </main>
          {/* <TailwindBreakpointIndicator /> */}
        </ThemeProvider>
      </ThemeColorWrapper>
    </QueryClientProvider>
  );
};

export default api.withTRPC(MyApp);
