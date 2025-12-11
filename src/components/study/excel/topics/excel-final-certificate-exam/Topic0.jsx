import QuizEngine from "../../../QuizEngine";
import questions from "./excel-final-certificate-exam-test.json";

export default function Topic0() {
  return (
    <QuizEngine
      title="Final Examination"
      questions={questions}
      testId="final_examination_100"
    />
  );
}
