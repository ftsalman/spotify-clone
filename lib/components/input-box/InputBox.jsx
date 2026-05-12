import PropTypes from "prop-types";

// Styles

import "./inputbox.css";

// Utils

import { inputboxVariants } from "./inputBoxVariants";

export const InputBox = ({
  className = "",
  size = "md",
  variant = "primary",
  ...props
}) => (
  <input
    type="text"
    className={inputboxVariants({ size, variant, className })}
    {...props}
  />
);

InputBox.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
};
