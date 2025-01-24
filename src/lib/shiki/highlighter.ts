import { BundledLanguage, Highlighter, createHighlighter } from 'shiki';
import { tofupilotShikiTheme } from './tofupilotShikiTheme';

export const languageMap: { [key: string]: BundledLanguage } = {
  py: 'python',
  sh: 'bash',
  js: 'javascript',
};

export const availableLanguages = Array.from(
  new Set(Object.values(languageMap))
);

let highlighterInstance: Highlighter | null = null;

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: [tofupilotShikiTheme],
      langs: availableLanguages,
    });
  }
  return highlighterInstance;
}
