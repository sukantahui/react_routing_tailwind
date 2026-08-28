// import QuizEngine from "../../../QuizEngine";
import PracticeEngine from "../../../PracticeEngine";
import questions from "./arrayExercises.json";

export default function Topic6() {
  return (
    <PracticeEngine
      title="Module Test – Control Flow & Decision Making"
      questions={questions}
      testId="js_control_flow_100"
    />
  );
}
