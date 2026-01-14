// import QuizEngine from "../../../QuizEngine";
import PracticeEngine from "../../../PracticeEngine";
import questions from "./introduction-to-unix-test.json";

export default function Topic18() {
  return (
    <PracticeEngine
      title="Introduction to Unix and Linux"
      questions={questions}
      testId="js_control_flow_100"
    />
  );
}