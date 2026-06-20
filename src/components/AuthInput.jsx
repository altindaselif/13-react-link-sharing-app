import styles from "./AuthInput.module.css";

function AuthInput({ label, id, type, placeholder, icon, error, value, onChange }) {
  return (
    <div className={`${styles.inputGroupContainer} ${error ? styles.hasError : ""}`}>
      <div className={styles.inputLabelContainer}>
        <label className={styles.inputLabel} htmlFor={id}>
          {label}
        </label>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>

      <div className={styles.inputWrapper}>
        <img className={styles.inputIcon} src={icon} alt={`${label} Icon`} />
        <input className={styles.inputField} type={type} id={id} placeholder={placeholder} value={value} onChange={onChange} />
      </div>
    </div>
  );
}

export default AuthInput;
