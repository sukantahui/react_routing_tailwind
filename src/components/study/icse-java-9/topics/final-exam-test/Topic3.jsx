// import QuizEngine from "../../../QuizEngine";
import PracticeEngine from "../../../PracticeEngine";
import questions from "./function-test.json";

export default function Topic0() {
  return (
    <PracticeEngine
      title="Class IX ICSE Java Exam Preparation"
      questions={questions}
      testId="js_control_flow_100"
    />
  );
}
