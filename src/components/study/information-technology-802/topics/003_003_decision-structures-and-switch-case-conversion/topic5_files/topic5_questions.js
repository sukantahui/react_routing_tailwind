const topic5_questions = [
  {
    id: 1,
    question: "In NetBeans GUI applications, what is the return type of the Swing method `jTextField1.getText()`?",
    options: [
      "java.lang.String",
      "int",
      "double",
      "char[]"
    ],
    correctAnswer: 0,
    explanation: "In Java Swing, `getText()` on a `JTextField` strictly returns the contents of the component as a `java.lang.String`.",
    explanationBn: "জাভা সুইং-এ `JTextField`-এর `getText()` মেথডটি ফিল্ডের মধ্যকার সমস্ত মান একটি `String` হিসেবে ফেরত দেয়।",
    hint: "getText() always returns a String."
  },
  {
    id: 2,
    question: "Which Java method is used to convert the String obtained from `jTextField1.getText()` into an integer for a numeric `switch(w)`?",
    options: [
      "Integer.parseInt(jTextField1.getText())",
      "Integer.toString(jTextField1.getText())",
      "(int)jTextField1.getText()",
      "jTextField1.getInt()"
    ],
    correctAnswer: 0,
    explanation: "`Integer.parseInt(...)` parses the string argument as a signed decimal integer. Direct casting `(int)string` is illegal in Java.",
    explanationBn: "স্ট্রিংকে পূর্ণসংখ্যায় রূপান্তর করতে `Integer.parseInt(...)` ব্যবহার করা হয়। স্ট্রিংকে সরাসরি `(int)` দিয়ে কাস্ট করা যায় না।",
    hint: "Integer.parseInt() converts string to int."
  },
  {
    id: 3,
    question: "Given the GUI slab code:\nif (w == 5) pay = w * 20;\nelse if (w == 8) pay = w * 26;\nelse pay = w * 40;\nWhat is `pay` when `w = 5`?",
    options: [
      "100",
      "130",
      "200",
      "26"
    ],
    correctAnswer: 0,
    explanation: "`w = 5` matches the first condition: `pay = 5 * 20 = 100`.",
    explanationBn: "w = ৫ প্রথম শর্ত মেলায় `pay = ৫ * ২০ = ১০০` হয়।",
    hint: "5 * 20 = 100."
  },
  {
    id: 4,
    question: "In the same billing code, what is `pay` when `w = 8`?",
    options: [
      "208",
      "200",
      "160",
      "26"
    ],
    correctAnswer: 0,
    explanation: "`w = 8` matches the second branch: `pay = 8 * 26 = 208`.",
    explanationBn: "w = ৮ দ্বিতীয় শর্ত মেলায় `pay = ৮ * ২৬ = ২০৮` হয়।",
    hint: "8 * 26 = 208."
  },
  {
    id: 5,
    question: "In the same billing code, what is `pay` when `w = 12`?",
    options: [
      "480",
      "240",
      "312",
      "40"
    ],
    correctAnswer: 0,
    explanation: "`w = 12` matches neither 5 nor 8, so it falls into `else`: `pay = 12 * 40 = 480`.",
    explanationBn: "w = ১২ কোনো শর্তের সাথে না মেলায় else ব্লকে গিয়ে `pay = ১২ * ৪০ = ৪৮০` হয়।",
    hint: "12 * 40 = 480."
  },
  {
    id: 6,
    question: "When rewriting this billing logic into a `switch`, what is the correct syntax for `w == 5`?",
    options: [
      "case 5:\n  pay = w * 20;\n  break;",
      "case w == 5:\n  pay = w * 20;\n  break;",
      "case (5) -> pay = w * 20;",
      "case 5; pay = w * 20;"
    ],
    correctAnswer: 0,
    explanation: "The case label takes only the constant value `5` followed by a colon (`:`), the assignment statement, and `break;`.",
    explanationBn: "কেস লেবেলে শুধুমাত্র মান ৫ ও কোলন বসে, এর নিচে স্টেটমেন্ট এবং শেষে `break;` বসে।",
    hint: "case 5: followed by pay = w * 20; break;"
  },
  {
    id: 7,
    question: "Why should `double pay = 0.0;` be declared BEFORE entering the `switch` block in a GUI button event?",
    options: [
      "So that `pay` remains in scope when updating `jTextField2.setText(\"\" + pay);` after the switch ends.",
      "Because switch blocks cannot modify variables.",
      "Because Swing requires all variables to be global.",
      "To prevent division by zero."
    ],
    correctAnswer: 0,
    explanation: "A variable declared inside a switch case has local block scope and cannot be accessed outside the switch to update the GUI text field.",
    explanationBn: "সুইচের ভেতরে ঘোষিত চলকের পরিধি বাইরে থাকে না। তাই সুইচের বাইরে টেক্সটফিল্ডে ফলাফল প্রদর্শন করতে চলকটি সুইচের আগেই ঘোষণা করতে হয়।",
    hint: "Variable scope outside the switch."
  },
  {
    id: 8,
    question: "What happens if a user types \"ten\" instead of \"10\" into `jTextField1` and clicks the calculate button?",
    options: [
      "A java.lang.NumberFormatException is thrown at runtime by Integer.parseInt().",
      "The switch statement enters the default case automatically.",
      "It assigns 0 to w.",
      "The program changes \"ten\" to 10."
    ],
    correctAnswer: 0,
    explanation: "`Integer.parseInt()` cannot parse non-numeric strings and throws a `NumberFormatException` before the switch statement is ever reached.",
    explanationBn: "`Integer.parseInt()` অ-সাংখ্যিক স্ট্রিং পেলে রানটাইমে `NumberFormatException` ছুড়ে দেয়। সুইচে যাওয়ার আগেই এই ত্রুটি ঘটে।",
    hint: "Non-numeric strings trigger NumberFormatException."
  },
  {
    id: 9,
    question: "How can a developer defensively prevent a GUI application from crashing when invalid text is entered in `jTextField1`?",
    options: [
      "By wrapping `Integer.parseInt(...)` inside a `try-catch(NumberFormatException e)` block.",
      "By using while loops.",
      "By removing the default case.",
      "By changing int to float."
    ],
    correctAnswer: 0,
    explanation: "Enclosing the parsing code in a `try-catch` block catches the `NumberFormatException` and allows displaying a friendly `JOptionPane` alert without crashing.",
    explanationBn: "পার্সিং কোডটিকে `try-catch(NumberFormatException e)` ব্লকে রাখলে ক্র্যাশ না হয়ে ব্যবহারকারীকে সুন্দর সতর্কবার্তা দেখানো যায়।",
    hint: "Use try-catch block."
  },
  {
    id: 10,
    question: "Which of the following statements correctly displays the calculated numerical `pay` in `jTextField2`?",
    options: [
      "jTextField2.setText(\"\" + pay);",
      "jTextField2.setText(pay);",
      "jTextField2.getText(pay);",
      "jTextField2.setValue(pay);"
    ],
    correctAnswer: 0,
    explanation: "`setText()` expects a `String`. Passing `\"\" + pay` concatenates the number into a string. Passing a raw number like `jTextField2.setText(pay);` causes a compile error.",
    explanationBn: "`setText()` শুধুমাত্র স্ট্রিং গ্রহণ করে। `\"\" + pay` সংখ্যাকে স্ট্রিংয়ে রূপান্তর করে সঠিকভাবে প্রদর্শন করে।",
    hint: "Convert number to string using \"\" + pay."
  },
  {
    id: 11,
    question: "What is the equivalent switch statement for the trailing `else { pay = w * 40; }`?",
    options: [
      "default:\n  pay = w * 40;\n  break;",
      "case else:\n  pay = w * 40;\n  break;",
      "else:\n  pay = w * 40;\n  break;",
      "case 40:\n  pay = w * 40;\n  break;"
    ],
    correctAnswer: 0,
    explanation: "The trailing unconditional `else` translates directly into the `default:` clause of the switch statement.",
    explanationBn: "শর্তহীন শেষ `else` শাখাটি সুইচে `default:` ক্লজে রূপান্তরিত হয়।",
    hint: "else becomes default:."
  },
  {
    id: 12,
    question: "In NetBeans Swing GUI forms, what event listener handles button clicks on `jButton1`?",
    options: [
      "java.awt.event.ActionListener (method: `actionPerformed`)",
      "java.awt.event.MouseMotionListener",
      "java.awt.event.KeyListener",
      "java.awt.event.WindowListener"
    ],
    correctAnswer: 0,
    explanation: "In Java Swing, button clicks generate an `ActionEvent` which is handled by the `actionPerformed` method of `ActionListener`.",
    explanationBn: "সুইং-এ বোতামের ক্লিকে `ActionEvent` তৈরি হয় যা `ActionListener`-এর `actionPerformed` মেথড দ্বারা পরিচালিত হয়।",
    hint: "ActionListener and actionPerformed."
  },
  {
    id: 13,
    question: "If `jTextField1` is left blank (empty string `\"\"`), what does `Integer.parseInt(jTextField1.getText())` do?",
    options: [
      "Throws java.lang.NumberFormatException: For input string: \"\"",
      "Returns 0",
      "Returns -1",
      "Compiles into null"
    ],
    correctAnswer: 0,
    explanation: "An empty string `\"\"` is not a valid integer representation, so `Integer.parseInt()` throws a `NumberFormatException`.",
    explanationBn: "ফাঁকা স্ট্রিং কোনো বৈধ পূর্ণসংখ্যা না হওয়ায় `Integer.parseInt()` রানটাইমে `NumberFormatException` নিক্ষেপ করে।",
    hint: "Empty string causes NumberFormatException."
  },
  {
    id: 14,
    question: "Consider this converted switch snippet without `break`:\nswitch(w) {\n  case 5: pay = w * 20;\n  case 8: pay = w * 26;\n  default: pay = w * 40;\n}\nIf the user inputs `5`, what will `jTextField2` display?",
    options: [
      "200 (because 5 * 40 executed in default after falling through)",
      "100",
      "130",
      "208"
    ],
    correctAnswer: 0,
    explanation: "Because `break;` is missing, `case 5:` sets `pay = 100`, then falls through into `case 8:` (`pay = 130`), then falls through into `default:` setting `pay = 5 * 40 = 200`!",
    explanationBn: "`break;` না থাকায় কেস ৫-এর পর কেস ৮ এবং শেষে default চলে গিয়ে pay-এর মান ৫ * ৪০ = ২০০ করে দেবে!",
    hint: "Fall-through overwrites pay with the default calculation."
  },
  {
    id: 15,
    question: "What GUI method is used to clear `jTextField1` after a calculation?",
    options: [
      "jTextField1.setText(\"\");",
      "jTextField1.clear();",
      "jTextField1.delete();",
      "jTextField1.reset();"
    ],
    correctAnswer: 0,
    explanation: "In Java Swing, setting the text to an empty string `jTextField1.setText(\"\");` clears the field.",
    explanationBn: "`jTextField1.setText(\"\");` কল করে টেক্সটফিল্ডের লেখা মুছে পরিষ্কার করা হয়।",
    hint: "setText(\"\") clears the textfield."
  },
  {
    id: 16,
    question: "How can leading and trailing whitespaces be eliminated from a textfield before parsing?",
    options: [
      "jTextField1.getText().trim()",
      "jTextField1.getText().stripSpaces()",
      "jTextField1.trimText()",
      "jTextField1.clean()"
    ],
    correctAnswer: 0,
    explanation: "The `trim()` method of `java.lang.String` removes accidental leading and trailing whitespace characters that would otherwise cause `NumberFormatException`.",
    explanationBn: "`String`-এর `trim()` মেথডটি অপ্রয়োজনীয় আগের ও পরের ফাঁকা স্থান মুছে ফেলে পার্সিংকে নিরাপদ করে।",
    hint: "Use .trim() on the String."
  },
  {
    id: 17,
    question: "In vocational billing apps (e.g. municipal water billing in Barrackpore), why is `switch` preferred for slab codes?",
    options: [
      "It clearly distinguishes fixed category tariff codes (e.g. 1: Domestic, 2: Commercial, 3: Industrial) with individual calculation formulas.",
      "It uses less electrical power.",
      "It eliminates the need for database tables.",
      "It speeds up monitor refresh rate."
    ],
    correctAnswer: 0,
    explanation: "Billing codes represent discrete categories where tariffs change based on category type, mapping perfectly to switch cases.",
    explanationBn: "বিলিং কোডগুলো নির্দিষ্ট ক্যাটাগরি (যেমন ১: পারিবারিক, ২: বাণিজ্যিক) নির্দেশ করে যা সুইচের কেস হিসেবে সাজানো সবচেয়ে আদর্শ।",
    hint: "Discrete category codes map to switch cases."
  },
  {
    id: 18,
    question: "What is the output of `Double.toString(100.0)` in Java?",
    options: [
      "\"100.0\"",
      "100",
      "\"100\"",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "`Double.toString(100.0)` converts the double primitive into its exact string representation `\"100.0\"`.",
    explanationBn: "`Double.toString(100.0)` ডাবল মানটিকে স্ট্রিং `\"100.0\"`-এ রূপান্তর করে।",
    hint: "Double.toString converts double to String."
  },
  {
    id: 19,
    question: "What is the purpose of `jTextField2.setEditable(false);` in NetBeans GUI design?",
    options: [
      "To prevent the user from manually typing or altering the calculated bill amount in the result field.",
      "To hide the textfield completely.",
      "To disable the calculate button.",
      "To make the field bold."
    ],
    correctAnswer: 0,
    explanation: "`setEditable(false)` locks the textfield so that users cannot tamper with calculated output values.",
    explanationBn: "`setEditable(false)` টেক্সটফিল্ডকে লক করে দেয় যাতে ব্যবহারকারী ফলাফল নিজের মতো পরিবর্তন করতে না পারে।",
    hint: "Makes textfield read-only."
  },
  {
    id: 20,
    question: "Given a billing problem with slabs `w == 10` (rate 5), `w == 20` (rate 8), and other (rate 12). If `w = 20`, what is `pay = w * rate`?",
    options: [
      "160",
      "100",
      "240",
      "200"
    ],
    correctAnswer: 0,
    explanation: "`w = 20` matches rate 8. `pay = 20 * 8 = 160`.",
    explanationBn: "w = ২০ এর জন্য রেট ৮; তাই `pay = ২০ * ৮ = ১৬০`।",
    hint: "20 * 8 = 160."
  },
  {
    id: 21,
    question: "In NetBeans, how is a dialog box created to notify the user of an invalid slab in `default`?",
    options: [
      "JOptionPane.showMessageDialog(this, \"Invalid Slab Entered!\");",
      "System.alert(\"Invalid Slab!\");",
      "JFrame.showError(\"Invalid!\");",
      "Dialog.print(\"Invalid!\");"
    ],
    correctAnswer: 0,
    explanation: "`JOptionPane.showMessageDialog(...)` is the standard Swing method to display modal popup alert dialogs.",
    explanationBn: "সুইং অ্যাপ্লিকেশনে পপ-আপ অ্যালার্ট মেসেজ দেখাতে `JOptionPane.showMessageDialog(...)` ব্যবহার করা হয়।",
    hint: "JOptionPane.showMessageDialog."
  },
  {
    id: 22,
    question: "What happens if `w` is declared as an `int`, but the user inputs a decimal like `5.5` in `jTextField1`?",
    options: [
      "Integer.parseInt() throws a NumberFormatException because 5.5 has a decimal point.",
      "It automatically rounds 5.5 to 5.",
      "It truncates 5.5 to 6.",
      "It compiles into 5.5."
    ],
    correctAnswer: 0,
    explanation: "`Integer.parseInt()` only parses integer digits; encountering a `.` causes an immediate `NumberFormatException`.",
    explanationBn: "`Integer.parseInt()` শুধুমাত্র পূর্ণসংখ্যা পড়তে পারে; দশমিক বিন্দু `.` পেলে `NumberFormatException` ঘটে।",
    hint: "Integer.parseInt() rejects decimal points."
  },
  {
    id: 23,
    question: "If weight `w` could have decimal values like 5.5, what method should be used instead of `Integer.parseInt()`?",
    options: [
      "Double.parseDouble(jTextField1.getText())",
      "Integer.parseDouble()",
      "String.toDouble()",
      "Math.round()"
    ],
    correctAnswer: 0,
    explanation: "`Double.parseDouble(...)` parses strings containing decimal points into `double` values.",
    explanationBn: "দশমিকযুক্ত সংখ্যার ক্ষেত্রে `Double.parseDouble(...)` ব্যবহার করতে হয়।",
    hint: "Double.parseDouble for decimals."
  },
  {
    id: 24,
    question: "Can you directly switch on `double w = Double.parseDouble(...)` in Java?",
    options: [
      "No, switch on `double` is strictly illegal in Java.",
      "Yes, modern Java allows double switches.",
      "Only if cases are whole numbers.",
      "Only in NetBeans 12."
    ],
    correctAnswer: 0,
    explanation: "Even if `w` is parsed as a `double`, Java does not permit floating-point switch expressions. The student must use integer codes for switch.",
    explanationBn: "w ডাবল হলেও জাভায় ডাবলের ওপর সুইচ করা নিষিদ্ধ। সুইচের জন্য ইনটিজার কোড ব্যবহার করতে হয়।",
    hint: "Doubles cannot be switch expressions."
  },
  {
    id: 25,
    question: "In the CBSE IT-802 practical marking scheme, what are the three components evaluated in a GUI button conversion task?",
    options: [
      "1) Correct parsing of input from textfield; 2) Accurate switch structure with breaks; 3) Proper string display in output field.",
      "1) Screen brightness; 2) Font size; 3) RAM speed.",
      "1) Database password; 2) Wi-Fi connection; 3) Web browser.",
      "1) HTML export; 2) CSS styling; 3) Python bridge."
    ],
    correctAnswer: 0,
    explanation: "Examiners verify that the student correctly retrieves/parses textfield data, builds an accurate switch block with breaks and default, and writes the computed output back to the UI.",
    explanationBn: "ব্যবহারিক মার্কিংয়ে টেক্সটফিল্ড থেকে ইনপুট পার্সিং, ব্রেকসহ নিখুঁত সুইচ গঠন এবং আউটপুট ফিল্ডে সঠিক প্রদর্শন যাচাই করা হয়।",
    hint: "Input parsing, switch logic with breaks, and output display."
  }
];

export default topic5_questions;
