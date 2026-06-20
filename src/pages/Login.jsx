import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "../components/AuthInput";
import styles from "./Login.module.css";

import logoLarge from "/images/logo-devlinks-large.svg";
import iconEmail from "/images/icon-email.svg";
import iconPassword from "/images/icon-password.svg";

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const isEmailEmpty = !email.trim();
    const isEmailInvalid = !isEmailEmpty && !/^\S+@\S+\.\S+$/.test(email);
    const isPasswordEmpty = !password.trim();
    const isPasswordTooShort = !isPasswordEmpty && password.length < 8;

    const isConfirmPasswordEmpty = !isLogin && !confirmPassword.trim();
    const doPasswordsMatch = !isLogin && password === confirmPassword;

    if (
      isEmailEmpty ||
      isEmailInvalid ||
      isPasswordEmpty ||
      isPasswordTooShort ||
      (!isLogin && (isConfirmPasswordEmpty || !doPasswordsMatch))
    ) {
      return;
    }

    if (!isLogin) {
      alert("Account created successfully! Logging you in...");
    }

    navigate("/dashboard");
  };

  let emailError = null;
  if (isSubmitted) {
    if (!email.trim()) emailError = "Can't be empty";
    else if (!/^\S+@\S+\.\S+$/.test(email)) emailError = "Invalid email format";
  }

  let passwordError = null;
  if (isSubmitted) {
    if (!password.trim()) passwordError = "Can't be empty";
    else if (password.length < 8) passwordError = "At least 8 chars";
  }

  let confirmPasswordError = null;
  if (isSubmitted && !isLogin) {
    if (!confirmPassword.trim()) confirmPasswordError = "Can't be empty";
    else if (password !== confirmPassword) confirmPasswordError = "Passwords must match";
  }

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setIsSubmitted(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={styles.loginPageWrapper}>
      <main className={styles.mainContainer}>
        <header className={styles.logoContainer}>
          <img className={styles.logoImg} src={logoLarge} alt="Devlinks Logo" />
        </header>

        <section className={styles.authCardContainer}>
          <div className={styles.authHeaderContainer}>
            <h1 className={styles.authTitle}>{isLogin ? "Login" : "Create account"}</h1>
            <p className={styles.authSubtitle}>
              {isLogin ? "Add your details below to get back into the app" : "Let's get you started sharing your links!"}
            </p>
          </div>

          <form className={styles.authFormContainer} onSubmit={handleSubmit} noValidate>
            <AuthInput
              label="Email address"
              id="email"
              type="email"
              placeholder="e.g. alex@email.com"
              icon={iconEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
            />

            {isLogin ? (
              <AuthInput
                label="Password"
                id="password"
                type="password"
                placeholder="Enter your password"
                icon={iconPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
              />
            ) : (
              <>
                <AuthInput
                  label="Create password"
                  id="create-password"
                  type="password"
                  placeholder="At least 8 characters"
                  icon={iconPassword}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={passwordError}
                />
                <div>
                  <AuthInput
                    label="Confirm password"
                    id="confirm-password"
                    type="password"
                    placeholder="At least 8 characters"
                    icon={iconPassword}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={confirmPasswordError}
                  />
                  <p className={styles.passwordInstructionText}>Password must contain at least 8 characters</p>
                </div>
              </>
            )}

            <button className={styles.submitButton} type="submit">
              {isLogin ? "Login" : "Create new account"}
            </button>
          </form>

          <div className={styles.authFooterContainer}>
            <p className={styles.footerText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button type="button" className={styles.footerLink} onClick={toggleMode}>
                {isLogin ? "Create account" : "Login"}
              </button>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
