import { Link } from "react-router-dom";
import { mergeClassName } from "../ui";

interface LogoProps {
  src: string;
  alt?: string;
  className?: string;
  showText?: boolean;
}

export const Logo = ({
  src,
  alt = "Company Logo",
  className,
  showText = false,
}: LogoProps) => {
  return (
    <Link
      to="/"
      className={mergeClassName(
        "flex items-center gap-2 group transition-transform duration-300",
        className,
      )}
    >
      <div className="max-h-15 max-w-30 overflow-hidden bg-base-200 p-1 flex items-center justify-center ">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain transition-transform duration-500"
          loading="eager"
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <span className="hidden sm:inline-block text-xl font-bold tracking-tight text-base-content group-hover:text-primary transition-colors">
          Debo<span className="text-primary">Ethiopia</span>
        </span>
      )}
    </Link>
  );
};
