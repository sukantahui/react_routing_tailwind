import QuizEngine from "../../../QuizEngine";
import questions from "./basic-formulas-and-functions-test.json";

export default function Topic8() {
  return (
    <QuizEngine
      title="Excel Formulas and Functions Test"
      questions={questions}
      testId="excel"
    />
  );
}
