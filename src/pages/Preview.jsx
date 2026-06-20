import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Preview.module.css";
import ProfileHeader from "../components/ProfileHeader";
import ProfileLinkCard from "../components/ProfileLinkCard";
import ToastMessage from "../components/ToastMessage";

import { PLATFORMS } from "../constants/platforms";
import iconChangesSaved from "/images/icon-changes-saved.svg";

function Preview() {
  const [showToast, setShowToast] = useState(false);

  const [links] = useState(() => {
    const savedLinks = localStorage.getItem("devlinks_links");
    return savedLinks ? JSON.parse(savedLinks) : [];
  });

  const [profileData] = useState(() => {
    const savedProfile = localStorage.getItem("devlinks_profile");
    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          firstName: "",
          lastName: "",
          email: "",
          image: null,
        };
  });

  const fullName = `${profileData.firstName} ${profileData.lastName}`.trim();

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className={styles.previewPageWrapper}>
      <div className={styles.previewBackground}></div>

      <header className={styles.previewHeaderContainer}>
        <Link to="/dashboard" className={`${styles.navButton} ${styles.navButtonSecondary}`}>
          Back to Editor
        </Link>
        <button onClick={handleShareLink} className={`${styles.navButton} ${styles.navButtonPrimary}`}>
          Share Link
        </button>
      </header>

      <main className={styles.previewMainContainer}>
        <section className={styles.profileCardContainer}>
          <ProfileHeader
            image={profileData.image || "/images/image-profile.png"}
            name={fullName || "Ben Wright"}
            email={profileData.email || "ben@example.com"}
            isMockup={false}
          />

          <div className={styles.profileLinksContainer}>
            {links.map((linkItem) => {
              const platformInfo = PLATFORMS.find((p) => p.id === linkItem.platform) || PLATFORMS[0];

              return (
                <ProfileLinkCard
                  key={linkItem.id}
                  platform={linkItem.platform}
                  title={platformInfo.name}
                  link={linkItem.url}
                  icon={platformInfo.icon}
                  isMockup={false}
                />
              );
            })}
          </div>
        </section>
      </main>

      {showToast && <ToastMessage message="The link has been copied to your clipboard!" icon={iconChangesSaved} />}
    </div>
  );
}

export default Preview;
