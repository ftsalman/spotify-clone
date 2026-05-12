import { useEffect } from "react";

/**
 * 📦 Focus Trap Hook (v1.1)
 * --------------------------------------------------
 * A reusable hook to manage focus trapping within an element.
 * Can be used for Modal, Drawer, Menu, Select, Popover, etc.
 *
 * 🆕 Features
 * --------------------------------------------------
 * ✅ Restores the previously focused element when closed 🆕
 * ✅ Closes on `Esc` key press
 * ✅ Handles keyboard `Tab` navigation correctly
 *
 * 📚 Implementation Change
 * --------------------------------------------------
 * • Previously: Stored only the element ref
 * • Now: Stores an object containing:
 *   - element ref
 *   - last focused element
 *
 * This allows restoring focus safely when the popup is closed.
 *
 * 🪧 Notice
 * --------------------------------------------------
 * If you encounter any unexpected behavior or bugs,
 * please revert to the previous version (available below).
 */

let REF_STACK = [];

export const useFocusTrap = (
  ref = null,
  callBack = () => {},
  isEnabled = true
) => {
  const handleKeyDown = (e) => {
    const { key } = e;

    if (key === "Escape" && REF_STACK.length > 0 && isEnabled) {
      e.stopPropagation();

      if (REF_STACK[REF_STACK.length - 1].element === ref.current) {
        const status = callBack?.(e, "escape-key");

        if (status === true) return;

        const item = REF_STACK.pop();
        item.lastFocusedElement.focus();
      }
    }

    // Focus trap
    if (
      e.key === "Tab" &&
      REF_STACK[REF_STACK.length - 1].element === ref.current
    ) {
      const focusableElements = ref.current.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  useEffect(() => {
    if (!ref?.current) return;

    const curr = ref.current;

    const refStackItem = {
      element: curr,
      lastFocusedElement: document.activeElement,
    };

    REF_STACK.push(refStackItem);

    document.addEventListener("keydown", handleKeyDown);

    const firstFocusableElement = curr.querySelector(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (REF_STACK[REF_STACK.length - 1]?.element === curr) {
        const item = REF_STACK.pop();
        item.lastFocusedElement.focus();
      }
    };
  }, [ref, isEnabled]); // eslint-disable-line react-hooks/exhaustive-deps
};

// Old Version

// export const useFocusTrap = (
//   ref = null,
//   callBack = () => {},
//   isEnabled = true
// ) => {
//   const handleKeyDown = (e) => {
//     const { key } = e;
//     if (key === "Escape" && REF_STACK.length > 0 && isEnabled) {
//       e.stopPropagation();

//       if (REF_STACK[REF_STACK.length - 1] === ref.current) {
//         const status = callBack?.(e, "escape-key");

//         if (status === true) return;

//         REF_STACK.pop();
//       }
//     }

//     // Focus trap
//     if (e.key === "Tab" && REF_STACK[REF_STACK.length - 1] === ref.current) {
//       const focusableElements = ref.current.querySelectorAll(
//         'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
//       );
//       if (focusableElements.length === 0) return;

//       const firstElement = focusableElements[0];
//       const lastElement = focusableElements[focusableElements.length - 1];

//       if (e.shiftKey && document.activeElement === firstElement) {
//         e.preventDefault();
//         lastElement.focus();
//       } else if (!e.shiftKey && document.activeElement === lastElement) {
//         e.preventDefault();
//         firstElement.focus();
//       }
//     }
//   };

//   useEffect(() => {
//     if (!ref?.current || !isEnabled) return;

//     const curr = ref.current;

//     REF_STACK.push(curr);

//     document.addEventListener("keydown", handleKeyDown);

//     const firstFocusableElement = curr.querySelector(
//       'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
//     );
//     if (firstFocusableElement) {
//       firstFocusableElement.focus();
//     }

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);

//       if (REF_STACK[REF_STACK.length - 1] === curr) {
//         REF_STACK.pop();
//       }
//     };
//   }, [ref, isEnabled]);
// };
