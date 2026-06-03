// import QuizEngine from "../../../QuizEngine";
import PracticeEngine from "../../../PracticeEngine";
import questions from "./topic0_files/inheritence-test.json";

export default function Topic0() {
  return (
    <PracticeEngine
      title="Class XI ISC Java Exam Preparation"
      questions={questions}
      testId="inheritence-abstract"
    />
  );
}
