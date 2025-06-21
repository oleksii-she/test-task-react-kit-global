"use client";
import styles from "./modal.module.css";
import { SetStateAction, useEffect } from "react";
import { IconClose } from "./IconClose";

type Props = {
  children: React.ReactNode;
  setModalToggle: React.Dispatch<SetStateAction<boolean>>;
  modalToggle: boolean;
  closeIcon?: boolean;
};

export const Modal: React.FC<Props> = ({
  children,
  setModalToggle,
  modalToggle,
  closeIcon,
}) => {
  useEffect(() => {
    const handlerKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        setModalToggle(false);
        document.body.style.overflow = "unset";
      }
    };

    if (modalToggle) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handlerKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handlerKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [modalToggle, setModalToggle]);

  const onCloseOverlay: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      setModalToggle(false);
      document.body.style.overflow = "unset";
    }
  };

  return (
    <div
      className={`${styles.overlay} ${modalToggle ? styles.show : ""}`}
      onClick={onCloseOverlay}
    >
      <div className={`${styles.container} ${modalToggle ? styles.show : ""}`}>
        <div className={styles.modal}>
          {closeIcon && (
            <button
              className={styles.modal_close}
              onClick={() => {
                setModalToggle(false);
                document.body.style.overflow = "unset";
              }}
              aria-label="Close modal"
            >
              <IconClose className={styles.modal_closeIcon} />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
