import { useImperativeHandle } from "react";
import PropTypes from "prop-types";

// Styles

import "./menu.css";

// Utils

import { useClickOutside } from "../../hooks/useClickOutside";
import { cn } from "../../utils/utils";

export const Menu = ({ children, className, onClose, ref, ...props }) => {
  const internalRef = useClickOutside(onClose);

  useImperativeHandle(ref, () => internalRef.current);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={internalRef}
      className={cn("tui-menu", className)}
      {...props}
    >
      {children}
    </div>
  );
};

Menu.displayName = "Menu";

Menu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  ref: PropTypes.any,
};

const MenuItem = ({
  children = null,
  className = "",
  onClick = undefined,
  ...props
}) => (
  <button
    onClick={onClick}
    className={cn("tui-menu-item", className)}
    {...props}
  >
    {children}
  </button>
);

MenuItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

MenuItem.displayName = "MenuItem";

Menu.Item = MenuItem;
