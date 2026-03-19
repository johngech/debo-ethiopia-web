import type { KnipConfig } from "knip";

export default {
	project: ["src/**/*.{ts,tsx,css}"],
	ignore: ["**/*.test.tsx", "dist/**"],
	ignoreDependencies: ["@biomejs/biome"],

	rules: {
		exports: "off",
		nsExports: "off",
		types: "off",
		nsTypes: "off",
	},

	// Custom compiler to find Tailwind v4 plugins
	compilers: {
		css: (text: string) => {
			const re = /@(?:import|plugin)\s+["']([^"']+)["']/g;
			return Array.from(text.matchAll(re))
				.map(([_, dep]) => `import "${dep}";`)
				.join("\n");
		},
	},
} satisfies KnipConfig;
