// import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { ThemeProvider } from "next-themes";

import { api } from "@/utils/api";
import "@/styles/globals.css";
import { ThemeColorWrapper } from "@/components/theme-color-wrapper";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
          {/* <main className={GeistSans.className}> */}
          <main className="font-sans">
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </ThemeColorWrapper>
    </QueryClientProvider>
  );
};

export default api.withTRPC(MyApp);
