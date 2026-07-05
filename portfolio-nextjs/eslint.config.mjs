import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // The animation layer is intentionally imperative (IntersectionObserver reveal,
  // magnetic/tilt DOM mutation, typewriter, canvas). React Compiler is not enabled
  // for this build, so these React-Compiler lint rules flag valid, working React.
  {
    files: ["hooks/**/*.{ts,tsx}", "app/_components/**/*.{ts,tsx}", "app/(home)/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
