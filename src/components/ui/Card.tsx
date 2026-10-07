import type { ReactNode } from "react";
import SafeImage from "./SafeImage";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  children?: ReactNode;
};

export default function Card({
  src,
  alt,
  width,
  height,
  className = "",
  imgClassName = "",
  children,
}: Props) {
  return (
    <div className={`group relative overflow-hidden rounded-card bg-sand ${className}`}>
      <SafeImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`h-full w-full object-cover transition-transform duration-[900ms] ease-soft group-hover:scale-[1.06] ${imgClassName}`}
      />
      {children}
    </div>
  );
}
