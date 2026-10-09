export const unsplash = (id: string, w = 1400, q = 70): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

/** Builds a srcset from an Unsplash URL by swapping its w= value. */
export const srcSetFrom = (url: string, widths: number[]): string =>
  widths.map((w) => `${url.replace(/([?&])w=\d+/, `$1w=${w}`)} ${w}w`).join(", ");
