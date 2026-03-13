import os
import json

# ============================================
# Helper function to generate explanations
# ============================================
def generate_explanations(project, code):
    """
    Returns a tuple (logicExplanation, codeExplanation) for the given project.
    Uses the project title to produce descriptive text.
    """
    title = project["title"]

    # Map titles to explanations
    if "Hello, World" in title:
        logic = "A basic program to print a message, demonstrating the structure of a C program."
        code_exp = "Includes stdio.h, defines main(), uses printf to output text, and returns 0."
    elif "Variables and Format Specifiers" in title:
        logic = "Declare variables of different types and print them using appropriate format specifiers."
        code_exp = "int, float, double, char are declared, assigned values, and printed with %d, %f, %lf, %c."
    elif "Constants" in title and "const and #define" in title:
        logic = "Use both `const` and `#define` to define PI and compute area/circumference of a circle."
        code_exp = "PI defined as const double and via #define. Program reads radius, calculates area and circumference, prints results."
    elif "Arithmetic Operators" in title:
        logic = "Perform all basic arithmetic operations (+, -, *, /, %) on two integers."
        code_exp = "Read two ints, compute and print sum, difference, product, quotient, remainder."
    elif "Relational Operators" in title:
        logic = "Compare two numbers using all relational operators and print the results (1 for true, 0 for false)."
        code_exp = "Read two ints, print outcomes of >, <, >=, <=, ==, !=."
    elif "Logical Operators" in title and "Leap Year" in title:
        logic = "Check leap year using logical && and ||: (year%400==0) or (year%4==0 and year%100!=0)."
        code_exp = "Function isLeap() implements condition; main reads year and prints result."
    elif "Assignment and Compound Operators" in title:
        logic = "Demonstrate simple assignment and compound operators +=, -=, *=, /=, %=."
        code_exp = "Start with a variable, apply each compound operator with a user-provided value, print after each step."
    elif "Increment and Decrement" in title:
        logic = "Show difference between prefix (++i) and postfix (i++) increment/decrement."
        code_exp = "Declare a variable, use it in expressions with prefix/postfix, print values to illustrate order."
    elif "Type Conversion" in title:
        logic = "Demonstrate implicit conversion (int to float) and explicit casting."
        code_exp = "Show integer division stored in float vs. explicit cast; also cast float to int (truncation)."
    elif "Operator Precedence" in title:
        logic = "Evaluate a complex expression with multiple operators to understand precedence and associativity."
        code_exp = "Compute an expression like a + b * c - d / e and show step-by-step evaluation."
    elif "Formatted Input with scanf" in title:
        logic = "Use scanf to read different data types (int, float, char) with proper format specifiers."
        code_exp = "Read an integer, a float, and a character; print them back using printf."
    elif "While Loop" in title and "Print Numbers" in title:
        logic = "Use a while loop to print numbers from 1 to N."
        code_exp = "Initialize counter, loop while <= N, print and increment."
    elif "While Loop" in title and "Sum of Natural Numbers" in title:
        logic = "Compute sum of first N natural numbers using a while loop."
        code_exp = "Accumulate sum in a variable while iterating from 1 to N."
    elif "While Loop" in title and "Product (Factorial)" in title:
        logic = "Compute factorial of N using a while loop (iterative)."
        code_exp = "Initialize product=1, multiply by i from 1 to N."
    elif "Do-While Loop" in title and "Menu-Driven Calculator" in title:
        logic = "Present a menu of operations and repeat until user chooses exit using do-while."
        code_exp = "Display menu, read choice, perform operation with switch, loop while choice != exit."
    elif "Do-While Loop" in title and "Guess the Number" in title:
        logic = "Generate random number, let user guess with hints, repeat until correct using do-while."
        code_exp = "Use rand() and srand(), do-while to keep asking, give feedback."
    elif "For Loop" in title and "Multiplication Table" in title:
        logic = "Print multiplication table of a number using for loop."
        code_exp = "Loop from 1 to 10, print number * i."
    elif "For Loop" in title and "Sum of Squares" in title:
        logic = "Compute sum of squares 1² + 2² + ... + n² using for loop."
        code_exp = "Accumulate i*i in loop."
    elif "For Loop" in title and "Factorial (Iterative)" in title:
        logic = "Compute factorial using for loop."
        code_exp = "Initialize fact=1, for i=1 to n, fact *= i."
    elif "For Loop" in title and "Fibonacci Series" in title:
        logic = "Generate Fibonacci series up to N terms using for loop."
        code_exp = "Initialize a=0, b=1; for loop to print and update."
    elif "Break in Loop" in title:
        logic = "Find first number divisible by both 5 and 7 in a range using break."
        code_exp = "Loop from start to end, if condition true, print and break."
    elif "Continue in Loop" in title:
        logic = "Print numbers 1-20 skipping multiples of 3 using continue."
        code_exp = "Loop 1 to 20, if i%3==0 continue, else print."
    elif "Prime Number Check" in title:
        logic = "Check if a number is prime using loop up to sqrt(n)."
        code_exp = "Handle <2, loop from 2 to sqrt(n), if divisible return 0; else 1."
    elif "Prime Numbers in Range" in title:
        logic = "Print all prime numbers in a given range."
        code_exp = "For each number in range, call isPrime() and print if prime."
    elif "GCD" in title:
        logic = "Compute GCD using Euclidean algorithm (loop)."
        code_exp = "While b != 0, set temp=b, b=a%b, a=temp; return a."
    elif "LCM" in title:
        logic = "Compute LCM using formula LCM = a*b / GCD(a,b)."
        code_exp = "Compute GCD with helper, then apply formula (divide first to avoid overflow)."
    elif "Reverse a Number" in title:
        logic = "Reverse the digits of an integer using loop."
        code_exp = "While n!=0, rev = rev*10 + n%10, n/=10."
    elif "Palindrome Number" in title:
        logic = "Check if a number is palindrome by comparing with its reverse."
        code_exp = "Call reverseNumber() and compare with original."
    elif "Sum of Digits" in title:
        logic = "Sum digits of a number using loop."
        code_exp = "While n!=0, sum += n%10, n/=10."
    elif "Armstrong Number" in title:
        logic = "Check if number equals sum of its digits raised to power of number of digits."
        code_exp = "Count digits, compute sum of pow(d, digits), compare."
    elif "Perfect Number" in title:
        logic = "Check if number equals sum of its proper divisors."
        code_exp = "Loop from 1 to n/2, sum divisors, compare."
    elif "Count Digits" in title:
        logic = "Count number of digits in an integer using loop."
        code_exp = "Handle 0 case, while n!=0, count++, n/=10."
    elif "Power (Iterative)" in title:
        logic = "Compute base^exponent using iterative multiplication."
        code_exp = "Initialize result=1, loop exp times, result *= base."
    elif "Power (Recursive)" in title:
        logic = "Compute base^exponent recursively."
        code_exp = "Base case exp==0 return 1; else return base * powerRec(base, exp-1)."
    elif "Fibonacci (Recursive)" in title:
        logic = "Compute nth Fibonacci number recursively."
        code_exp = "Base cases n<=1 return n; else return fib(n-1)+fib(n-2)."
    elif "Factorial (Recursive)" in title:
        logic = "Compute factorial recursively."
        code_exp = "Base case n<=1 return 1; else return n * factorialRec(n-1)."
    elif "Nested Loops" in title and "Right-Angled Triangle" in title:
        logic = "Print right-angled triangle of stars using nested loops."
        code_exp = "Outer loop rows, inner loop prints stars equal to row number."
    elif "Nested Loops" in title and "Inverted Right-Angled Triangle" in title:
        logic = "Print inverted right-angled triangle of stars."
        code_exp = "Outer loop rows decreasing, inner loop prints stars."
    elif "Nested Loops" in title and "Pyramid" in title:
        logic = "Print centered pyramid of stars."
        code_exp = "Outer loop rows, inner loops for spaces and stars."
    elif "Nested Loops" in title and "Diamond" in title:
        logic = "Print diamond pattern using nested loops."
        code_exp = "Upper half pyramid, lower half inverted pyramid."
    elif "Nested Loops" in title and "Number Pattern" in title:
        logic = "Print pattern: 1, 12, 123, ... using nested loops."
        code_exp = "Outer loop rows, inner loop prints numbers from 1 to row."
    elif "Nested Loops" in title and "Floyd's Triangle" in title:
        logic = "Print Floyd's triangle (consecutive numbers)."
        code_exp = "Use counter, nested loops to print numbers in triangular form."
    elif "Nested Loops" in title and "Multiplication Table Grid" in title:
        logic = "Print 10x10 multiplication table grid using nested loops."
        code_exp = "Outer loop 1-10, inner loop 1-10, print product formatted."
    elif "Debugging Loops" in title and "Infinite Loop" in title:
        logic = "Demonstrate an infinite loop (commented out) and show how to fix."
        code_exp = "Show loop with condition always true, then corrected version."
    elif "Loop Boundary Errors" in title:
        logic = "Illustrate off-by-one errors in loops and correct them."
        code_exp = "Show loops that miss first/last element and corrected versions."
    elif "Constants for Loop Limits" in title:
        logic = "Use #defined constants for loop limits to improve readability."
        code_exp = "Define MAX=10, loop from 1 to MAX, print values."
    elif "Sum of Even Numbers" in title:
        logic = "Compute sum of even numbers from 1 to N using loop."
        code_exp = "Loop 1 to N, if i%2==0 add to sum."
    elif "Sum of Odd Numbers" in title:
        logic = "Compute sum of odd numbers from 1 to N using loop."
        code_exp = "Loop 1 to N, if i%2!=0 add to sum."
    elif "Even or Odd" in title and "Conditional" in title:
        logic = "Check if a number is even or odd using conditional operator."
        code_exp = "Read number, use (n%2==0) ? 'Even' : 'Odd' and print."
    elif "Simple Interest" in title:
        logic = "Calculate simple interest: SI = (P * R * T) / 100."
        code_exp = "Read principal, rate, time; compute and print interest."
    else:
        logic = f"Standard algorithm for {title}."
        code_exp = f"The C code implements {title} as described."

    return logic, code_exp


