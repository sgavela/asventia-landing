// Navy wash over footage and photos. Keeps the copy legible and grades the image into the
// brand; the hero and the final call to action share it so both read the same blue.

export const navy = (alpha: number) => `color-mix(in srgb, var(--color-inverse) ${alpha}%, transparent)`;

export const navyGrade = [
  `linear-gradient(to top, ${navy(100)}, ${navy(70)} 14%, ${navy(0)} 45%)`,
  `linear-gradient(100deg, ${navy(94)} 0%, ${navy(82)} 42%, ${navy(45)} 75%, ${navy(30)} 100%)`,
].join(",");
