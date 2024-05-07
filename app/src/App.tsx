import { ThemeProvider } from "./providers/theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./routes/Home";
import { LandingPage } from "./routes/Landing";
import { SignupPage } from "./routes/Signup";

export const App = () => {
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
      <ThemeProvider defaultTheme="light" storageKey="thoughts-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
};
