import QuizEngine from "../../../QuizEngine";
import questions from "./c-syntax-test.json";

export default function Topic7() {
  return (
    <QuizEngine
      title="Module Test – Control Flow & Decision Making"
      questions={questions}
      testId="c_syntax_test"
    />
  );
}
