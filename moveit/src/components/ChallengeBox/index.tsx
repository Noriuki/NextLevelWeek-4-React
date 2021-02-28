import { useContext } from "react";
import { ChallengesContext } from "../../contexts/ChallengesContext";
import { CountdownContext } from "../../contexts/CountdownContext";
import styles from "./ChallengeBox.module.css";
export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completedChallenge } = useContext(
    ChallengesContext
  );
  const { resetCountdown } = useContext(CountdownContext);
  function handleChallengeSucceed() {
    completedChallenge();
    resetCountdown();
  }
  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount}</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challengeFailedBtn}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              onClick={handleChallengeSucceed}
              className={styles.challengeSucceedBtn}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um cliclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="level-up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}
