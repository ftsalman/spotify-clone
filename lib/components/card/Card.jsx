import PropTypes from "prop-types";
import { cn } from "../../utils/utils";

// Styles
import "./card.css";

export const Card = ({
  className = "",
  onClick = () => {},
  children,
  ...rest
}) => (
  <div
    onClick={onClick}
    className={cn("tui-card tui-card-hover", className)}
    {...rest}
  >
    {children}
  </div>
);
Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
