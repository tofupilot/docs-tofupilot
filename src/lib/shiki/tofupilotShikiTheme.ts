import { ThemeInput } from "shiki";

export const tofupilotShikiTheme: ThemeInput = {
  name: "tofupilot-theme",
  type: "dark",
  colors: {
    "editor.background": "transparent", // Tailwind bg-zinc-900
    "editor.foreground": "#f4f4f5", // Tailwind text-zinc-100
  },
  tokenColors: [
    {
      scope: ["comment"],
      settings: {
        foreground: "#71717a", // Tailwind text-zinc-500 (for comments)
      },
    },
    {
      scope: ["string"],
      settings: {
        foreground: "#38bdf8", // Tailwind text-sky-400 (for functions)
      },
    },
    {
      scope: ["variable"],
      settings: {
        foreground: "#60a5fa", // Tailwind text-blue-400 (for variables)
      },
    },
    {
      scope: ["keyword"],
      settings: {
        foreground: "#ec4899", // Tailwind text-pink-500 (for keywords)
      },
    },
    {
      scope: ["entity.name.function", "entity.name.function.python"],
      settings: {
        foreground: "#a3e635", // Tailwind text-lime-500 (for strings)
      },
    },
    {
      scope: ["type"],
      settings: {
        foreground: "#f97316", // Tailwind text-orange-400 (for types)
      },
    },
    {
      scope: ["constant"],
      settings: {
        foreground: "#f43f5e", // Tailwind text-rose-500 (for constants)
      },
    },
    {
      scope: ["punctuation"],
      settings: {
        foreground: "#94a3b8", // Tailwind text-slate-400 (for punctuation)
      },
    },
    {
      scope: ["number", "constant.numeric"],
      settings: {
        foreground: "#fb923c", // Tailwind text-orange-400 (for numbers)
      },
    },
    {
      scope: ["storage", "keyword.operator"],
      settings: {
        foreground: "#c084fc", // Tailwind text-purple-400 (for storage)
      },
    },
  ],
};
