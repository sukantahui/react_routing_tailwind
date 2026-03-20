import teacherImage from "../assets/teachers/teacher_sukanta_hui.jpg";
export default function TeacherSukantaHui() {
    const workingFrom='1998-05-20';
    const name='Sukanta Hui';
    const calculateExperience = (date) => {
        const birthDate = new Date(date);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    };
    const experience = calculateExperience(workingFrom);
    return (
        <>
            <div>
                <img
                    src={teacherImage}
                    alt={name}
                    className="w-36 h-36 rounded-full object-cover 
                                border-2 border-gray-300
                                transition duration-300
                                hover:border-blue-400
                                hover:shadow-[0_0_18px_rgba(59,130,246,0.4)]"
                />
                <h1 className="text-2xl font-bold mt-4">{name}</h1>
                <h1>Our Teacher is {name}</h1>
                <h2>Experience: {experience}+</h2>
               
            </div>
        </>
    );
}