import bangs from "./bangs.json";

Bun.write(
  "src/bangs.ts",
  "export const bangs = " +
    JSON.stringify(
      bangs.reduce(
        (a, c) => {
          a[c.t] = c;
          return a;
        },
        {} as Record<string, unknown>,
      ),
    ) +
    " as Record<string, Record<string, string | number>>",
);
