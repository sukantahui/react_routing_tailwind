import PracticeEngine from "../../../PracticeEngine";
import questions from "./c-fundamental-test.json";

export default function Topic6() {
  return (
    <PracticeEngine
      title="Module Test – C Programming Foundations"
      questions={questions}
      testId="c_foundation_test_100"
    />
  );
}
