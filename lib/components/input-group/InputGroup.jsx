import PropTypes from "prop-types";

// Utils
import { cn } from "../../utils/utils";

// Components
import { InputBox } from "../input-box/InputBox";

// Styles
import "./input-group.css";

export const InputGroup = ({
  id = "",
  name = "",
  placeholder = "",
  label = "",
  errorMsg = "",
  wrapperProps = {
    className: "",
  },
  labelProps = {
    className: "",
  },
  children = null,
  ...inputProps
}) => (
  <div
    {...wrapperProps}
    className={cn("tui-input-group", wrapperProps?.className)}
  >
    <label
      htmlFor={id}
      {...labelProps}
      className={cn("tui-input-group-label", labelProps?.className)}
    >
      {label}
    </label>

    {children ? (
      children
    ) : (
      <InputBox
        variant={errorMsg ? "danger" : "primary"}
        placeholder={placeholder}
        id={id}
        name={name}
        {...inputProps}
      />
    )}

    {errorMsg && (
      <small className={cn("tui-input-group-error")}>{errorMsg}</small>
    )}
  </div>
);

InputGroup.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  errorMsg: PropTypes.string,
  wrapperProps: PropTypes.object,
  labelProps: PropTypes.object,
  children: PropTypes.node,
};
