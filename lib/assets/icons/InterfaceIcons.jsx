import PropTypes from "prop-types";

const ICON_PROP_TYPES = {
  size: PropTypes.string,
  filled: PropTypes.bool,
  color: PropTypes.string,
};

export const IconCross = ({ size = "16" }) => {
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.875 7.125L7.125 16.875M7.125 7.125L16.875 16.875"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

IconCross.propTypes = ICON_PROP_TYPES;

export const IconCircle = ({ size = 16, color = "currentColor", filled }) => {
  if (filled) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 960 960"
        fill={color}
      >
        <path d="M480 880q-83 0-156-31.5T197 763q-54-54-85.5-127T80 480q0-83 31.5-156T197 197q54-54 127-85.5T480 80q83 0 156 31.5T763 197q54 54 85.5 127T880 480q0 83-31.5 156T763 763q-54 54-127 85.5T480 880Z" />
      </svg>
    );
  }

  return null;
};

IconCircle.propTypes = ICON_PROP_TYPES;

export const IconPlus = ({ size = "16" }) => {
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.0001 4.1665V15.8332M4.16675 9.99984H15.8334"
          stroke="currentColor"
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

IconPlus.propTypes = ICON_PROP_TYPES;
