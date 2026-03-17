import type { ElementType, ReactNode } from "react";

type TypographyVariantI = "h1" | "h2" | "h3" | "h5" | "body-l" | "body-m" | "body-s";

export type TypographyPropsI = {
      variant: TypographyVariantI;
      children: ReactNode;
      as?: ElementType;
      className?: string;
}