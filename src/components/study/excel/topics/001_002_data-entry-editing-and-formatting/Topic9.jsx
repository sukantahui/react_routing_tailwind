import QuizEngine from "../../../QuizEngine";
import PracticeEngine from "../../../QuizEngine";
import questions from "./data-entry-and-formatting-test.json";

export default function Topic9() {
  return (
    <QuizEngine
      title="Module Test – Excel"
      questions={questions}
      testId="ecel_foundation_test_100"
    />
  );
}
