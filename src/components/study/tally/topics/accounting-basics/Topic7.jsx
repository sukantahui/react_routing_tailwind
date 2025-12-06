import QuizEngine from "../../../QuizEngine";
import questions from "./tally-accounting-basic-test.json";

export default function Topic7() {
  return (
    <QuizEngine
      title="Module Test – Tally Accounting Basic"
      questions={questions}
      testId="c_syntax_test"
    />
  );
}
