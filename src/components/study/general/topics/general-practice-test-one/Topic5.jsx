import PracticeEngineMath from "../../../PracticeEngineMath";
import questions from "./math-test.json";

export default function Topic5() {
  return (
    <div className="w-full sm:px-4 md:px-6 lg:max-w-7xl lg:mx-auto">
      <PracticeEngineMath
        title="Quadratic Equations – Practice Test"
        questions={questions}
        testId="math_quadratic_test"
      />
    </div>

  );
}
