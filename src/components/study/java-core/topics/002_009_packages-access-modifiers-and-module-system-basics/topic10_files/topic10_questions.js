const topic10_questions = [
  {
    question: "What is the purpose of the '-d' flag when running the 'javac' compiler on packaged Java files?",
    shortAnswer: "The '-d <directory>' flag tells javac to automatically create the package directory structure (e.g. 'com/company/app/') inside the specified target folder and place the compiled '.class' files in their correct folder hierarchy.",
    explanation: "Without '-d', javac simply outputs the .class file in the current folder without creating package folders.",
    hint: "Automatically creates package folder hierarchies for compiled .class files.",
    level: "Beginner",
    codeExample: "javac -d out src/com/app/Main.java\njava -cp out com.app.Main"
  }
];

export default topic10_questions;