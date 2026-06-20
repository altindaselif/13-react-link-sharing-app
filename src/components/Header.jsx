import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

import logoLarge from "/images/logo-devlinks-large.svg";
import logoSmall from "/images/logo-devlinks-small.svg";
import iconLink from "/images/icon-link.svg";
import iconProfile from "/images/icon-profile-details-header.svg";
import iconPreview from "/images/icon-preview-header.svg";

function Header() {
  return (
    <header className={styles.dashboardHeaderContainer}>
      <div className={styles.logoContainer}>
        <img className={`${styles.logoImg} ${styles.desktopLogo}`} src={logoLarge} alt="Devlinks Logo" />
        <img className={`${styles.logoImg} ${styles.mobileLogo}`} src={logoSmall} alt="Devlinks Logo" />
      </div>

      <nav className={styles.navTabsContainer}>
        <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? `${styles.navTab} ${styles.active}` : styles.navTab)}>
          <img className={styles.tabIcon} src={iconLink} alt="Links" />
          <span className={styles.tabText}>Links</span>
        </NavLink>

        <NavLink to="/dashboard/profile" className={({ isActive }) => (isActive ? `${styles.navTab} ${styles.active}` : styles.navTab)}>
          <img className={styles.tabIcon} src={iconProfile} alt="Profile" />
          <span className={styles.tabText}>Profile Details</span>
        </NavLink>
      </nav>

      <Link to="/preview" className={styles.previewButton}>
        <span className={styles.previewText}>Preview</span>
        <img className={styles.previewIcon} src={iconPreview} alt="Preview" />
      </Link>
    </header>
  );
}

export default Header;
