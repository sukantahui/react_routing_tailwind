import QuizEngine from "../../../QuizEngine";
import questions from "./functions-basics-test.json";

export default function Topic6() {
  return (
    <QuizEngine
      title="Module Test – Function Basics"
      questions={questions}
      testId="js_control_flow_100"
    />
  );
}
