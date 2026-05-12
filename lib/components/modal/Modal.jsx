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
import "./modal.css";

export const Modal = ({
  isOpen = false,
  ref = null,
  children = null,
  escClose = true,
  backdropClose = true,
  hideScrollbar = false,
  onClose = () => {},
  className = "",
  backdropClassName = "",
  ...props
}) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  useImperativeHandle(ref, () => modalRef?.current);

  usePreventScroll(isOpen ? hideScrollbar : true);

  useFocusTrap(modalRef, onClose, isOpen ? escClose : false);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef?.current && backdropClose) {
      onClose(e, "backdrop");
    }
  };

  return (
    <Portal containerId="portal">
      <CSSTransition
        classNames="tui-modal-animation"
        in={isOpen}
        nodeRef={backdropRef}
        timeout={250}
        unmountOnExit
      >
        <div
          ref={backdropRef}
          className={cn("tui-modal-backdrop", backdropClassName)}
          onClick={handleBackdropClick}
        >
          <div
            className={cn("tui-modal-container", className)}
            {...props}
            ref={modalRef}
            aria-modal={true}
            role="dialog"
            tabIndex={-1}
          >
            {children}
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

Modal.propTypes = {
  ref: PropTypes.object,
  children: PropTypes.node,
  escClose: PropTypes.bool,
  backdropClose: PropTypes.bool,
  hideScrollbar: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
  backdropClassName: PropTypes.string,
  isOpen: PropTypes.bool,
};

Modal.displayName = "Modal";

const Header = ({
  head = "",
  descp = "",
  onClose = undefined,
  children = null,
  className = "",
  ...props
}) => {
  return (
    <div className={cn("tui-modal-header", className)} {...props}>
      {children ? (
        children
      ) : (
        <div className="tui-modal-header--content">
          <h5>{head}</h5>
          <p>{descp}</p>
        </div>
      )}

      {onClose && (
        <Button
          variant="tertiary"
          onClick={(e) => onClose(e, "close-btn")}
          className="tui-modal-header--close-btn"
        >
          <IconCross size={24} />
        </Button>
      )}
    </div>
  );
};

Header.propTypes = {
  head: PropTypes.string,
  descp: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

Header.displayName = "Header";

Modal.Header = Header;

const Body = ({ children = null, className, ...props }) => (
  <div className={cn("tui-modal-body", className)} {...props}>
    {children}
  </div>
);

Body.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Body.displayName = "Body";

Modal.Body = Body;

const Footer = ({ children = null, className = "", ...props }) => (
  <div className={cn("tui-modal-footer", className)} {...props}>
    {children}
  </div>
);

Footer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Footer.displayName = "Footer";

Modal.Footer = Footer;
