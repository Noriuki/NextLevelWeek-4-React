import { GetServerSideProps } from "next";
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { CountdownProvider } from "../contexts/CountdownContext";
import styles from "../styles/pages/Home.module.css";

interface HomeProps {
  level: number;
  currentExp: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <div className={styles.container}>
      <ChallengesProvider>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </ChallengesProvider>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExp, challengesCompleted } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExp: Number(currentExp),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
