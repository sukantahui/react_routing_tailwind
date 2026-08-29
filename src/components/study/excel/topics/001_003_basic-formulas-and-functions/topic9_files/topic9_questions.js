const questions = [
  {
    question: "Which Excel function is specifically designed to convert a number from one measurement system to another (e.g., Celsius to Fahrenheit, meters to feet)?",
    options: [
      "TRANSFORM()",
      "CONVERT()",
      "UNIT()",
      "METRIC()"
    ],
    correctAnswer: 1,
    explanation: "CONVERT(number, from_unit, to_unit) converts a number from one measurement unit to another across distance, weight, thermodynamics, pressure, force, energy, power, magnetism, time, and speed."
  },
  {
    question: "What will =CONVERT(100, \"C\", \"F\") return in Excel?",
    options: [
      "100",
      "212",
      "180",
      "32"
    ],
    correctAnswer: 1,
    explanation: "100 degrees Celsius converts to 212 degrees Fahrenheit via the formula (100 * 9/5) + 32 = 212."
  },
  {
    question: "Which unit string represents kilometers in the CONVERT function?",
    options: [
      "\"km\"",
      "\"kilo\"",
      "\"k-m\"",
      "\"k_meter\""
    ],
    correctAnswer: 0,
    explanation: "In CONVERT, \"km\" is the standard unit string for kilometers, combining the metric prefix \"k\" (kilo) with \"m\" (meter)."
  },
  {
    question: "What error does CONVERT return if the from_unit and to_unit belong to incompatible measurement categories (e.g., converting meters to kilograms)?",
    options: [
      "#VALUE!",
      "#N/A",
      "#REF!",
      "#NUM!"
    ],
    correctAnswer: 1,
    explanation: "CONVERT returns #N/A when unit types are incompatible or if a unit string is not recognized by Excel's measurement engine."
  },
  {
    question: "What does the BITAND function perform in Excel?",
    options: [
      "A logical AND between two Boolean conditions",
      "A bitwise AND operation on the binary representations of two integers",
      "Concatenates binary strings with an ampersand",
      "Sums only the even bits of a number"
    ],
    correctAnswer: 1,
    explanation: "BITAND(number1, number2) returns a decimal number representing the bitwise AND of the binary representations of two non-negative integers."
  },
  {
    question: "What is the result of =BITAND(6, 3)?",
    options: [
      "2",
      "7",
      "3",
      "0"
    ],
    correctAnswer: 0,
    explanation: "In binary, 6 is 110_2 and 3 is 011_2. The bitwise AND is (110 AND 011) = 010_2, which equals 2 in decimal."
  },
  {
    question: "What is the result of =BITOR(6, 3)?",
    options: [
      "7",
      "2",
      "9",
      "5"
    ],
    correctAnswer: 0,
    explanation: "In binary, 6 is 110_2 and 3 is 011_2. The bitwise OR is (110 OR 011) = 111_2, which equals 7 in decimal."
  },
  {
    question: "What is the result of =BITXOR(6, 3)?",
    options: [
      "5",
      "7",
      "2",
      "1"
    ],
    correctAnswer: 0,
    explanation: "In binary, 6 is 110_2 and 3 is 011_2. Bitwise XOR outputs 1 where bits differ: (110 XOR 011) = 101_2, which is 5 in decimal."
  },
  {
    question: "What does =BITLSHIFT(4, 2) evaluate to in Excel?",
    options: [
      "16",
      "8",
      "2",
      "1"
    ],
    correctAnswer: 0,
    explanation: "BITLSHIFT(number, shift_amount) shifts bits left by shift_amount, multiplying by 2^shift_amount: 4 * 2^2 = 4 * 4 = 16."
  },
  {
    question: "What does =BITRSHIFT(16, 2) evaluate to in Excel?",
    options: [
      "4",
      "8",
      "32",
      "64"
    ],
    correctAnswer: 0,
    explanation: "BITRSHIFT(number, shift_amount) shifts bits right by shift_amount, performing integer division by 2^shift_amount: 16 / 2^2 = 16 / 4 = 4."
  },
  {
    question: "Which function converts a binary text string (e.g., \"1010\") to a decimal integer?",
    options: [
      "BIN2DEC()",
      "DEC2BIN()",
      "BASE2DEC()",
      "PARSEBIN()"
    ],
    correctAnswer: 0,
    explanation: "BIN2DEC(number) converts a binary number (up to 10 bits in two's complement) to its decimal equivalent."
  },
  {
    question: "What is the result of =BIN2DEC(\"1111\")?",
    options: [
      "15",
      "16",
      "14",
      "1111"
    ],
    correctAnswer: 0,
    explanation: "In binary, 1111_2 = 1*(8) + 1*(4) + 1*(2) + 1*(1) = 15."
  },
  {
    question: "What does =DEC2HEX(255) return in Excel?",
    options: [
      "\"FF\"",
      "\"FE\"",
      "\"100\"",
      "\"AA\""
    ],
    correctAnswer: 0,
    explanation: "Decimal 255 converts to hexadecimal \"FF\" because 15*(16) + 15 = 255."
  },
  {
    question: "What is the purpose of the optional second argument [places] in =DEC2HEX(10, 4)?",
    options: [
      "Specifies decimal precision",
      "Pads the output string with leading zeros to meet the minimum character width (\"000A\")",
      "Sets the exponent power",
      "Rounds to the nearest multiple of 4"
    ],
    correctAnswer: 1,
    explanation: "The [places] argument pads the returned hexadecimal text string with leading zeros to guarantee a fixed width (e.g. \"000A\")."
  },
  {
    question: "What is the maximum positive decimal value BIN2DEC can convert using its standard 10-bit two's complement format?",
    options: [
      "511",
      "1023",
      "255",
      "127"
    ],
    correctAnswer: 0,
    explanation: "In Excel's 10-bit binary conversion functions, the 10th bit is the sign bit. The maximum positive 9-bit magnitude is 0111111111_2 = 511."
  },
  {
    question: "How does Excel interpret a 10-bit binary number with a leading 1 in BIN2DEC (e.g. =BIN2DEC(\"1111111111\"))?",
    options: [
      "-1 (Two's complement representation)",
      "1023",
      "#NUM! error",
      "0"
    ],
    correctAnswer: 0,
    explanation: "The most significant bit (10th bit) acts as the sign bit; \"1111111111\" represents -1 in two's complement notation."
  },
  {
    question: "Which unit abbreviation in CONVERT converts pounds (mass) to kilograms?",
    options: [
      "=CONVERT(A2, \"lbm\", \"kg\")",
      "=CONVERT(A2, \"pound\", \"kilo\")",
      "=CONVERT(A2, \"lb\", \"k\")",
      "=CONVERT(A2, \"lbs\", \"kgm\")"
    ],
    correctAnswer: 0,
    explanation: "In CONVERT, \"lbm\" represents pound mass and \"kg\" represents kilograms."
  },
  {
    question: "Which unit string is used in CONVERT for converting pressure in atmospheres to Pascals?",
    options: [
      "=CONVERT(1, \"atm\", \"Pa\")",
      "=CONVERT(1, \"atmosphere\", \"pascal\")",
      "=CONVERT(1, \"bar\", \"p\")",
      "=CONVERT(1, \"psi\", \"newton\")"
    ],
    correctAnswer: 0,
    explanation: "CONVERT(1, \"atm\", \"Pa\") converts 1 atmosphere of pressure to 101,325 Pascals."
  },
  {
    question: "How can you test if the 3rd bit (weight 4) is set in a hardware status register stored in cell A2?",
    options: [
      "=BITAND(A2, 4) = 4",
      "=BITAND(A2, 3) = 3",
      "=BITOR(A2, 4) > 0",
      "=BITXOR(A2, 3) = 0"
    ],
    correctAnswer: 0,
    explanation: "Bitwise masking with BITAND(A2, 4) returns 4 if the 3rd bit (2^2 = 4) is set, and 0 if it is clear."
  },
  {
    question: "What happens if a negative number is passed to BITAND, BITOR, or BITXOR?",
    options: [
      "Returns #NUM! error",
      "Evaluates using 64-bit two's complement",
      "Returns #VALUE! error",
      "Treats the number as 0"
    ],
    correctAnswer: 0,
    explanation: "Excel's bitwise functions require non-negative integers (>= 0); passing a negative number produces a #NUM! error."
  },
  {
    question: "What is the maximum integer limit for inputs to BITAND, BITOR, and BITXOR?",
    options: [
      "2^48 - 1 (281,474,976,710,655)",
      "2^31 - 1",
      "2^16 - 1",
      "2^64 - 1"
    ],
    correctAnswer: 0,
    explanation: "Excel bitwise functions support integers from 0 up to (2^48 - 1), supporting 48-bit unsigned integer operations."
  },
  {
    question: "Which function converts a hexadecimal string (e.g. \"1A\") to binary?",
    options: [
      "HEX2BIN()",
      "HEX2DEC()",
      "CONVERTHEX()",
      "PARSEHEX()"
    ],
    correctAnswer: 0,
    explanation: "HEX2BIN(\"1A\") converts hexadecimal \"1A\" to binary \"11010\"."
  },
  {
    question: "What does =HEX2DEC(\"FF\") return?",
    options: [
      "255",
      "256",
      "100",
      "15"
    ],
    correctAnswer: 0,
    explanation: "Hexadecimal \"FF\" is 15*16 + 15 = 255 in decimal."
  },
  {
    question: "What unit string is used in CONVERT to convert statute miles to nautical miles?",
    options: [
      "=CONVERT(100, \"mi\", \"Nmi\")",
      "=CONVERT(100, \"mile\", \"nautical\")",
      "=CONVERT(100, \"sm\", \"nm\")",
      "=CONVERT(100, \"miles\", \"sea_mile\")"
    ],
    correctAnswer: 0,
    explanation: "In CONVERT, \"mi\" is statute mile and \"Nmi\" is nautical mile."
  },
  {
    question: "Which prefix can be added to standard CONVERT units to scale by mega (10^6)?",
    options: [
      "\"M\" (e.g., \"Mbyte\", \"MJ\")",
      "\"mega_\"",
      "\"MEG\"",
      "\"m\""
    ],
    correctAnswer: 0,
    explanation: "Uppercase \"M\" serves as the Mega (10^6) multiplier prefix; lowercase \"m\" is the milli (10^-3) prefix."
  },
  {
    question: "What does =BITXOR(A2, A2) always return for any non-negative integer in A2?",
    options: [
      "0",
      "A2",
      "1",
      "-1"
    ],
    correctAnswer: 0,
    explanation: "Any number XORed with itself results in 0 because all identical bit pairs produce 0."
  },
  {
    question: "How do you toggle (flip) the lowest 4 bits of an 8-bit integer in cell A2?",
    options: [
      "=BITXOR(A2, 15)",
      "=BITAND(A2, 15)",
      "=BITOR(A2, 15)",
      "=BITLSHIFT(A2, 4)"
    ],
    correctAnswer: 0,
    explanation: "XORing with 15 (binary 00001111) flips the lowest 4 bits while preserving the upper bits."
  },
  {
    question: "What does =CONVERT(1, \"day\", \"sec\") evaluate to?",
    options: [
      "86400",
      "3600",
      "1440",
      "864000"
    ],
    correctAnswer: 0,
    explanation: "1 day contains 24 hours * 60 minutes * 60 seconds = 86,400 seconds."
  },
  {
    question: "Why should binary and hexadecimal text inputs to functions like BIN2DEC and HEX2DEC be supplied in quotes when writing formulas?",
    options: [
      "To prevent Excel from misinterpreting hexadecimal letters (like A-F) as cell references or names",
      "Because Excel only accepts text formatting for engineering functions",
      "To enable automatic caching",
      "To prevent division by zero"
    ],
    correctAnswer: 0,
    explanation: "Supplying hex values in quotes (e.g. \"FF\", \"1A\") prevents Excel's parser from mistaking them for column letters or range names."
  },
  {
    question: "What is the primary advantage of using bitwise functions in financial and permission modeling in Excel?",
    options: [
      "They allow packing up to 48 independent binary permission flags into a single compact integer cell",
      "They calculate faster than simple addition",
      "They automatically encrypt the workbook",
      "They eliminate circular references"
    ],
    correctAnswer: 0,
    explanation: "Bitwise masking enables encoding dozens of Boolean attributes (Read, Write, Execute, Admin, Audit) into a single compact numeric status code, saving memory and simplifying multi-flag validation."
  }
];

export default questions;
