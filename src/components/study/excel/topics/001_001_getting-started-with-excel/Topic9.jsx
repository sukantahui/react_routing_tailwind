import QuizEngine from "../../../QuizEngine";
import questions from "./getting-started-with-excel-test.json";

export default function Topic9() {
  return (
    <QuizEngine
      title="Module Test – Control Excel"
      questions={questions}
      testId="c_syntax_test"
    />
  );
}
