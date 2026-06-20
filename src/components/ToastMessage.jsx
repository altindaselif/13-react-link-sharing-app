import styles from "./ToastMessage.module.css";

import defaultIcon from "/images/icon-link.svg";

function ToastMessage({ message, icon }) {
  return (
    <div className={styles.toastMessageContainer}>
      <img className={styles.toastIcon} src={icon || defaultIcon} alt="Toast icon" />
      <span className={styles.toastText}>{message}</span>
    </div>
  );
}

export default ToastMessage;
