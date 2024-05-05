import { ThemeProvider } from "./providers/theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./routes/Home";
import { LandingPage } from "./routes/Landing";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
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
