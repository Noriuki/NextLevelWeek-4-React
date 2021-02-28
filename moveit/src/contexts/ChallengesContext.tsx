import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import challenges from "../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface challengesContextData {
  level: number;
  currentExp: number;
  expToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completedChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExp: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as challengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExp, setCurrentExp] = useState(rest.currentExp ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const expToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);
  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExp", String(currentExp));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExp, challengesCompleted]);
  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true)
  }
  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }
  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);
    new Audio("/notification.mp3").play();
    if (Notification.permission == "granted") {
      new Notification("Novo Desafio 💪", {
        body: `Valendo ${challenge.amount}xp`,
        silent: true,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completedChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;

    let finalExperience = currentExp + amount;

    if (finalExperience >= expToNextLevel) {
      finalExperience = finalExperience - expToNextLevel;
      levelUp();
    }

    setCurrentExp(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExp,
        expToNextLevel,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completedChallenge,
        closeLevelUpModal
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal/>}
    </ChallengesContext.Provider>
  );
}
