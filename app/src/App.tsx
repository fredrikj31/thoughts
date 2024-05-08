import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./providers/theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./routes/Home";
import { LandingPage } from "./routes/Landing";
import { SignupPage } from "./routes/Signup";
import { Toaster } from "@shadcn-ui/components/ui/toaster";

export const App = () => {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/landing",
      element: <LandingPage />,
    },
  ]);

  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="thoughts-theme">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};
