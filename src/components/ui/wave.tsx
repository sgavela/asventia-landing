import Image from "next/image";

export type WaveName = "cinta-paper" | "cinta-inverse" | "ondas-paper" | "eco-inverse";

/**
 * A static brand wave. The files are pre-rendered from the kit's Estela by
 * `npm run estela`, so they load as cached images: no SVG paths in the DOM and
 * no animation. Fills its positioned parent and crops like object-fit: cover.
 */
export function Wave({
  name,
  position = "50% 50%",
  className = "",
}: {
  name: WaveName;
  /** object-position, e.g. "100% 50%" to keep the right-hand end in view */
  position?: string;
  className?: string;
}) {
  return (
    <Image
      src={`/brand/estela/${name}.svg`}
      alt=""
      aria-hidden
      fill
      sizes="100vw"
      draggable={false}
      className={`pointer-events-none object-cover select-none ${className}`}
      style={{ objectPosition: position }}
    />
  );
}
