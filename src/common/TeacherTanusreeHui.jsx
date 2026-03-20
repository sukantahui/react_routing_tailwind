import teacherImage from "../assets/teachers/teacher_tanusree_hui.jpg";
export default function TeacherTanusreeHui() {
        const workingFrom='2007-02-15';
        const name='Tanusree Hui'; 
        const experience= (workingDate)=>{
            const currentDate = new Date();
            const workingDateObj = new Date(workingDate);
            let experience= currentDate.getFullYear() - workingDateObj.getFullYear();
            return experience;

        }
        const experienceYear= experience(workingFrom);

        
        
        return (
            <>
                <div>
                   <img src={teacherImage}  alt={name} className="w-20 h-20 rounded-full"/>
                    <h1 className="text-2xl font-bold mt-4">{name}</h1>
                    <h5>Our Teacher is {name}</h5>
                    <h5>She is working since {workingFrom}</h5>
                    <h5>She has {experienceYear}+ years of experience</h5>
                

                </div>

            </>
        );
}