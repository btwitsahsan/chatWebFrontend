export const shortenText = (text, n) => {
  if (text.lenght > n) {
    const shortenedText = text.substring(0, n).cancat("...");
    return shortenedText;
  }
  return text;
};

