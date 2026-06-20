import styles from "./ProfileLinkCard.module.css";

import iconArrow from "/images/icon-arrow-right.svg";

function ProfileLinkCard({ platform, title, link, icon, isMockup }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${isMockup ? styles.mockupLinkCard : styles.previewLinkCard} ${styles[`bg${platform}`]}`}
    >
      <div
        className={
          isMockup ? styles.mockupLinkContent : styles.previewLinkContent
        }
      >
        <img
          className={isMockup ? styles.mockupLinkIcon : styles.previewLinkIcon}
          src={icon}
          alt={title}
        />
        <span
          className={
            isMockup ? styles.mockupLinkTitle : styles.previewLinkTitle
          }
        >
          {title}
        </span>
      </div>
      <img
        className={isMockup ? styles.mockupArrowIcon : styles.previewArrowIcon}
        src={iconArrow}
        alt="Go to link"
      />
    </a>
  );
}

export default ProfileLinkCard;