# ============================================
# Project data for 50 projects
# ============================================

projects = []
c_files = {}  # filename -> code string

# List of 50 projects (no arrays, no duplicate additions)
project_list = [
    # Basic structure, printf, comments
    {
        "title": "Hello, World! with Comments",
        "difficulty": "Beginner",
        "description": "Write a basic C program that prints 'Hello, World!' and includes single-line and multi-line comments explaining each part.",
        "exampleText": "",
        "exampleOutput": "Hello, World!",
        "learningOutcome": "Understanding basic program structure, headers, main function, return value, and comments.",
        "code": r"""#include <stdio.h>

int main() {
    // This is a single-line comment
    /* This is a
       multi-line comment */
    printf("Hello, World!\n");
    return 0; // Indicates successful execution
}
"""
    },
    {
        "title": "Variables and Format Specifiers",
        "difficulty": "Beginner",
        "description": "Declare variables of types int, float, double, and char. Assign values and print them using appropriate format specifiers.",
        "exampleText": "",
        "exampleOutput": "Integer: 10\nFloat: 3.140000\nDouble: 2.718282\nCharacter: A",
        "learningOutcome": "Variable declaration, initialization, and using printf format specifiers (%d, %f, %lf, %c).",
        "code": r"""#include <stdio.h>

int main() {
    int i = 10;
    float f = 3.14f;
    double d = 2.71828;
    char c = 'A';

    printf("Integer: %d\n", i);
    printf("Float: %f\n", f);
    printf("Double: %lf\n", d);
    printf("Character: %c\n", c);
    return 0;
}
"""
    },
    {
        "title": "Constants with const and #define",
        "difficulty": "Beginner",
        "description": "Define PI as a constant using both const keyword and #define preprocessor. Compute the area and circumference of a circle for a given radius.",
        "exampleText": "Enter radius: 5",
        "exampleOutput": "Area (using const): 78.539816\nCircumference (using const): 31.415926\nArea (using #define): 78.539816\nCircumference (using #define): 31.415926",
        "learningOutcome": "Using const and #define to create constants, basic arithmetic.",
        "code": r"""#include <stdio.h>
#define PI_DEFINE 3.14159

int main() {
    const double PI_CONST = 3.14159;
    double radius, area_const, circ_const, area_define, circ_define;

    printf("Enter radius: ");
    scanf("%lf", &radius);

    area_const = PI_CONST * radius * radius;
    circ_const = 2 * PI_CONST * radius;

    area_define = PI_DEFINE * radius * radius;
    circ_define = 2 * PI_DEFINE * radius;

    printf("Area (using const): %f\n", area_const);
    printf("Circumference (using const): %f\n", circ_const);
    printf("Area (using #define): %f\n", area_define);
    printf("Circumference (using #define): %f\n", circ_define);
    return 0;
}
"""
    },
    {
        "title": "Arithmetic Operators Demonstration",
        "difficulty": "Beginner",
        "description": "Read two integers and perform all arithmetic operations: addition, subtraction, multiplication, division (integer), and modulus. Print the results.",
        "exampleText": "Enter two integers: 15 4",
        "exampleOutput": "15 + 4 = 19\n15 - 4 = 11\n15 * 4 = 60\n15 / 4 = 3\n15 %% 4 = 1",
        "learningOutcome": "Using +, -, *, /, % operators.",
        "code": r"""#include <stdio.h>

int main() {
    int a, b;
    printf("Enter two integers: ");
    scanf("%d %d", &a, &b);
    printf("%d + %d = %d\n", a, b, a + b);
    printf("%d - %d = %d\n", a, b, a - b);
    printf("%d * %d = %d\n", a, b, a * b);
    if (b != 0) {
        printf("%d / %d = %d\n", a, b, a / b);
        printf("%d %% %d = %d\n", a, b, a % b);
    } else {
        printf("Division and modulus by zero are not allowed.\n");
    }
    return 0;
}
"""
    },
    {
        "title": "Relational Operators – Compare Two Numbers",
        "difficulty": "Beginner",
        "description": "Read two integers and compare them using all relational operators (>, <, >=, <=, ==, !=). Print 1 if true, 0 if false.",
        "exampleText": "Enter two numbers: 10 20",
        "exampleOutput": "10 > 20 : 0\n10 < 20 : 1\n10 >= 20 : 0\n10 <= 20 : 1\n10 == 20 : 0\n10 != 20 : 1",
        "learningOutcome": "Understanding relational operators and their integer results.",
        "code": r"""#include <stdio.h>

int main() {
    int a, b;
    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);
    printf("%d > %d : %d\n", a, b, a > b);
    printf("%d < %d : %d\n", a, b, a < b);
    printf("%d >= %d : %d\n", a, b, a >= b);
    printf("%d <= %d : %d\n", a, b, a <= b);
    printf("%d == %d : %d\n", a, b, a == b);
    printf("%d != %d : %d\n", a, b, a != b);
    return 0;
}
"""
    },
    {
        "title": "Logical Operators – Leap Year Check",
        "difficulty": "Beginner",
        "description": "Check if a given year is a leap year using logical operators (&&, ||). A year is a leap year if divisible by 400 or (divisible by 4 and not by 100).",
        "exampleText": "Enter year: 2024",
        "exampleOutput": "2024 is a leap year.",
        "learningOutcome": "Combining conditions with logical AND and OR.",
        "code": r"""#include <stdio.h>

int isLeap(int year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}

int main() {
    int year;
    printf("Enter year: ");
    scanf("%d", &year);
    if (isLeap(year))
        printf("%d is a leap year.\n", year);
    else
        printf("%d is not a leap year.\n", year);
    return 0;
}
"""
    },
    {
        "title": "Assignment and Compound Assignment Operators",
        "difficulty": "Beginner",
        "description": "Demonstrate simple assignment and compound operators +=, -=, *=, /=, %=. Start with an initial value, apply each operator with a user-provided number, and print results.",
        "exampleText": "Initial value: 10\nEnter a number: 3",
        "exampleOutput": "After += 3: 13\nAfter -= 3: 10\nAfter *= 3: 30\nAfter /= 3: 10\nAfter %= 3: 1",
        "learningOutcome": "Understanding compound assignment operators.",
        "code": r"""#include <stdio.h>

int main() {
    int x, y;
    printf("Initial value: 10\n");
    x = 10;
    printf("Enter a number: ");
    scanf("%d", &y);
    x += y; printf("After += %d: %d\n", y, x);
    x -= y; printf("After -= %d: %d\n", y, x);
    x *= y; printf("After *= %d: %d\n", y, x);
    x /= y; printf("After /= %d: %d\n", y, x);
    x %= y; printf("After %%= %d: %d\n", y, x);
    return 0;
}
"""
    },
    {
        "title": "Increment and Decrement Operators (Prefix vs Postfix)",
        "difficulty": "Beginner",
        "description": "Show the difference between prefix (++i) and postfix (i++) increment/decrement operators.",
        "exampleText": "Enter a number: 5",
        "exampleOutput": "Initial: x = 5\na = ++x: a = 6, x = 6\nb = x++: b = 6, x = 7\nc = --x: c = 6, x = 6\nd = x--: d = 6, x = 5",
        "learningOutcome": "Prefix and postfix operators and their side effects.",
        "code": r"""#include <stdio.h>

int main() {
    int x, a, b, c, d;
    printf("Enter a number: ");
    scanf("%d", &x);
    printf("Initial: x = %d\n", x);
    a = ++x;
    printf("a = ++x: a = %d, x = %d\n", a, x);
    b = x++;
    printf("b = x++: b = %d, x = %d\n", b, x);
    c = --x;
    printf("c = --x: c = %d, x = %d\n", c, x);
    d = x--;
    printf("d = x--: d = %d, x = %d\n", d, x);
    return 0;
}
"""
    },
    {
        "title": "Type Conversion – Implicit and Explicit",
        "difficulty": "Beginner",
        "description": "Demonstrate implicit conversion (e.g., int to float in division) and explicit casting (e.g., (float)int).",
        "exampleText": "Enter an integer: 7\nEnter a float: 3.14",
        "exampleOutput": "Implicit: int / int stored in float: 7/2 = 3.000000\nExplicit cast: (float)7/2 = 3.500000\nCasting float to int: (int)3.14 = 3",
        "learningOutcome": "Implicit type conversion, explicit casting, type promotion.",
        "code": r"""#include <stdio.h>

int main() {
    int a, b = 2;
    float f;
    printf("Enter an integer: ");
    scanf("%d", &a);
    printf("Enter a float: ");
    scanf("%f", &f);
    // Implicit conversion: result of int division stored in float
    float implicit = a / b;  // integer division first, then converted to float
    printf("Implicit: int / int stored in float: %d/%d = %f\n", a, b, implicit);
    // Explicit cast: force float division
    float explicitCast = (float)a / b;
    printf("Explicit cast: (float)%d/%d = %f\n", a, b, explicitCast);
    // Cast float to int (truncation)
    int casted = (int)f;
    printf("Casting float to int: (int)%f = %d\n", f, casted);
    return 0;
}
"""
    },
    {
        "title": "Operator Precedence – Evaluate Complex Expression",
        "difficulty": "Beginner",
        "description": "Evaluate an expression involving multiple operators (+, -, *, /) to understand precedence and associativity.",
        "exampleText": "Enter a, b, c, d, e: 2 3 4 5 6",
        "exampleOutput": "Expression: a + b * c - d / e = 2 + 3*4 - 5/6 = 2 + 12 - 0 = 14",
        "learningOutcome": "Operator precedence and associativity.",
        "code": r"""#include <stdio.h>

int main() {
    int a, b, c, d, e, result;
    printf("Enter a, b, c, d, e: ");
    scanf("%d %d %d %d %d", &a, &b, &c, &d, &e);
    result = a + b * c - d / e;
    printf("Expression: a + b * c - d / e = %d + %d*%d - %d/%d = %d + %d - %d = %d\n",
           a, b, c, d, e, a, b*c, d/e, result);
    return 0;
}
"""
    },
    {
        "title": "Formatted Input with scanf – Read Multiple Types",
        "difficulty": "Beginner",
        "description": "Use scanf to read an integer, a float, and a character, then print them back using printf with appropriate format specifiers.",
        "exampleText": "Enter an integer: 10\nEnter a float: 3.14\nEnter a character: A",
        "exampleOutput": "You entered: integer = 10, float = 3.140000, character = A",
        "learningOutcome": "Using format specifiers with scanf for different data types.",
        "code": r"""#include <stdio.h>

int main() {
    int i;
    float f;
    char c;
    printf("Enter an integer: ");
    scanf("%d", &i);
    printf("Enter a float: ");
    scanf("%f", &f);
    printf("Enter a character: ");
    scanf(" %c", &c);  // space before %c to consume newline
    printf("You entered: integer = %d, float = %f, character = %c\n", i, f, c);
    return 0;
}
"""
    },
    {
        "title": "While Loop – Print Numbers 1 to N",
        "difficulty": "Beginner",
        "description": "Print numbers from 1 to N using a while loop.",
        "exampleText": "Enter N: 5",
        "exampleOutput": "1 2 3 4 5",
        "learningOutcome": "Basic while loop syntax.",
        "code": r"""#include <stdio.h>

int main() {
    int n, i = 1;
    printf("Enter N: ");
    scanf("%d", &n);
    while (i <= n) {
        printf("%d ", i);
        i++;
    }
    printf("\n");
    return 0;
}
"""
    },
    {
        "title": "While Loop – Sum of First N Natural Numbers",
        "difficulty": "Beginner",
        "description": "Compute the sum of first N natural numbers using a while loop.",
        "exampleText": "Enter N: 5",
        "exampleOutput": "Sum = 15",
        "learningOutcome": "Accumulating sum in a loop.",
        "code": r"""#include <stdio.h>

int main() {
    int n, i = 1, sum = 0;
    printf("Enter N: ");
    scanf("%d", &n);
    while (i <= n) {
        sum += i;
        i++;
    }
    printf("Sum = %d\n", sum);
    return 0;
}
"""
    },
    {
        "title": "While Loop – Product (Factorial) of N",
        "difficulty": "Beginner",
        "description": "Compute the factorial of a non-negative integer using a while loop.",
        "exampleText": "Enter N: 5",
        "exampleOutput": "Factorial = 120",
        "learningOutcome": "Using while loop for multiplication.",
        "code": r"""#include <stdio.h>

int main() {
    int n, i = 1, fact = 1;
    printf("Enter a non-negative integer: ");
    scanf("%d", &n);
    if (n < 0) {
        printf("Factorial not defined for negative numbers.\n");
        return 1;
    }
    while (i <= n) {
        fact *= i;
        i++;
    }
    printf("Factorial = %d\n", fact);
    return 0;
}
"""
    },
    {
        "title": "Do-While Loop – Menu-Driven Calculator",
        "difficulty": "Intermediate",
        "description": "Create a menu-driven calculator that repeats until user chooses exit, using a do-while loop.",
        "exampleText": "1. Add\n2. Subtract\n3. Multiply\n4. Divide\n5. Exit\nEnter choice: 1\nEnter two numbers: 10 5\nResult = 15",
        "exampleOutput": "Result printed and menu repeats.",
        "learningOutcome": "Do-while loop for menus, switch statement.",
        "code": r"""#include <stdio.h>

int main() {
    int choice, a, b;
    do {
        printf("\n1. Add\n2. Subtract\n3. Multiply\n4. Divide\n5. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);
        if (choice >= 1 && choice <= 4) {
            printf("Enter two numbers: ");
            scanf("%d %d", &a, &b);
        }
        switch (choice) {
            case 1: printf("Result = %d\n", a + b); break;
            case 2: printf("Result = %d\n", a - b); break;
            case 3: printf("Result = %d\n", a * b); break;
            case 4: if (b != 0) printf("Result = %d\n", a / b);
                    else printf("Division by zero!\n"); break;
            case 5: printf("Exiting...\n"); break;
            default: printf("Invalid choice!\n");
        }
    } while (choice != 5);
    return 0;
}
"""
    },
    {
        "title": "Do-While Loop – Guess the Number Game",
        "difficulty": "Intermediate",
        "description": "Generate a random number between 1 and 100, and let the user guess it with hints, using do-while.",
        "exampleText": "Guess the number (1-100): 50\nToo low!\nGuess again: 75\nToo high!\n...",
        "exampleOutput": "Congratulations! You guessed it in X tries.",
        "learningOutcome": "Random numbers, do-while for at least one iteration.",
        "code": r"""#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    int number, guess, attempts = 0;
    srand(time(0));
    number = rand() % 100 + 1;  // 1 to 100
    printf("I have chosen a number between 1 and 100.\n");
    do {
        printf("Enter your guess: ");
        scanf("%d", &guess);
        attempts++;
        if (guess < number)
            printf("Too low!\n");
        else if (guess > number)
            printf("Too high!\n");
        else
            printf("Congratulations! You guessed it in %d tries.\n", attempts);
    } while (guess != number);
    return 0;
}
"""
    },
    {
        "title": "For Loop – Multiplication Table",
        "difficulty": "Beginner",
        "description": "Print the multiplication table of a given number using a for loop.",
        "exampleText": "Enter a number: 7",
        "exampleOutput": "7 x 1 = 7\n7 x 2 = 14\n...\n7 x 10 = 70",
        "learningOutcome": "For loop syntax, formatting output.",
        "code": r"""#include <stdio.h>

int main() {
    int n, i;
    printf("Enter a number: ");
    scanf("%d", &n);
    for (i = 1; i <= 10; i++) {
        printf("%d x %d = %d\n", n, i, n * i);
    }
    return 0;
}
"""
    },
    {
        "title": "For Loop – Sum of Squares",
        "difficulty": "Beginner",
        "description": "Compute the sum of squares: 1² + 2² + ... + n² using a for loop.",
        "exampleText": "Enter n: 3",
        "exampleOutput": "Sum of squares = 14",
        "learningOutcome": "Accumulating sum with exponentiation.",
        "code": r"""#include <stdio.h>

int main() {
    int n, i, sum = 0;
    printf("Enter n: ");
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        sum += i * i;
    }
    printf("Sum of squares = %d\n", sum);
    return 0;
}
"""
    },
    {
        "title": "For Loop – Factorial (Iterative)",
        "difficulty": "Beginner",
        "description": "Compute factorial of a number using a for loop.",
        "exampleText": "Enter a number: 5",
        "exampleOutput": "Factorial = 120",
        "learningOutcome": "Iterative factorial with for loop.",
        "code": r"""#include <stdio.h>

int main() {
    int n, i, fact = 1;
    printf("Enter a non-negative integer: ");
    scanf("%d", &n);
    if (n < 0) {
        printf("Factorial not defined for negative numbers.\n");
        return 1;
    }
    for (i = 1; i <= n; i++) {
        fact *= i;
    }
    printf("Factorial = %d\n", fact);
    return 0;
}
"""
    },
    {
        "title": "For Loop – Fibonacci Series",
        "difficulty": "Intermediate",
        "description": "Generate the Fibonacci series up to N terms using a for loop.",
        "exampleText": "Enter number of terms: 7",
        "exampleOutput": "0 1 1 2 3 5 8",
        "learningOutcome": "Generating Fibonacci sequence iteratively.",
        "code": r"""#include <stdio.h>

int main() {
    int n, i, a = 0, b = 1, next;
    printf("Enter number of terms: ");
    scanf("%d", &n);
    if (n <= 0) {
        printf("Please enter a positive integer.\n");
        return 1;
    }
    printf("Fibonacci series: ");
    for (i = 1; i <= n; i++) {
        printf("%d ", a);
        next = a + b;
        a = b;
        b = next;
    }
    printf("\n");
    return 0;
}
"""
    },
    {
        "title": "Break in Loop – Find First Number Divisible by 5 and 7",
        "difficulty": "Intermediate",
        "description": "Find the first number in a given range that is divisible by both 5 and 7 using break.",
        "exampleText": "Enter start and end: 1 100",
        "exampleOutput": "First number divisible by 5 and 7 is 35",
        "learningOutcome": "Using break to exit loop early.",
        "code": r"""#include <stdio.h>

int main() {
    int start, end, i, found = 0;
    printf("Enter start and end: ");
    scanf("%d %d", &start, &end);
    for (i = start; i <= end; i++) {
        if (i % 5 == 0 && i % 7 == 0) {
            printf("First number divisible by 5 and 7 is %d\n", i);
            found = 1;
            break;
        }
    }
    if (!found)
        printf("No such number in range.\n");
    return 0;
}
"""
    },
    {
        "title": "Continue in Loop – Skip Multiples of 3",
        "difficulty": "Intermediate",
        "description": "Print numbers from 1 to 20, skipping multiples of 3 using continue.",
        "exampleText": "",
        "exampleOutput": "1 2 4 5 7 8 10 11 13 14 16 17 19 20",
        "learningOutcome": "Using continue to skip iterations.",
        "code": r"""#include <stdio.h>

int main() {
    int i;
    printf("Numbers from 1 to 20 skipping multiples of 3:\n");
    for (i = 1; i <= 20; i++) {
        if (i % 3 == 0)
            continue;
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}
"""
    },
    {
        "title": "Prime Number Check",
        "difficulty": "Intermediate",
        "description": "Check whether a given number is prime using a loop up to sqrt(n).",
        "exampleText": "Enter a number: 17",
        "exampleOutput": "17 is a prime number.",
        "learningOutcome": "Prime checking algorithm, sqrt optimization.",
        "code": r"""#include <stdio.h>
#include <math.h>

int isPrime(int n) {
    if (n <= 1) return 0;
    for (int i = 2; i <= sqrt(n); i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    if (isPrime(n))
        printf("%d is a prime number.\n", n);
    else
        printf("%d is not a prime number.\n", n);
    return 0;
}
"""
    },
    {
        "title": "Prime Numbers in a Given Range",
        "difficulty": "Intermediate",
        "description": "Print all prime numbers between two given integers using a function to check primality.",
        "exampleText": "Enter lower and upper limits: 10 30",
        "exampleOutput": "Prime numbers between 10 and 30: 11 13 17 19 23 29",
        "learningOutcome": "Combining loops and prime checking.",
        "code": r"""#include <stdio.h>
#include <math.h>

int isPrime(int n) {
    if (n <= 1) return 0;
    for (int i = 2; i <= sqrt(n); i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

int main() {
    int low, high, i;
    printf("Enter lower and upper limits: ");
    scanf("%d %d", &low, &high);
    printf("Prime numbers between %d and %d: ", low, high);
    for (i = low; i <= high; i++) {
        if (isPrime(i))
            printf("%d ", i);
    }
    printf("\n");
    return 0;
}
"""
    },
    {
        "title": "GCD (Euclidean Algorithm)",
        "difficulty": "Intermediate",
        "description": "Compute the greatest common divisor of two integers using the Euclidean algorithm (loop version).",
        "exampleText": "Enter two numbers: 48 18",
        "exampleOutput": "GCD = 6",
        "learningOutcome": "Euclidean algorithm for GCD.",
        "code": r"""#include <stdio.h>

int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

int main() {
    int a, b;
    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);
    printf("GCD = %d\n", gcd(a, b));
    return 0;
}
"""
    },
    {
        "title": "LCM Using GCD",
        "difficulty": "Intermediate",
        "description": "Compute the least common multiple of two integers using the formula LCM = a * b / GCD(a,b).",
        "exampleText": "Enter two numbers: 12 18",
        "exampleOutput": "LCM = 36",
        "learningOutcome": "Relationship between LCM and GCD.",
        "code": r"""#include <stdio.h>

int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

int lcm(int a, int b) {
    return (a / gcd(a, b)) * b; // divide first to avoid overflow
}

int main() {
    int a, b;
    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);
    printf("LCM = %d\n", lcm(a, b));
    return 0;
}
"""
    },
    {
        "title": "Reverse a Number",
        "difficulty": "Beginner",
        "description": "Reverse the digits of a given integer using a loop.",
        "exampleText": "Enter a number: 1234",
        "exampleOutput": "Reversed number = 4321",
        "learningOutcome": "Digit extraction and building reversed number.",
        "code": r"""#include <stdio.h>

int reverseNumber(int n) {
    int rev = 0;
    while (n != 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    return rev;
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    printf("Reversed number = %d\n", reverseNumber(n));
    return 0;
}
"""
    },
    {
        "title": "Palindrome Number",
        "difficulty": "Beginner",
        "description": "Check if a number is a palindrome (reads the same forwards and backwards).",
        "exampleText": "Enter a number: 1221",
        "exampleOutput": "Palindrome",
        "learningOutcome": "Reversing and comparing.",
        "code": r"""#include <stdio.h>

int reverseNumber(int n) {
    int rev = 0;
    while (n != 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    return rev;
}

int isPalindrome(int n) {
    return n == reverseNumber(n);
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    if (isPalindrome(n))
        printf("Palindrome\n");
    else
        printf("Not Palindrome\n");
    return 0;
}
"""
    },
    {
        "title": "Sum of Digits",
        "difficulty": "Beginner",
        "description": "Compute the sum of digits of a positive integer.",
        "exampleText": "Enter a number: 1234",
        "exampleOutput": "Sum of digits = 10",
        "learningOutcome": "Digit extraction.",
        "code": r"""#include <stdio.h>

int sumOfDigits(int n) {
    int sum = 0;
    while (n != 0) {
        sum += n % 10;
        n /= 10;
    }
    return sum;
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    printf("Sum of digits = %d\n", sumOfDigits(n));
    return 0;
}
"""
    },
    {
        "title": "Armstrong Number",
        "difficulty": "Intermediate",
        "description": "Check if a number is an Armstrong number (sum of its digits raised to the power of number of digits equals the number).",
        "exampleText": "Enter a number: 153",
        "exampleOutput": "Armstrong",
        "learningOutcome": "Digit extraction, power calculation.",
        "code": r"""#include <stdio.h>
#include <math.h>

int countDigits(int n) {
    int count = 0;
    while (n != 0) {
        count++;
        n /= 10;
    }
    return count;
}

int isArmstrong(int n) {
    int original = n, sum = 0, digits = countDigits(n);
    while (n != 0) {
        int d = n % 10;
        sum += pow(d, digits);
        n /= 10;
    }
    return sum == original;
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    if (isArmstrong(n))
        printf("Armstrong\n");
    else
        printf("Not Armstrong\n");
    return 0;
}
"""
    },
    {
        "title": "Perfect Number",
        "difficulty": "Intermediate",
        "description": "Check if a number is perfect (equal to sum of its proper divisors).",
        "exampleText": "Enter a number: 28",
        "exampleOutput": "Perfect",
        "learningOutcome": "Divisor sum.",
        "code": r"""#include <stdio.h>

int isPerfect(int n) {
    if (n <= 1) return 0;
    int sum = 0;
    for (int i = 1; i <= n/2; i++) {
        if (n % i == 0) sum += i;
    }
    return sum == n;
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    if (isPerfect(n))
        printf("Perfect\n");
    else
        printf("Not Perfect\n");
    return 0;
}
"""
    },
    {
        "title": "Count Digits in a Number",
        "difficulty": "Beginner",
        "description": "Count the number of digits in a positive integer.",
        "exampleText": "Enter a number: 98765",
        "exampleOutput": "Number of digits = 5",
        "learningOutcome": "Loop to count digits.",
        "code": r"""#include <stdio.h>

int countDigits(int n) {
    if (n == 0) return 1;
    int count = 0;
    while (n != 0) {
        count++;
        n /= 10;
    }
    return count;
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    printf("Number of digits = %d\n", countDigits(n));
    return 0;
}
"""
    },
    {
        "title": "Power of a Number (Iterative)",
        "difficulty": "Beginner",
        "description": "Compute base raised to exponent (non-negative) using iterative multiplication.",
        "exampleText": "Enter base and exponent: 2 5",
        "exampleOutput": "2^5 = 32",
        "learningOutcome": "Loop for exponentiation.",
        "code": r"""#include <stdio.h>

int powerIter(int base, int exp) {
    int result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

int main() {
    int b, e;
    printf("Enter base and exponent: ");
    scanf("%d %d", &b, &e);
    printf("%d^%d = %d\n", b, e, powerIter(b, e));
    return 0;
}
"""
    },
    {
        "title": "Power of a Number (Recursive)",
        "difficulty": "Intermediate",
        "description": "Compute base raised to exponent using recursion.",
        "exampleText": "Enter base and exponent: 2 5",
        "exampleOutput": "2^5 = 32",
        "learningOutcome": "Recursion for exponentiation.",
        "code": r"""#include <stdio.h>

int powerRec(int base, int exp) {
    if (exp == 0) return 1;
    return base * powerRec(base, exp - 1);
}

int main() {
    int b, e;
    printf("Enter base and exponent: ");
    scanf("%d %d", &b, &e);
    printf("%d^%d = %d\n", b, e, powerRec(b, e));
    return 0;
}
"""
    },
    {
        "title": "Fibonacci Number (Recursive)",
        "difficulty": "Intermediate",
        "description": "Compute the nth Fibonacci number using recursion.",
        "exampleText": "Enter n: 6",
        "exampleOutput": "Fibonacci(6) = 8",
        "learningOutcome": "Recursive Fibonacci.",
        "code": r"""#include <stdio.h>

int fibRec(int n) {
    if (n <= 1) return n;
    return fibRec(n-1) + fibRec(n-2);
}

int main() {
    int n;
    printf("Enter n: ");
    scanf("%d", &n);
    printf("Fibonacci(%d) = %d\n", n, fibRec(n));
    return 0;
}
"""
    },
    {
        "title": "Factorial (Recursive)",
        "difficulty": "Intermediate",
        "description": "Compute factorial of a number using recursion.",
        "exampleText": "Enter a number: 5",
        "exampleOutput": "Factorial = 120",
        "learningOutcome": "Recursive factorial.",
        "code": r"""#include <stdio.h>

int factorialRec(int n) {
    if (n <= 1) return 1;
    return n * factorialRec(n - 1);
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    if (n < 0)
        printf("Factorial not defined for negative numbers.\n");
    else
        printf("Factorial = %d\n", factorialRec(n));
    return 0;
}
"""
    },
    {
        "title": "Nested Loops – Right-Angled Triangle Pattern",
        "difficulty": "Intermediate",
        "description": "Print a right-angled triangle of stars using nested loops.",
        "exampleText": "Enter number of rows: 5",
        "exampleOutput": "*\n**\n***\n****\n*****",
        "learningOutcome": "Nested loops for pattern printing.",
        "code": r"""#include <stdio.h>

int main() {
    int rows, i, j;
    printf("Enter number of rows: ");
    scanf("%d", &rows);
    for (i = 1; i <= rows; i++) {
        for (j = 1; j <= i; j++) {
            printf("*");
        }
        printf("\n");
    }
    return 0;
}
"""
    },
    {
        "title": "Nested Loops – Inverted Right-Angled Triangle",
        "difficulty": "Intermediate",
        "description": "Print an inverted right-angled triangle of stars.",
        "exampleText": "Enter number of rows: 5",
        "exampleOutput": "*****\n****\n***\n**\n*",
        "learningOutcome": "Nested loops decreasing.",
        "code": r"""#include <stdio.h>

int main() {
    int rows, i, j;
    printf("Enter number of rows: ");
    scanf("%d", &rows);
    for (i = rows; i >= 1; i--) {
        for (j = 1; j <= i; j++) {
            printf("*");
        }
        printf("\n");
    }
    return 0;
}
"""
    },
    {
        "title": "Nested Loops – Pyramid Pattern",
        "difficulty": "Intermediate",
        "description": "Print a centered pyramid of stars.",
        "exampleText": "Enter number of rows: 5",
        "exampleOutput": "    *\n   ***\n  *****\n *******\n*********",
        "learningOutcome": "Nested loops with spaces and stars.",
        "code": r"""#include <stdio.h>

int main() {
    int rows, i, j, k;
    printf("Enter number of rows: ");
    scanf("%d", &rows);
    for (i = 1; i <= rows; i++) {
        // print spaces
        for (j = 1; j <= rows - i; j++)
            printf(" ");
        // print stars
        for (k = 1; k <= 2*i - 1; k++)
            printf("*");
        printf("\n");
    }
    return 0;
}
"""
    },
    {
        "title": "Nested Loops – Diamond Pattern",
        "difficulty": "Intermediate",
        "description": "Print a diamond pattern of stars.",
        "exampleText": "Enter number of rows (half): 4",
        "exampleOutput": "   *\n  ***\n *****\n*******\n *****\n  ***\n   *",
        "learningOutcome": "Combining two pyramids.",
        "code": r"""#include <stdio.h>

int main() {
    int n, i, j, k;
    printf("Enter number of rows (half): ");
    scanf("%d", &n);
    // Upper half
    for (i = 1; i <= n; i++) {
        for (j = 1; j <= n - i; j++) printf(" ");
        for (k = 1; k <= 2*i - 1; k++) printf("*");
        printf("\n");
    }
    // Lower half
    for (i = n-1; i >= 1; i--) {
        for (j = 1; j <= n - i; j++) printf(" ");
        for (k = 1; k <= 2*i - 1; k++) printf("*");
        printf("\n");
    }
    return 0;
}
"""
    },
    {
        "title": "Nested Loops – Number Pattern (1, 12, 123...)",
        "difficulty": "Intermediate",
        "description": "Print a pattern where each row contains numbers from 1 to row number.",
        "exampleText": "Enter number of rows: 5",
        "exampleOutput": "1\n12\n123\n1234\n12345",
        "learningOutcome": "Nested loops with numbers.",
        "code": r"""#include <stdio.h>

int main() {
    int rows, i, j;
    printf("Enter number of rows: ");
    scanf("%d", &rows);
    for (i = 1; i <= rows; i++) {
        for (j = 1; j <= i; j++) {
            printf("%d", j);
        }
        printf("\n");
    }
    return 0;
}
"""
    },
    {
        "title": "Nested Loops – Floyd's Triangle",
        "difficulty": "Intermediate",
        "description": "Print Floyd's triangle: consecutive numbers arranged in rows.",
        "exampleText": "Enter number of rows: 4",
        "exampleOutput": "1\n2 3\n4 5 6\n7 8 9 10",
        "learningOutcome": "Using a counter in nested loops.",
        "code": r"""#include <stdio.h>

int main() {
    int rows, i, j, num = 1;
    printf("Enter number of rows: ");
    scanf("%d", &rows);
    for (i = 1; i <= rows; i++) {
        for (j = 1; j <= i; j++) {
            printf("%d ", num++);
        }
        printf("\n");
    }
    return 0;
}
"""
    },
    {
        "title": "Nested Loops – Multiplication Table Grid",
        "difficulty": "Intermediate",
        "description": "Print a 10x10 multiplication table grid using nested loops.",
        "exampleText": "",
        "exampleOutput": "    1   2   3   4   5   6   7   8   9  10\n    2   4   6   8  10  12  14  16  18  20\n...",
        "learningOutcome": "Formatted output with nested loops.",
        "code": r"""#include <stdio.h>

int main() {
    int i, j;
    printf("Multiplication Table (1-10)\n");
    for (i = 1; i <= 10; i++) {
        for (j = 1; j <= 10; j++) {
            printf("%4d", i * j);
        }
        printf("\n");
    }
    return 0;
}
"""
    },
    {
        "title": "Debugging Loops – Infinite Loop Example",
        "difficulty": "Intermediate",
        "description": "Demonstrate an infinite loop (commented out) and show how to fix it.",
        "exampleText": "",
        "exampleOutput": "Loop corrected: prints 1 to 5",
        "learningOutcome": "Identifying and fixing infinite loops.",
        "code": r"""#include <stdio.h>

int main() {
    /* Infinite loop (commented to avoid hanging)
    int i = 1;
    while (i <= 5) {
        printf("%d ", i);
        // forgot to increment i
    }
    */

    // Corrected version
    int i = 1;
    printf("Corrected loop: ");
    while (i <= 5) {
        printf("%d ", i);
        i++;
    }
    printf("\n");
    return 0;
}
"""
    },
    {
        "title": "Loop Boundary Errors – Off-by-One Demonstration",
        "difficulty": "Intermediate",
        "description": "Illustrate off-by-one errors in loops and show corrected versions.",
        "exampleText": "",
        "exampleOutput": "Incorrect (prints 1 to 4): 1 2 3 4\nCorrect (prints 1 to 5): 1 2 3 4 5",
        "learningOutcome": "Understanding loop boundaries.",
        "code": r"""#include <stdio.h>

int main() {
    int i;
    printf("Incorrect (prints 1 to 4): ");
    for (i = 1; i < 5; i++) {  // < instead of <=
        printf("%d ", i);
    }
    printf("\nCorrect (prints 1 to 5): ");
    for (i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}
"""
    },
    {
        "title": "Using Constants for Loop Limits",
        "difficulty": "Beginner",
        "description": "Use #define to define a constant for the loop limit and print numbers 1 to that constant.",
        "exampleText": "",
        "exampleOutput": "Numbers 1 to 10: 1 2 3 4 5 6 7 8 9 10",
        "learningOutcome": "Using #define for readability and maintainability.",
        "code": r"""#include <stdio.h>
#define MAX 10

int main() {
    int i;
    printf("Numbers 1 to %d: ", MAX);
    for (i = 1; i <= MAX; i++) {
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}
"""
    },
    {
        "title": "Sum of Even Numbers from 1 to N",
        "difficulty": "Beginner",
        "description": "Compute the sum of all even numbers between 1 and N using a loop.",
        "exampleText": "Enter N: 10",
        "exampleOutput": "Sum of even numbers = 30",
        "learningOutcome": "Conditional inside loop.",
        "code": r"""#include <stdio.h>

int main() {
    int n, i, sum = 0;
    printf("Enter N: ");
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        if (i % 2 == 0)
            sum += i;
    }
    printf("Sum of even numbers = %d\n", sum);
    return 0;
}
"""
    },
    {
        "title": "Sum of Odd Numbers from 1 to N",
        "difficulty": "Beginner",
        "description": "Compute the sum of all odd numbers between 1 and N.",
        "exampleText": "Enter N: 10",
        "exampleOutput": "Sum of odd numbers = 25",
        "learningOutcome": "Conditional inside loop.",
        "code": r"""#include <stdio.h>

int main() {
    int n, i, sum = 0;
    printf("Enter N: ");
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        if (i % 2 != 0)
            sum += i;
    }
    printf("Sum of odd numbers = %d\n", sum);
    return 0;
}
"""
    },
    {
        "title": "Even or Odd Using Conditional Operator",
        "difficulty": "Beginner",
        "description": "Check if a number is even or odd using the conditional (ternary) operator.",
        "exampleText": "Enter a number: 7",
        "exampleOutput": "7 is odd.",
        "learningOutcome": "Ternary operator usage.",
        "code": r"""#include <stdio.h>

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    printf("%d is %s.\n", n, (n % 2 == 0) ? "even" : "odd");
    return 0;
}
"""
    },
    {
        "title": "Simple Interest Calculation",
        "difficulty": "Beginner",
        "description": "Calculate simple interest given principal, rate, and time using formula SI = (P * R * T) / 100.",
        "exampleText": "Enter principal, rate, time: 1000 5 2",
        "exampleOutput": "Simple Interest = 100.00",
        "learningOutcome": "Arithmetic expressions and input.",
        "code": r"""#include <stdio.h>

int main() {
    float p, r, t, si;
    printf("Enter principal, rate, time: ");
    scanf("%f %f %f", &p, &r, &t);
    si = (p * r * t) / 100;
    printf("Simple Interest = %.2f\n", si);
    return 0;
}
"""
    }
]

