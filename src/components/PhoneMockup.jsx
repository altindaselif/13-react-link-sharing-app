import styles from "./PhoneMockup.module.css";
import ProfileHeader from "./ProfileHeader";
import ProfileLinkCard from "./ProfileLinkCard";

import { PLATFORMS } from "../constants/platforms";
import phoneMockup from "/images/illustration-phone-mockup.svg";
import profileImg from "/images/image-profile.png";

function PhoneMockup({ links, profileData }) {
  const fullName = `${profileData.firstName} ${profileData.lastName}`.trim();

  return (
    <section className={styles.mockupCardContainer}>
      <div className={styles.mockupPhoneWrapper}>
        <img className={styles.mockupImg} src={phoneMockup} alt="Phone Mockup" />

        <div className={styles.mockupScreenContent}>
          <ProfileHeader
            image={profileData.image || profileImg}
            name={fullName || "Ben Wright"}
            email={profileData.email || "ben@example.com"}
            isMockup={true}
          />

          <div className={styles.mockupLinksContainer}>
            {links.map((linkItem) => {
              const platformInfo = PLATFORMS.find((p) => p.id === linkItem.platform) || PLATFORMS[0];

              return (
                <ProfileLinkCard
                  key={linkItem.id}
                  platform={linkItem.platform}
                  title={platformInfo.name}
                  link={linkItem.url}
                  icon={platformInfo.icon}
                  isMockup={true}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhoneMockup;
