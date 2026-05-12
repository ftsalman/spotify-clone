import PropTypes from "prop-types";

// Styles

import "./data-list.css";

// Utils

import { cn } from "../../utils/utils";

export const DataList = ({
  data = [],
  render = () => {},
  className = "",
  ...props
}) => {
  // if (!data?.length) throw new Error("Data is required");

  if (!render) throw new Error("Render is required");

  return (
    <div className={cn("tui-list", className)} {...props}>
      {data?.map((item, index) => render?.(item, index))}
    </div>
  );
};

DataList.propTypes = {
  data: PropTypes.array,
  render: PropTypes.func,
  className: PropTypes.string,
};
