/**
 * Module 001_003: Topic 14: Implicit type casting in compound assignments (e.g. byte b = 5; b += 2;)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "Why does `byte b = 5; b = b + 2;` cause a compilation error, but `b += 2;` compiles successfully?",
    shortAnswer: "Because `b + 2` promotes `b` to `int` requiring an explicit cast, whereas `b += 2` has an implicit narrowing cast injected by the compiler: `b = (byte)(b + 2)`.",
    explanation: "JLS §15.26.2 mandates that compound assignments automatically insert a cast to the type of the left-hand variable.",
    hint: "b += 2 has an automatic (byte) cast inserted by compiler.",
    level: "basic",
    codeExample: "byte b = 5;\n// b = b + 2; // COMPILATION ERROR\nb += 2;        // Compiles as: b = (byte)(b + 2);"
  },
  {
    question: "What is the exact compiler expansion for `short s = 10; s *= 3.5;`?",
    shortAnswer: "`s = (short)(s * 3.5);`",
    explanation: "The compound operator performs the multiplication in `double` precision (`10 * 3.5 = 35.0`) and explicitly narrows the result to `short` (`35`).",
    hint: "s = (short)(s * 3.5).",
    level: "basic",
    codeExample: "short s = 10;\ns *= 3.5; // (short)(35.0) = 35"
  },
  {
    question: "What is the Silent Overflow Hazard in compound assignments?",
    shortAnswer: "When arithmetic operations exceed the range of narrow types, the implicit cast silently discards higher-order bits and wraps around without any compiler error or runtime exception.",
    explanation: "For example, `byte b = 127; b += 1;` silently results in `-128`.",
    hint: "Higher bits are silently truncated.",
    level: "intermediate",
    codeExample: "byte b = 127;\nb += 1; // b silently becomes -128!"
  },
  {
    question: "What is the result of `int x = 10; x += 4.9;` in Java?",
    shortAnswer: "`x = 14` (the fractional `.9` is silently truncated!).",
    explanation: "`x += 4.9` expands to `x = (int)(x + 4.9)` = `(int)(14.9)` = `14`.",
    hint: "Fractional part is truncated by (int) cast.",
    level: "basic",
    codeExample: "int x = 10;\nx += 4.9; // (int)(14.9) = 14"
  },
  {
    question: "What is the result of `short s = 32767; s += 1;` in Java?",
    shortAnswer: "`s = -32768` (`Short.MIN_VALUE`).",
    explanation: "32767 is `0x7FFF`. Adding 1 yields `0x8000`, which in two's complement 16-bit short is `-32768`.",
    hint: "Wraps to Short.MIN_VALUE.",
    level: "basic",
    codeExample: "short s = 32767;\ns += 1; // -32768"
  },
  {
    question: "What is the result of `char ch = 'A'; ch += 3;` in Java?",
    shortAnswer: "`ch = 'D'`.",
    explanation: "'A' has Unicode code point 65. `65 + 3 = 68`, which narrows to `(char)68` = `'D'`.",
    hint: "'A' (65) + 3 = 'D' (68).",
    level: "basic",
    codeExample: "char ch = 'A';\nch += 3; // 'D'"
  },
  {
    question: "What is the result of `byte b = 100; b += 300;`?",
    shortAnswer: "`b = -112`.",
    explanation: "`100 + 300 = 400`. In binary, `400` is `0x00000190`. Truncating to the lowest 8 bits gives `0x90` (144 unsigned, which in signed 8-bit two's complement is `144 - 256 = -112`).",
    hint: "400 wraps around to -112 in 8-bit signed byte.",
    level: "intermediate",
    codeExample: "byte b = 100;\nb += 300; // -112"
  },
  {
    question: "Does `long l = 100; l += 5;` perform a narrowing cast?",
    shortAnswer: "No, `l = (long)(l + 5)` performs a widening/identity cast because `long` is larger than `int`.",
    explanation: "The cast is generated for all types `T`, but narrowing only causes truncation when converting from a wider type to a narrower type.",
    hint: "Cast is to long, so no data truncation occurs.",
    level: "basic",
    codeExample: "long l = 100L;\nl += 5; // 105L"
  },
  {
    question: "Why should financial accounting applications (in ₹) avoid using compound assignments with mixed types like `int += double`?",
    shortAnswer: "Because `int += double` silently truncates fractional paise/cents, introducing silent rounding errors into balance sheets.",
    explanation: "Financial applications must use `BigDecimal` or maintain exact floating/long representations.",
    hint: "Silently drops decimal paise.",
    level: "intermediate",
    codeExample: "int fee = 1000;\nfee += 50.75; // fee becomes 1050 (0.75 lost!)"
  },
  {
    question: "What happens when using `b++` vs `b += 1` on a `byte b`?",
    shortAnswer: "Both compile cleanly and perform implicit narrowing casts to `byte`.",
    explanation: "Under the hood, both `b++` and `b += 1` preserve the `byte` type of `b`.",
    hint: "Both perform implicit casting to byte.",
    level: "basic",
    codeExample: "byte b = 1;\nb++;   // byte\nb += 1; // byte"
  },
  {
    question: "Can `float f = 10.5f; f += 2.5;` compile cleanly without explicit cast?",
    shortAnswer: "Yes! Even though `2.5` is a `double` literal, `f += 2.5` compiles cleanly as `f = (float)(f + 2.5)`.",
    explanation: "Compound assignment automatically casts the `double` calculation back to `float`.",
    hint: "f = (float)(f + 2.5).",
    level: "intermediate",
    codeExample: "float f = 10.5f;\nf += 2.5; // (float)(13.0) = 13.0f"
  },
  {
    question: "What happens if `double d = Double.MAX_VALUE; float f = 0.0f; f += d;` is executed?",
    shortAnswer: "`f` silently becomes `Float.POSITIVE_INFINITY` due to float overflow.",
    explanation: "The explicit cast `(float)Double.MAX_VALUE` overflows 32-bit float capacity, producing infinity.",
    hint: "Becomes Float.POSITIVE_INFINITY.",
    level: "advanced",
    codeExample: "float f = 0.0f;\nf += Double.MAX_VALUE; // Float.POSITIVE_INFINITY"
  },
  {
    question: "What is the result of `char c = 'z'; c += 1;`?",
    shortAnswer: "`c = '{'` (Unicode code point 123).",
    explanation: "'z' is 122. `122 + 1 = 123`, which corresponds to character `{`.",
    hint: "Next character '{' in ASCII table.",
    level: "basic",
    codeExample: "char c = 'z';\nc += 1; // '{'"
  },
  {
    question: "What is the result of `char c = Character.MAX_VALUE; c += 1;`?",
    shortAnswer: "`c = '\\u0000'` (the null character, code point `0`).",
    explanation: "`Character.MAX_VALUE` is `65535`. Adding 1 yields `65536`, which truncated to 16 bits becomes `0`.",
    hint: "Wraps to 0 (null char).",
    level: "advanced",
    codeExample: "char c = Character.MAX_VALUE;\nc += 1; // '\\u0000' (0)"
  },
  {
    question: "How can developers detect arithmetic overflow when using compound assignments?",
    shortAnswer: "By performing range validation before the assignment, or using Java 8+ `Math.addExact()` / `Math.multiplyExact()`.",
    explanation: "Compound assignments cannot throw overflow exceptions on their own.",
    hint: "Use Math.addExact() or range checks.",
    level: "intermediate",
    codeExample: "int total = Math.addExact(current, addition);"
  },
  {
    question: "What is the result of `byte b = -128; b -= 1;`?",
    shortAnswer: "`b = 127` (`Byte.MAX_VALUE`).",
    explanation: "Underflow wrap-around: subtracting 1 from minimum byte wraps to the maximum positive value.",
    hint: "Underflows to 127.",
    level: "intermediate",
    codeExample: "byte b = -128;\nb -= 1; // 127"
  },
  {
    question: "What is the result of `short s = -32768; s -= 1;`?",
    shortAnswer: "`s = 32767` (`Short.MAX_VALUE`).",
    explanation: "16-bit short underflow wraps to `32767`.",
    hint: "Underflows to 32767.",
    level: "intermediate",
    codeExample: "short s = -32768;\ns -= 1; // 32767"
  },
  {
    question: "Why is `byte b = 0; b += 1.99;` dangerous in loop counters?",
    shortAnswer: "Because `1.99` is truncated to `1`, which might differ from the developer's expectation of floating-point accumulation.",
    explanation: "Truncation alters the mathematical increment value.",
    hint: "1.99 is truncated to integer 1.",
    level: "intermediate",
    codeExample: "byte b = 0;\nb += 1.99; // b is 1"
  },
  {
    question: "What is the result of `int x = 10; x /= 2.5;`?",
    shortAnswer: "`x = 4`.",
    explanation: "`10 / 2.5 = 4.0`. Narrowing `(int)4.0` yields `4`.",
    hint: "(int)(10 / 2.5) = (int)(4.0) = 4.",
    level: "basic",
    codeExample: "int x = 10;\nx /= 2.5; // 4"
  },
  {
    question: "What is the result of `int x = 10; x /= 3.0;`?",
    shortAnswer: "`x = 3`.",
    explanation: "`10 / 3.0 = 3.3333333333333335`. Narrowing `(int)3.333...` yields `3`.",
    hint: "(int)(3.333) = 3.",
    level: "basic",
    codeExample: "int x = 10;\nx /= 3.0; // 3"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student lab tracker, how are session overflows prevented?",
    shortAnswer: "By checking if `(currentSessions + newSessions) > Byte.MAX_VALUE` before applying `+=`.",
    explanation: "Pre-condition boundary auditing prevents silent wrap-around to negative attendance counts.",
    hint: "Pre-validation before compound assignment.",
    level: "basic",
    codeExample: "if (current + add > 127) { /* Alert */ }"
  },
  {
    question: "Does the Java compiler issue any warning when compound assignment overflows?",
    shortAnswer: "No! The compiler treats the narrowing cast as explicit programmer intent.",
    explanation: "Because `E1 op= E2` expands to `(T)(...)`, the cast suppresses compiler type-safety warnings.",
    hint: "No warning; cast is treated as explicit.",
    level: "intermediate",
    codeExample: "byte b = 127;\nb += 1; // Zero compiler warnings!"
  },
  {
    question: "What is the result of `byte b = 10; b *= 20;`?",
    shortAnswer: "`b = -56` (since `200` wraps around in 8-bit signed byte).",
    explanation: "`10 * 20 = 200`. In signed 8-bit byte: `200 - 256 = -56`.",
    hint: "200 - 256 = -56.",
    level: "intermediate",
    codeExample: "byte b = 10;\nb *= 20; // -56"
  },
  {
    question: "Can compound assignment be used to cast `Object` references?",
    shortAnswer: "Only with `+=` on `String` (e.g. `String s = \"Hi\"; s += new Object();`).",
    explanation: "String concatenation converts the object to String via `String.valueOf()`.",
    hint: "Only String += Object.",
    level: "intermediate",
    codeExample: "String s = \"Item: \";\ns += 123; // \"Item: 123\""
  },
  {
    question: "What happens when `byte b = 50; b += b;` is executed?",
    shortAnswer: "`b = 100`.",
    explanation: "`50 + 50 = 100`, which is within the valid range `[-128, 127]`.",
    hint: "50 + 50 = 100.",
    level: "basic",
    codeExample: "byte b = 50;\nb += b; // 100"
  },
  {
    question: "What happens when `byte b = 70; b += b;` is executed?",
    shortAnswer: "`b = -116`.",
    explanation: "`70 + 70 = 140`. `140 - 256 = -116`.",
    hint: "140 wraps to -116.",
    level: "basic",
    codeExample: "byte b = 70;\nb += b; // -116"
  },
  {
    question: "What is the recommended primitive type for counters in general enterprise Java code?",
    shortAnswer: "`int` or `long`.",
    explanation: "`byte` and `short` offer no performance benefit on modern 64-bit CPUs and introduce silent overflow risks.",
    hint: "Use int or long for counters.",
    level: "basic",
    codeExample: "int attendanceCounter = 0;"
  },
  {
    question: "What is the bytecode instruction generated for `byte b = 5; b += 2;`?",
    shortAnswer: "`iadd` followed by `i2b` (integer to byte narrowing instruction).",
    explanation: "The JVM promotes to int, adds, and explicitly truncates back to byte with `i2b`.",
    hint: "iadd followed by i2b.",
    level: "expert",
    codeExample: "// Bytecode: iload, iconst, iadd, i2b, istore"
  },
  {
    question: "What is the ultimate takeaway of Topic 14 for Java developers?",
    shortAnswer: "Compound assignments automatically insert narrowing casts (`E1 = (T)(E1 op E2)`), making code concise but requiring vigilance against silent bit truncation, decimal loss, and overflow wrap-arounds.",
    explanation: "Understanding implicit narrowing in compound assignments ensures defensive coding against corrupting counters and financial values.",
    hint: "Convenience with implicit cast, but beware of silent overflow.",
    level: "basic",
    codeExample: "// Summary: b += 2 inserts (byte) cast silently, risk of silent wrap-around"
  },
  {
    question: "What is the next topic (Topic 15) in Module 001_003?",
    shortAnswer: "Ternary / Conditional operator (? :) syntax and nested ternary expressions.",
    explanation: "Topic 15 explores the inline conditional operator `condition ? expr1 : expr2`, type promotion in branches, and nesting best practices.",
    hint: "Ternary conditional operator.",
    level: "basic",
    codeExample: "// Topic 15: ? :"
  }
];

export default questions;
