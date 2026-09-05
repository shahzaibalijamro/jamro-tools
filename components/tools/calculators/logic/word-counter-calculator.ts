export function calculateWordStats(text: string) {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const sentences = trimmed.match(/[.!?]+(?:\s|$)/g)?.length ?? 0;
  return { words, characters: text.length, charactersNoSpaces: text.replace(/\s/g, "").length, lines: text ? text.split(/\r?\n/).length : 0, sentences, readTimeText: words === 0 ? "0 min" : `${Math.max(1, Math.round(words / 200))} min` };
}
