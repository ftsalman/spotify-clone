import PropTypes from 'prop-types'

// Utils

import { tagVariants } from "./tagVariants";

// Styles

import "./tag.css";

export const Tag = ({
  variant = "gray",
  size = "md",
  className = "",
  children = null,
  ...props
}) => (
  <div {...props} className={tagVariants({ size, variant, className })}>
    {children}
  </div>
);

Tag.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};