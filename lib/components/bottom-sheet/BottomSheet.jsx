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
import "./bottom-sheet.css";

export const BottomSheet = ({
  ref = null,
  children,
  isOpen = true,
  onClose = () => {},
  escClose = true,
  backdropClose = true,
  backdropClassName = "",
  className = "",
  hideScrollbar = false,
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
    <Portal>
      <CSSTransition
        classNames="tui-bs-animation"
        in={isOpen}
        nodeRef={backdropRef}
        timeout={250}
        unmountOnExit
      >
        <div
          className={cn("tui-bs-backdrop", backdropClassName)}
          ref={backdropRef}
          onClick={handleBackdropClick}
        >
          <div className={cn("tui-bs", className)} ref={drawerRef} {...props}>
            {children}
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

BottomSheet.propTypes = {
  ref: PropTypes.object,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  escClose: PropTypes.bool,
  backdropClose: PropTypes.bool,
  backdropClassName: PropTypes.string,
  className: PropTypes.string,
};

const Header = ({
  head = "",
  onClose = undefined,
  children = null,
  className = "",
  descp = "",
  ...props
}) => (
  <div className={cn("tui-bs-header", className)} {...props}>
    {children ? (
      children
    ) : (
      <div className="tui-bs-header--content">
        <h5>{head}</h5>
        <p>{descp}</p>
      </div>
    )}

    {onClose && (
      <Button
        variant="tertiary"
        onClick={(e) => onClose(e, "close-btn")}
        className="tui-bs-header--close-btn"
      >
        <IconCross size="24" />
      </Button>
    )}
  </div>
);

Header.propTypes = {
  head: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  descp: PropTypes.string,
};

BottomSheet.Header = Header;

Header.displayName = "Header";

const Body = ({ children = null, className, ...props }) => (
  <div className={cn("tui-bs-body", className)} {...props}>
    {children}
  </div>
);

Body.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Body.displayName = "Body";

BottomSheet.Body = Body;

const Footer = ({ children = null, className = "", ...props }) => (
  <div className={cn("tui-bs-footer", className)} {...props}>
    {children}
  </div>
);

Footer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Footer.displayName = "Footer";

BottomSheet.Footer = Footer;
