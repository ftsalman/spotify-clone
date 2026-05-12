import PropTypes from "prop-types";

// Styles

import "./segment-control.css";

// Utils

import { cn } from "../../utils/utils";

export const SegmentControl = ({
  items = [],
  onSelect = () => {},
  selectedItem = {},
  className = "",
  itemClassname = "",
  itemProps = {},
  ...props
}) => {
  if (!items?.length) throw new Error("Items is required");

  return (
    <div role="tablist" className={cn("tui-seg-ctrl", className)} {...props}>
      {items.map((item) => {
        const { id, label } = item;

        if (!label || !id) throw new Error("Tab label and id is required");

        const isActiveTab = selectedItem.id === id;

        return (
          <button
            key={id}
            className={cn(
              `tui-seg-ctrl-item ${isActiveTab && "tui-seg-ctrl-item-active"}`,
              itemClassname
            )}
            onClick={() => onSelect(item)}
            {...itemProps}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

SegmentControl.propTypes = {
  items: PropTypes.array,
  onSelect: PropTypes.func,
  selectedItem: PropTypes.object,
  className: PropTypes.string,
  itemClassname: PropTypes.string,
  itemProps: PropTypes.object,
};
