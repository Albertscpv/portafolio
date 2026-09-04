import type { ElementType, ReactNode } from "react";

interface NeuSurfaceProps {
  children: ReactNode;
  className?: string;
  /** `raised` extrudes the sheet, `pressed` pushes it in. */
  variant?: "raised" | "pressed";
  size?: "sm" | "md";
  as?: ElementType;
}

/**
 * Soft-UI material. The background color is fixed at the `surface` token and must match
 * whatever sits behind it — neumorphism is one sheet of material, and a
 * mismatched parent breaks the illusion instantly.
 */
export default function NeuSurface({
  children,
  className = "",
  variant = "raised",
  size = "md",
  as: Tag = "div",
}: NeuSurfaceProps) {
  const shadow =
    variant === "raised"
      ? size === "sm"
        ? "shadow-neu-raised-sm"
        : "shadow-neu-raised"
      : size === "sm"
        ? "shadow-neu-inset-sm"
        : "shadow-neu-inset";

  return (
    <Tag className={`rounded-2xl bg-surface ${shadow} ${className}`}>{children}</Tag>
  );
}
