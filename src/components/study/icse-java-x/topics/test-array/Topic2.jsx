import SingleStudentMarksheet from '../../../SingleStudentMarksheet';
import questionsData from './topic0_files/question.json'; // your simple array

const Topic2 = () => {
    
  return (
    <div className="container mx-auto py-8">
      <SingleStudentMarksheet 
        questions={questionsData} 
        paperTitle="Java Arrays – Practice Paper (Class X)" 
      />
    </div>
  );
};

export default Topic2;



