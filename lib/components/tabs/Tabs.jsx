import PropTypes from "prop-types";

// Styles

import "./tab.css";

// Utils

import { cn } from "../../utils/utils";

export const Tabs = ({
  tabs = [],
  activeTab = null,
  setActiveTab = () => {},
  tabClassName = "",
  tabProps = {},
  ...props
}) => {
  if (!tabs.length) throw new Error("Tabs is required");

  return (
    <div
      {...props}
      className={cn("tui-tab tui-no-scrollbar", props?.className)}
    >
      {tabs.map((tab, index) => {
        const { id, label } = tab;

        if (!label || !id) throw new Error("Tab label and id is required");

        const isActiveTab = activeTab.id === id;

        return (
          <button
            role="tab"
            type="button"
            key={index}
            className={cn(
              `tui-tab-item ${isActiveTab && "tui-tab-item-active"}`,
              tabClassName
            )}
            onClick={() => setActiveTab(tab)}
            {...tabProps}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.array,
  activeTab: PropTypes.object,
  setActiveTab: PropTypes.func,
  className: PropTypes.string,
  tabProps: PropTypes.object,
};
