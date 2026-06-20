import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import PhoneMockup from "./PhoneMockup";
import styles from "./DashboardLayout.module.css";

function DashboardLayout() {
  const [links, setLinks] = useState(() => {
    const savedLinks = localStorage.getItem("devlinks_links");
    return savedLinks ? JSON.parse(savedLinks) : [];
  });

  const [profileData, setProfileData] = useState(() => {
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

  useEffect(() => {
    localStorage.setItem("devlinks_links", JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem("devlinks_profile", JSON.stringify(profileData));
  }, [profileData]);

  return (
    <div className={styles.dashboardWrapper}>
      <Header />
      <main className={styles.dashboardMainContainer}>
        <PhoneMockup links={links} profileData={profileData} />
        <Outlet context={{ links, setLinks, profileData, setProfileData }} />
      </main>
    </div>
  );
}

export default DashboardLayout;
