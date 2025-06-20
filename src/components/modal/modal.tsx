"use client";
import styles from "./modal.module.css";
import { SetStateAction, useEffect } from "react";
import { IconClose } from "./IconClose";

type Props = {
  children: React.ReactNode;
  setModalToggle: React.Dispatch<SetStateAction<boolean>>;
  modalToggle: boolean;
};
export const Modal: React.FC<Props> = ({
  children,
  setModalToggle,
  modalToggle,
}) => {
  useEffect(() => {
    window.addEventListener("keydown", handlerKeyDown);
    function handlerKeyDown(e: { code: string }) {
      if (e.code === "Escape") {
        setModalToggle(false);
        document.body.style.overflow = "unset";
      }
    }

    if (modalToggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handlerKeyDown);
    };
  }, [setModalToggle, modalToggle]);

  const onCloseOverlay: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      setModalToggle(false);
      document.body.style.overflow = "unset";
    }
  };

  return (
    <div
      className={
        modalToggle
          ? `${styles.overlay} ${styles.show_modal}`
          : `${styles.isHidden}`
      }
      onClick={(e) => onCloseOverlay(e)}
    >
      <div className={styles.container}>
        <button
          className={styles.modal_close}
          onClick={() => setModalToggle(false)}
        >
          <IconClose className={styles.modal_closeIcon} />
        </button>
        <div
          className={
            modalToggle
              ? `${styles.modal} ${styles.show} ${styles.show_modal}`
              : `${styles.hidden}`
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};
