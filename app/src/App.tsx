import { Button } from "@shadcn-ui/components/ui/button";
import { ThemeProvider } from "./providers/theme";

export const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="thoughts-theme">
        <h1 className="text-3xl font-bold underline">Hello World</h1>
        <Button>Hello</Button>
      </ThemeProvider>
    </>
  );
};
