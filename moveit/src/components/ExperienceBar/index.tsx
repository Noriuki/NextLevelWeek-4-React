import { useContext } from "react";
import { ChallengesContext } from "../../contexts/ChallengesContext";
import styles from "./ExperienceBar.module.css";

export function ExperienceBar() {
  const { currentExp, expToNextLevel } = useContext(ChallengesContext);
  const porcentToNextLevel = Math.round((currentExp * 100) / expToNextLevel);

  return (
    <header className={styles.experienceBar}>
      <span>0XP</span>
      <div>
        <div style={{ width: `${porcentToNextLevel}%` }} />
        <span
          className={styles.currentExperience}
          style={{ left: `${porcentToNextLevel}%` }}
        >
          {currentExp}XP
        </span>
      </div>
      <span>{expToNextLevel}XP</span>
    </header>
  );
}
