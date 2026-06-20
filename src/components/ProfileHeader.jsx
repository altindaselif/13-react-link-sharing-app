import styles from "./ProfileHeader.module.css";

import defaultProfileImg from "/images/image-profile.png";

function ProfileHeader({ image, name, email, isMockup }) {
  return (
    <div
      className={
        isMockup ? styles.mockupProfileInfo : styles.previewProfileInfo
      }
    >
      <div
        className={
          isMockup ? styles.mockupImageWrapper : styles.previewImageWrapper
        }
      >
        <img
          className={
            isMockup ? styles.mockupProfileImg : styles.previewProfileImg
          }
          src={image || defaultProfileImg}
          alt={name || "Profile Picture"}
        />
      </div>

      <h2 className={isMockup ? styles.mockupName : styles.previewName}>
        {name || "Your Name"}
      </h2>

      <p className={isMockup ? styles.mockupEmail : styles.previewEmail}>
        {email || "email@example.com"}
      </p>
    </div>
  );
}

export default ProfileHeader;
