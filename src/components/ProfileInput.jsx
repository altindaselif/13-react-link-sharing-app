import styles from "./ProfileInput.module.css";

function ProfileInput({ label, id, type = "text", placeholder, value, onChange, error }) {
  return (
    <div className={`${styles.profileInputRow} ${error ? styles.hasError : ""}`}>
      <label className={styles.inputLabel} htmlFor={id}>
        {label}
      </label>

      <div className={styles.inputWrapper}>
        <input className={styles.inputField} type={type} id={id} placeholder={placeholder} value={value} onChange={onChange} />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    </div>
  );
}

export default ProfileInput;
