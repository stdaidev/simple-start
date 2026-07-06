import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Testando LDK" },
      { name: "description", content: "Testando LDK" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-5xl font-bold text-foreground">Testando LDK</h1>
    </main>
  );
}
