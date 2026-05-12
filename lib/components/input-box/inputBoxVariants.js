import { cva } from "class-variance-authority";

export const inputboxVariants = cva("tui-input", {
  variants: {
    variant: {
      primary: "tui-input-primary",
      danger: "tui-input-danger",
    },
    size: {
      sm: "tui-input-sm",
      md: "tui-input-md",
      lg: "tui-input-lg",
      xl: "tui-input-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
