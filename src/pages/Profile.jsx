import { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./Profile.module.css";
import ProfileInput from "../components/ProfileInput";
import ToastMessage from "../components/ToastMessage";

import iconUpload from "/images/icon-upload-image.svg";
import iconChangesSaved from "/images/icon-changes-saved.svg";

function Profile() {
  const { profileData, setProfileData } = useOutletContext();
  const [showToast, setShowToast] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const isFirstNameEmpty = !profileData.firstName.trim();
    const isLastNameEmpty = !profileData.lastName.trim();
    const isEmailEmpty = !profileData.email.trim();

    const isEmailInvalid = !isEmailEmpty && !/^\S+@\S+\.\S+$/.test(profileData.email);

    if (isFirstNameEmpty || isLastNameEmpty || isEmailEmpty || isEmailInvalid) {
      return;
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const firstNameError = isSubmitted && !profileData.firstName.trim();
  const lastNameError = isSubmitted && !profileData.lastName.trim();

  let emailErrorMsg = null;
  if (isSubmitted) {
    if (!profileData.email.trim()) {
      emailErrorMsg = "Can't be empty";
    } else if (!/^\S+@\S+\.\S+$/.test(profileData.email)) {
      emailErrorMsg = "Invalid email format";
    }
  }

  return (
    <section className={styles.formCardContainer}>
      <div>
        <h1 className={styles.formTitle}>Profile Details</h1>
        <p className={styles.formSubtitle}>Add your details to create a personal touch to your profile.</p>
      </div>

      <form className={styles.detailsForm} onSubmit={handleSave} noValidate>
        <div className={styles.uploadSectionContainer}>
          <p className={styles.uploadLabel}>Profile picture</p>

          <div className={styles.uploadBoxWrapper} onClick={handleImageUploadClick}>
            <input type="file" accept="image/png, image/jpeg" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />

            <div className={styles.uploadBoxContainer}>
              {profileData.image ? (
                <>
                  <img className={styles.uploadedImg} src={profileData.image} alt="Profile Picture" />
                  <div className={styles.uploadOverlay}>
                    <img className={styles.overlayIcon} src={iconUpload} alt="Change" />
                    <span className={styles.overlayText}>Change Image</span>
                  </div>
                </>
              ) : (
                <>
                  <img className={styles.uploadIcon} src={iconUpload} alt="Upload" />
                  <span className={styles.uploadText}>+ Upload Image</span>
                </>
              )}
            </div>
          </div>

          <p className={styles.uploadInstructionText}>Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </div>

        <div className={styles.inputsSectionContainer}>
          <ProfileInput
            label="First name*"
            id="firstName"
            placeholder="e.g. John"
            value={profileData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            error={firstNameError ? "Can't be empty" : null}
          />
          <ProfileInput
            label="Last name*"
            id="lastName"
            placeholder="e.g. Appleseed"
            value={profileData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            error={lastNameError ? "Can't be empty" : null}
          />

          <ProfileInput
            label="Email"
            id="email"
            type="email"
            placeholder="e.g. email@example.com"
            value={profileData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={emailErrorMsg}
          />
        </div>

        <div className={styles.formFooterContainer}>
          <button className={styles.submitButton} type="submit">
            Save
          </button>
        </div>
      </form>

      {showToast && <ToastMessage message="Your changes have been successfully saved!" icon={iconChangesSaved} />}
    </section>
  );
}

export default Profile;
