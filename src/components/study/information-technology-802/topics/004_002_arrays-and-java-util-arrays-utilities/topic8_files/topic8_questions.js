export default [
  {
    question: "Complete the missing statements in the following CBSE Board Question:\n// Statement-1: ____________\npublic class LanguageSearch {\n    public static void main(String[] args) {\n        String[] languages = {\"Java\", \"Python\", \"C++\", \"Ruby\"};\n        Arrays.sort(languages);\n        // Statement-2: Search for \"Python\"\n        int index = ____________;\n        System.out.println(\"Found at index: \" + index);\n    }\n}",
    answer: "Statement-1: `import java.util.Arrays;`\nStatement-2: `Arrays.binarySearch(languages, \"Python\")`",
    marks: 4,
    hint: "Statement-1 is the import; Statement-2 is Arrays.binarySearch(languages, \"Python\")."
  },
  {
    question: "In the code completion problem above, what index is printed for \"Python\" after sorting `{\"Java\", \"Python\", \"C++\", \"Ruby\"}`?",
    options: ["2", "1", "3", "0"],
    correctAnswer: 0,
    explanation: "After sorting, the array becomes: `[\"C++\", \"Java\", \"Python\", \"Ruby\"]`. Index of \"Python\" is 2.",
    marks: 2
  }
];
