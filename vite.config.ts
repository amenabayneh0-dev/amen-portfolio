// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Use src/server.ts (our SSR error wrapper) as the server entry.
    server: {
      entry: "server",
    },
  },
  nitro: {
    // Emit Vercel's Build Output API (.vercel/output): static assets + a serverless function.
    // To deploy on Cloudflare Pages instead, remove this option (defaults to Cloudflare).
    preset: "vercel",
  },
});
