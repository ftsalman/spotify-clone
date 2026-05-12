import { useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";

// Hooks
import { usePreventScroll } from "../../hooks/usePreventScroll";
import { useFocusTrap } from "../../hooks/useFocusTrap";

// Utils
import { cn } from "../../utils/utils";
import { CSSTransition } from "react-transition-group";

// Components
import { Button } from "../button/Button";
import { IconCross } from "../../assets/icons/InterfaceIcons";
import { Portal } from "../portal/Portal";

// Styles
import "./drawer.css";

export const Drawer = ({
  ref = null,
  children = null,
  isOpen = true,
  onClose = () => {},
  escClose = true,
  backdropClose = true,
  hideScrollbar = false,
  backdropClassName = "",
  className = "",
  ...props
}) => {
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);

  useImperativeHandle(ref, () => drawerRef?.current);

  usePreventScroll(isOpen ? hideScrollbar : true);

  useFocusTrap(drawerRef, onClose, isOpen ? escClose : false);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef?.current && backdropClose) {
      onClose(e, "backdrop");
    }
  };

  return (
    <Portal containerId="portal">
      <CSSTransition
        classNames="tui-drawer-animation"
        in={isOpen}
        nodeRef={backdropRef}
        timeout={250}
        unmountOnExit
      >
        <div
          className={cn("tui-drawer-backdrop", backdropClassName)}
          ref={backdropRef}
          onClick={handleBackdropClick}
        >
          <div
            className={cn("tui-drawer", className)}
            ref={drawerRef}
            {...props}
          >
            {children}
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

Drawer.propTypes = {
  ref: PropTypes.object,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  escClose: PropTypes.bool,
  backdropClose: PropTypes.bool,
  backdropClassName: PropTypes.string,
  className: PropTypes.string,
  hideScrollbar: PropTypes.bool,
};

const Header = ({
  head = "",
  descp = "",
  onClose = undefined,
  children = null,
  className = "",
  ...props
}) => (
  <div className={cn("tui-drawer-header", className)} {...props}>
    {children ? (
      children
    ) : (
      <div className="tui-drawer-header--content">
        <h5>{head}</h5>
        <p>{descp}</p>
      </div>
    )}

    {onClose && (
      <Button
        variant="tertiary"
        onClick={(e) => onClose(e, "close-btn")}
        className="tui-drawer-header--close-btn"
      >
        <IconCross size={24} />
      </Button>
    )}
  </div>
);

Header.propTypes = {
  head: PropTypes.string,
  descp: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

Drawer.Header = Header;

Header.displayName = "Header";

const Body = ({ children = null, className, ...props }) => (
  <div className={cn("tui-drawer-body", className)} {...props}>
    {children}
  </div>
);

Body.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Body.displayName = "Body";

Drawer.Body = Body;

const Footer = ({ children = null, className = "", ...props }) => (
  <div className={cn("tui-drawer-footer", className)} {...props}>
    {children}
  </div>
);

Footer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Footer.displayName = "Footer";

Drawer.Footer = Footer;
