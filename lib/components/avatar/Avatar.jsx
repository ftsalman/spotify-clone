import PropTypes from "prop-types";

// Styles

import { cn } from "../../utils/utils";

// Utils

import "./avatar.css";

export const Avatar = ({
  className = "",
  isLoading = true,
  children = null,
  imgSrc = "",
  imgProps = {},
  ...props
}) => {
  const defaultProps = {
    "aria-label": "avatar",
    "aria-labelledby": "avatar",
    ...props,
  };

  if (isLoading) {
    return (
      <div
        className={cn("tui-avatar tui-avatar-loading", className)}
        {...defaultProps}
      ></div>
    );
  }

  if (children) {
    return (
      <div className={cn("tui-avatar", className)} {...defaultProps}>
        {children}
      </div>
    );
  }

  if (imgSrc) {
    return (
      <div
        className={cn("tui-avatar overflow-clip", className)}
        {...defaultProps}
      >
        <img
          src={imgSrc}
          loading="lazy"
          alt="avatar-not-found"
          {...imgProps}
          className={cn("tui-avatar-img", imgProps?.className)}
        />
      </div>
    );
  }

  return null;
};

Avatar.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  imgSrc: PropTypes.string,
  imgProps: PropTypes.object,
};
