import { cva } from "class-variance-authority";

export const buttonVariants = cva("tui-btn", {
  variants: {
    variant: {
      default: "tui-btn-primary",
      primary: "tui-btn-primary",
      secondary: "tui-btn-secondary",
      tertiary: "tui-btn-tertiary",
      success: "tui-btn-success",
      danger: "tui-btn-danger",
      "accent-gradient": "tui-btn-accent-gradient",
    },
    size: {
      default: "tui-btn-md",
      xs: "tui-btn-xs",
      sm: "tui-btn-sm",
      md: "tui-btn-md",
      lg: "tui-btn-lg",
      xl: "tui-btn-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