# Assign project IDs P001 to P050
for idx, proj in enumerate(project_list, start=1):
    pid = f"P{idx:03d}"
    project = {
        "projectId": pid,
        "title": proj["title"],
        "difficulty": proj["difficulty"],
        "description": proj["description"],
        "exampleText": proj.get("exampleText", ""),
        "exampleOutput": proj.get("exampleOutput", ""),
        "answerFile": f"./answers/{pid}.c",
        "learningOutcome": proj["learningOutcome"]
    }
    # Add explanations
    logic, code_exp = generate_explanations(project, proj["code"])
    project["logicExplanation"] = logic
    project["codeExplanation"] = code_exp
    projects.append(project)
    c_files[f"{pid}.c"] = proj["code"]

# ============================================
# Create JSON structure
# ============================================
json_data = {
    "projectCategory": "C Programming – 50 Projects Covering Fundamentals",
    "subject": "Computer Science (C Programming)",
    "board": "WBCHSE / CBSE / ISC",
    "class": "XI - XII",
    "tools": ["GCC", "Clang", "VS Code", "Code::Blocks"],
    "institute": {
        "author": "Sukanta Hui",
        "name": "Coder & AccoTax",
        "location": "Barrackpore & Naihati"
    },
    "projects": projects
}

# ============================================
# Create directories and write files
# ============================================
current_dir = os.path.dirname(os.path.abspath(__file__))

answers_dir = os.path.join(current_dir, "answers")
os.makedirs(answers_dir, exist_ok=True)

# Write JSON file
json_path = os.path.join(current_dir, "basic-function-projects.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(json_data, f, indent=2, ensure_ascii=False)

# Write each C file
for filename, content in c_files.items():
    file_path = os.path.join(answers_dir, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"✅ Successfully created 'answers' folder with {len(c_files)} C files and 'basic-function-projects.json'")