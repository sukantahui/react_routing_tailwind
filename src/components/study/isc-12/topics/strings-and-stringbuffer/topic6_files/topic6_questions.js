// topic6_files/topic6_questions.js
const questions = [
    {
        question: "How do you reverse a string in Java?",
        shortAnswer: "Using StringBuilder's reverse() method: new StringBuilder(str).reverse().toString()",
        explanation: "StringBuilder has a built-in reverse() method that reverses the character sequence efficiently.",
        hint: "Simplest and fastest way.",
        level: "basic",
        codeExample: "String reversed = new StringBuilder(\"hello\").reverse().toString(); // \"olleh\""
    },
    {
        question: "How to reverse a string without using StringBuilder?",
        shortAnswer: "Convert to char array and swap characters from both ends.",
        explanation: "Use toCharArray(), then loop from start to end swapping characters. Then create a new String from the array.",
        hint: "Two-pointer technique.",
        level: "intermediate",
        codeExample: "char[] arr = str.toCharArray();\nfor(int i=0,j=arr.length-1; i<j; i++,j--) {\n    char t=arr[i]; arr[i]=arr[j]; arr[j]=t;\n}\nreturn new String(arr);"
    },
    {
        question: "What is a palindrome?",
        shortAnswer: "A word, phrase, or sequence that reads the same forwards and backwards (e.g., 'radar', 'level').",
        explanation: "Palindromes ignore case, spaces, and punctuation in real-world checks. Examples: 'A man, a plan, a canal: Panama'.",
        hint: "Compare first and last characters moving inward.",
        level: "basic",
        codeExample: "boolean isPalindrome = str.equals(new StringBuilder(str).reverse().toString());"
    },
    {
        question: "How to check if a string is a palindrome ignoring case and non-alphanumeric?",
        shortAnswer: "Normalize the string: remove non-alphanumeric, convert to lowercase, then compare with reverse.",
        explanation: "Use replaceAll(\"[^a-zA-Z0-9]\", \"\") to keep only letters/digits, then toLowerCase().",
        hint: "Clean the string first.",
        level: "intermediate",
        codeExample: "String clean = str.replaceAll(\"[^a-zA-Z0-9]\", \"\").toLowerCase();\nreturn clean.equals(new StringBuilder(clean).reverse().toString());"
    },
    {
        question: "How to count words in a string?",
        shortAnswer: "Use split(\"\\\\s+\") on trimmed string, then count array length.",
        explanation: "trim() removes leading/trailing spaces; split(\"\\\\s+\") splits on one or more whitespace characters.",
        hint: "Handle empty string specially.",
        level: "basic",
        codeExample: "if(str == null || str.trim().isEmpty()) return 0;\nreturn str.trim().split(\"\\\\s+\").length;"
    },
    {
        question: "Why not use split(\" \") for word count?",
        shortAnswer: "It fails with multiple spaces, tabs, or newlines, creating empty strings in the array.",
        explanation: "split(\" \") only splits on single space. For robust word counting, use regex \\\\s+.",
        hint: "\\\\s matches any whitespace.",
        level: "intermediate",
        codeExample: "\"Hello  world\".split(\" \") → [\"Hello\", \"\", \"world\"] (incorrect count)"
    },
    {
        question: "How to count frequency of each character in a string?",
        shortAnswer: "Use a HashMap<Character, Integer> and iterate over characters.",
        explanation: "For each char, get current count, increment, and put back. Or use getOrDefault.",
        hint: "Alternatively, use int[256] for ASCII only.",
        level: "intermediate",
        codeExample: "Map<Character, Integer> map = new HashMap<>();\nfor(char c : str.toCharArray()) {\n    map.put(c, map.getOrDefault(c, 0) + 1);\n}"
    },
    {
        question: "What is the time complexity of reversing a string with StringBuilder?",
        shortAnswer: "O(n) where n is the length of the string.",
        explanation: "reverse() iterates over half the characters, swapping them.",
        hint: "Linear time, constant extra space.",
        level: "intermediate",
        codeExample: "// O(n) time, O(n) space for the new string"
    },
    {
        question: "How to find the first non-repeated character in a string?",
        shortAnswer: "Build frequency map, then iterate again to find first character with count 1.",
        explanation: "First pass: count frequencies. Second pass: check each character's frequency.",
        hint: "LinkedHashMap preserves insertion order.",
        level: "advanced",
        codeExample: "Map<Character, Integer> freq = new LinkedHashMap<>();\nfor(char c : s.toCharArray()) freq.put(c, freq.getOrDefault(c,0)+1);\nfor(Map.Entry<Character,Integer> e : freq.entrySet()) if(e.getValue()==1) return e.getKey();"
    },
    {
        question: "How to check if two strings are anagrams?",
        shortAnswer: "Sort both strings and compare, or count character frequencies and compare maps.",
        explanation: "Anagrams have same characters with same counts. Sort: O(n log n). Frequency map: O(n).",
        hint: "Ignore case and spaces first.",
        level: "intermediate",
        codeExample: "char[] a = s1.toCharArray(); char[] b = s2.toCharArray();\nArrays.sort(a); Arrays.sort(b);\nreturn Arrays.equals(a, b);"
    },
    {
        question: "How to remove duplicate characters from a string?",
        shortAnswer: "Use LinkedHashSet to preserve order, then join.",
        explanation: "Add each character to a Set; duplicates are automatically ignored. LinkedHashSet maintains insertion order.",
        hint: "Alternatively, use StringBuilder and track seen characters.",
        level: "intermediate",
        codeExample: "StringBuilder sb = new StringBuilder();\nSet<Character> set = new LinkedHashSet<>();\nfor(char c : str.toCharArray()) set.add(c);\nfor(char c : set) sb.append(c);\nreturn sb.toString();"
    },
    {
        question: "How to check if a string contains only digits?",
        shortAnswer: "Use str.matches(\"\\\\d+\") or loop with Character.isDigit().",
        explanation: "Regular expression \\\\d+ matches one or more digits. For empty string, handle separately.",
        hint: "Also str.chars().allMatch(Character::isDigit).",
        level: "basic",
        codeExample: "boolean isNumeric = str != null && str.matches(\"\\\\d+\");"
    },
    {
        question: "How to capitalize the first letter of each word?",
        shortAnswer: "Split by spaces, capitalize first char of each word, then join.",
        explanation: "Use Character.toUpperCase(word.charAt(0)) + word.substring(1).toLowerCase() for rest.",
        hint: "Handle single-letter words and edge cases.",
        level: "intermediate",
        codeExample: "String[] words = str.split(\"\\\\s+\");\nStringBuilder sb = new StringBuilder();\nfor(String w : words) {\n    sb.append(Character.toUpperCase(w.charAt(0))).append(w.substring(1).toLowerCase()).append(\" \");\n}\nreturn sb.toString().trim();"
    },
    {
        question: "What is the most efficient way to reverse a string in Java?",
        shortAnswer: "Using StringBuilder.reverse() – it's optimized and uses native code in some JVMs.",
        explanation: "Manual char array swapping is also O(n) but more code. StringBuilder is preferred for readability and performance.",
        hint: "Let the library do the work.",
        level: "basic",
        codeExample: "// Best: new StringBuilder(str).reverse().toString()"
    },
    {
        question: "How to find all substrings of a string?",
        shortAnswer: "Use nested loops: for start from 0 to n, for end from start+1 to n, substring(start, end).",
        explanation: "Number of substrings = n*(n+1)/2. Complexity O(n²).",
        hint: "Only for small strings.",
        level: "advanced",
        codeExample: "for(int i=0; i<str.length(); i++) {\n    for(int j=i+1; j<=str.length(); j++) {\n        System.out.println(str.substring(i, j));\n    }\n}"
    },
    {
        question: "How to check if a string is a rotation of another string?",
        shortAnswer: "Check if (a.length() == b.length()) && (a + a).contains(b).",
        explanation: "If b is a rotation of a, then b will be a substring of a concatenated with itself.",
        hint: "Works for all rotations.",
        level: "advanced",
        codeExample: "return (a.length() == b.length()) && (a + a).contains(b);"
    },
    {
        question: "How to count vowels and consonants in a string?",
        shortAnswer: "Loop through characters and check against vowel set.",
        explanation: "Define vowels 'a','e','i','o','u' (both cases). Count vowels; consonants are letters that are not vowels.",
        hint: "Ignore non-letters.",
        level: "basic",
        codeExample: "int vowels = 0, consonants = 0;\nString lower = str.toLowerCase();\nfor(char c : lower.toCharArray()) {\n    if(c>='a' && c<='z') {\n        if(\"aeiou\".indexOf(c) != -1) vowels++;\n        else consonants++;\n    }\n}"
    },
    {
        question: "How to find the longest palindrome substring?",
        shortAnswer: "Expand around center for each character and between characters.",
        explanation: "Classic O(n²) algorithm. For each center (2n-1 possibilities), expand outward while characters match.",
        hint: "Manacher's algorithm gives O(n) but is complex.",
        level: "expert",
        codeExample: "// Expand around center technique"
    },
    {
        question: "How to reverse words in a sentence (order of words reversed, not characters)?",
        shortAnswer: "Split by spaces, reverse the array of words, then join.",
        explanation: "Example: 'Hello world' → ['Hello','world'] → reverse → ['world','Hello'] → join with space.",
        hint: "Use String.join(\" \", reversedArray).",
        level: "intermediate",
        codeExample: "String[] words = str.split(\" \");\nCollections.reverse(Arrays.asList(words));\nreturn String.join(\" \", words);"
    },
    {
        question: "How to find the most frequent character in a string?",
        shortAnswer: "Build frequency map, track max count and corresponding character.",
        explanation: "Iterate map entries to find maximum value.",
        hint: "If tie, return first occurring.",
        level: "intermediate",
        codeExample: "Map<Character, Integer> freq = new HashMap<>();\nchar most = '\\0';\nint max = 0;\nfor(char c : str.toCharArray()) {\n    int count = freq.getOrDefault(c,0)+1;\n    freq.put(c, count);\n    if(count > max) { max = count; most = c; }\n}\nreturn most;"
    },
    {
        question: "How to remove all whitespace from a string?",
        shortAnswer: "Use str.replaceAll(\"\\\\s+\", \"\") or str.replace(\" \", \"\") if only spaces.",
        explanation: "replaceAll with regex \\\\s removes all whitespace (spaces, tabs, newlines).",
        hint: "Also str = str.replace(\" \", \"\"); for spaces only.",
        level: "basic",
        codeExample: "String noSpaces = str.replaceAll(\"\\\\s+\", \"\");"
    },
    {
        question: "What is the difference between reversing a string and reversing words?",
        shortAnswer: "Reverse string flips character order; reverse words flips word order while preserving characters within words.",
        explanation: "Example: 'Hello World' reversed string: 'dlroW olleH'; reversed words: 'World Hello'.",
        hint: "Different problems, different solutions.",
        level: "basic",
        codeExample: "// reverse string: new StringBuilder(s).reverse()\n// reverse words: split, reverse array, join"
    },
    {
        question: "How to check if a string is a valid number (integer)?",
        shortAnswer: "Try parsing with Integer.parseInt() and catch NumberFormatException.",
        explanation: "Also use regex: str.matches(\"-?\\\\d+\") for optional sign and digits.",
        hint: "Be careful with large numbers.",
        level: "basic",
        codeExample: "try { Integer.parseInt(str); return true; } catch(NumberFormatException e) { return false; }"
    },
    {
        question: "How to find the first repeated character in a string?",
        shortAnswer: "Use a Set, add characters, first one that already exists is the answer.",
        explanation: "Iterate, if char already in set, return it; else add to set.",
        hint: "O(n) time, O(n) space.",
        level: "intermediate",
        codeExample: "Set<Character> seen = new HashSet<>();\nfor(char c : str.toCharArray()) {\n    if(seen.contains(c)) return c;\n    seen.add(c);\n}\nreturn null;"
    },
    {
        question: "How to convert a string to a character array and back?",
        shortAnswer: "Use toCharArray() to get array, new String(array) to convert back.",
        explanation: "This is common for mutable character manipulations.",
        hint: "Remember arrays are mutable.",
        level: "basic",
        codeExample: "char[] chars = str.toCharArray();\n// modify chars\nString newStr = new String(chars);"
    },
    {
        question: "How to check if two strings are permutations of each other?",
        shortAnswer: "Same as anagram: sort and compare or use frequency map.",
        explanation: "Permutation means same characters with same frequencies.",
        hint: "Length must be equal first.",
        level: "intermediate",
        codeExample: "if(s1.length() != s2.length()) return false;\nint[] count = new int[256];\nfor(char c : s1.toCharArray()) count[c]++;\nfor(char c : s2.toCharArray()) if(--count[c] < 0) return false;\nreturn true;"
    },
    {
        question: "How to find the longest common prefix among an array of strings?",
        shortAnswer: "Compare characters of first string with others, stop at first mismatch.",
        explanation: "Take first string as reference; for each index, check all strings have same char; if not, return prefix up to previous index.",
        hint: "Edge case: empty array returns empty string.",
        level: "advanced",
        codeExample: "if(strs.length == 0) return \"\";\nString prefix = strs[0];\nfor(int i=1; i<strs.length; i++) {\n    while(strs[i].indexOf(prefix) != 0) {\n        prefix = prefix.substring(0, prefix.length()-1);\n        if(prefix.isEmpty()) return \"\";\n    }\n}\nreturn prefix;"
    },
    {
        question: "How to generate all permutations of a string?",
        shortAnswer: "Use recursion: fix first character and permute the rest, or use backtracking.",
        explanation: "Number of permutations is n! (factorial), so only for small strings.",
        hint: "Consider using Heap's algorithm.",
        level: "expert",
        codeExample: "// Recursive backtracking\npublic void permute(String str, int l, int r) {\n    if(l == r) System.out.println(str);\n    else for(int i=l; i<=r; i++) {\n        str = swap(str, l, i);\n        permute(str, l+1, r);\n        str = swap(str, l, i);\n    }\n}"
    },
    {
        question: "How to count the number of times a substring appears in a string?",
        shortAnswer: "Use indexOf in a loop: int count=0, index=0; while((index=str.indexOf(sub, index))!=-1) { count++; index+=sub.length(); }",
        explanation: "Handles non-overlapping occurrences. For overlapping, increment by 1 instead of sub.length().",
        hint: "indexOf with fromIndex.",
        level: "intermediate",
        codeExample: "int count = 0, idx = 0;\nwhile((idx = str.indexOf(sub, idx)) != -1) {\n    count++;\n    idx += sub.length();\n}"
    },
    {
        question: "How to convert a string to title case (first letter of each word uppercase, rest lowercase)?",
        shortAnswer: "Split, capitalize first char, lowercase rest, then join.",
        explanation: "Use Character.toUpperCase() and Character.toLowerCase() or substring.",
        hint: "Watch for single-character words.",
        level: "intermediate",
        codeExample: "String[] words = str.split(\"\\\\s+\");\nStringBuilder sb = new StringBuilder();\nfor(String w : words) {\n    if(w.length() > 0) {\n        sb.append(Character.toUpperCase(w.charAt(0)));\n        if(w.length() > 1) sb.append(w.substring(1).toLowerCase());\n    }\n    sb.append(\" \");\n}\nreturn sb.toString().trim();"
    }
];

export default questions;