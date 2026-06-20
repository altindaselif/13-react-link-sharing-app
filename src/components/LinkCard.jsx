import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./LinkCard.module.css";

import { PLATFORMS } from "../constants/platforms";
import iconDrag from "/images/icon-drag-and-drop.svg";
import iconChevron from "/images/icon-chevron-down.svg";
import iconLink from "/images/icon-link.svg";

function LinkCard({ id, link, index, onRemove, onChange, isSubmitted }) {
  const [isOpen, setIsOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const selectedPlatform = PLATFORMS.find((p) => p.id === link.platform) || PLATFORMS[0];

  return (
    <div ref={setNodeRef} style={style} className={styles.linkCardContainer}>
      <div className={styles.linkCardHeaderContainer}>
        <div className={styles.linkCardTitleContainer} {...attributes} {...listeners}>
          <img className={styles.linkCardDragIcon} src={iconDrag} alt="Drag" />
          <span className={styles.linkCardTitle}>Link #{index + 1}</span>
        </div>
        <button className={styles.removeButton} type="button" onClick={onRemove}>
          Remove
        </button>
      </div>

      <div className={styles.linkCardBodyContainer}>
        <div className={`${styles.inputGroupContainer} ${isOpen ? styles.isOpen : ""}`}>
          <label className={styles.inputLabel}>Platform</label>

          <div className={`${styles.dropdownContainer} ${isOpen ? styles.active : ""}`} onClick={() => setIsOpen(!isOpen)}>
            <div className={styles.dropdownTitleContainer}>
              <img className={styles.dropdownIcon} src={selectedPlatform.icon} alt={selectedPlatform.name} />
              <span className={styles.dropdownText}>{selectedPlatform.name}</span>
            </div>
            <img className={styles.dropdownOpenIcon} src={iconChevron} alt="Open" />
          </div>

          <div className={styles.dropdownMenuContainer}>
            {PLATFORMS.map((plat) => (
              <div
                key={plat.id}
                className={`${styles.dropdownItemContainer} ${link.platform === plat.id ? styles.selected : ""}`}
                onClick={() => {
                  onChange("platform", plat.id);
                  setIsOpen(false);
                }}
              >
                <img src={plat.icon} alt={plat.name} />
                <span className={styles.dropdownText}>{plat.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.inputGroupContainer} ${link.url.trim() === "" && isSubmitted ? styles.hasError : ""}`}>
          <label className={styles.inputLabel}>Link</label>
          <div className={styles.inputContainer}>
            <img className={styles.inputIcon} src={iconLink} alt="Link" />
            <input
              className={styles.inputField}
              type="text"
              placeholder="e.g. https://www.github.com/johnappleseed"
              value={link.url}
              onChange={(e) => onChange("url", e.target.value)}
            />
            <span className={styles.errorText}>Can't be empty</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkCard;
