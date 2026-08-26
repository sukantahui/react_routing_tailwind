const topic9_questions = [
  {
    "question": "Can a Stream pipeline exist without any intermediate operations?",
    "shortAnswer": "Yes! A pipeline can go directly from a Source to a Terminal Operation (e.g. list.stream().forEach(System.out::println) or list.stream().count()).",
    "explanation": "Zero or more intermediate operations are permitted between source and terminal.",
    "hint": "Intermediate operations are optional; source and terminal operations are mandatory.",
    "level": "Beginner",
    "codeExample": "long totalCount = students.stream().count(); // 0 intermediate operations"
  },
  {
    "question": "What happens if a stream pipeline defines intermediate operations but never calls a terminal operation?",
    "shortAnswer": "Absolutely nothing executes! The intermediate operations remain lazy declarations, no elements are pulled from the source, and zero CPU cycles are spent on computations.",
    "explanation": "Terminal operations act as the ignition key that starts the data processing engine.",
    "hint": "Without a terminal operation, the pipeline is inert and never runs.",
    "level": "Beginner",
    "codeExample": "Stream<String> s = list.stream().filter(x -> { System.out.println(x); return true; }); // Nothing printed!"
  }
];

export default topic9_questions;
