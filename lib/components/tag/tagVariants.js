import { cva } from "class-variance-authority";

export const tagVariants = cva("tui-tag", {
  variants: {
    variant: {
      gray: "tui-tag-gray",
      blue: "tui-tag-blue",
      green: "tui-tag-green",
      yellow: "tui-tag-yellow",
      red: "tui-tag-red",
    },
    size: {
      sm: "tui-tag-sm",
      md: "tui-tag-md",
      lg: "tui-tag-lg",
    },
  },
  defaultVariants: {
    variant: "gray",
    size: "md",
  },
});
