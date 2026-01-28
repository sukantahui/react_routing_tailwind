import ShortQuestionPracticeEngine from "../../../ShortQuestionPracticeEngine";
import shortQData from "./fundamental-rights-shortquestion.json"
export default function Topic7() {
  return (
    <>
      <h1 className="text-white text-2xl">Topic 7 Loaded</h1>
      <ShortQuestionPracticeEngine data={shortQData} />
    </>
  );
}