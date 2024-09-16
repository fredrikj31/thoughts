import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./providers/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./routes/Home";
import { LandingPage } from "./routes/Landing";
import { SignupPage } from "./routes/Signup";
import { Toaster } from "@shadcn-ui/components/ui/toaster";
import { LoginPage } from "./routes/Login";
import { AuthProvider } from "./providers/auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { FriendsPage } from "./routes/Friends";
import { FriendRequestsPage } from "./routes/FriendRequests";

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider defaultTheme="light" storageKey="thoughts-theme">
            <AuthProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/friends"
                  element={
                    <ProtectedRoute>
                      <FriendsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/friends/requests"
                  element={
                    <ProtectedRoute>
                      <FriendRequestsPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/landing" element={<LandingPage />} />
              </Routes>
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};
