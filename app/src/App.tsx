import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./providers/theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./routes/Home";
import { LandingPage } from "./routes/Landing";
import { SignupPage } from "./routes/Signup";
import { Toaster } from "@shadcn-ui/components/ui/toaster";
import { LoginPage } from "./routes/Login";
import { UserProvider } from "./providers/user";

export const App = () => {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="thoughts-theme">
          <UserProvider>
            <RouterProvider router={router} />
            <Toaster />
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};
