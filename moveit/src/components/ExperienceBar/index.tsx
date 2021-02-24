// import { useState } from 'react';
import styles from "../../styles/components/ExperienceBar.module.css";
export function ExperienceBar() {
  // const [xpCount, setXpCount] = useState(20);

  return (
    <header className={styles.experienceBar}>
      <span>0XP</span>
      <div>
        <div style={{ width: "50%" }} />
        <span className={styles.currentExperience}>300XP</span>
      </div>
      <span>600XP</span>
    </header>
  );
}
