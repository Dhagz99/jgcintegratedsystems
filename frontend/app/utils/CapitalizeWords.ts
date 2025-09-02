
export function capitalizeWords(str: string): string {
    if (!str) return "";
    return str
      .split(" ")
      .map(word =>
        word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase()
      )
      .join(" ");
  }
  