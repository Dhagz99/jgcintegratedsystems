export function formatRefId(id: number, prefix = "REF", zeros = 6): string {
    // pad the id with zeros, but never cut off if id is larger
    const padded = id.toString().padStart(zeros, "0");
    return `${prefix}${padded}`;
  }