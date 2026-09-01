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

    # Sample project explanations (25)
    if "Add" in title and "Two Numbers" in title:
        logic = "Simple addition: return the sum of two integers."
        code_exp = "The function `add()` takes two int parameters and returns their sum. In `main()`, the user inputs two numbers, calls the function, and prints the result."
    elif "Subtract" in title:
        logic = "Subtraction: return the difference of two integers."
        code_exp = "The function `subtract()` takes two ints and returns the result of `a - b`. `main()` handles I/O."
    elif "Multiply" in title:
        logic = "Multiplication: return the product of two integers."
        code_exp = "`multiply()` returns `a * b`. `main()` reads two numbers and prints the product."
    elif "Divide" in title:
        logic = "Integer division: return the quotient of two integers (assuming divisor non‑zero)."
        code_exp = "`divide()` returns `a / b`. `main()` checks for division by zero (optional) and prints the quotient."
    elif "Factorial" in title:
        if "Recursive" in title:
            logic = "Factorial of n (n!) defined recursively: n! = n * (n-1)! with 0! = 1."
            code_exp = "`factorialRec()` calls itself with n-1 until base case. `main()` reads n and prints result."
        else:
            logic = "Factorial of n computed iteratively by multiplying from 1 to n."
            code_exp = "`factorialIter()` uses a loop to accumulate product. `main()` reads n and prints result."
    elif "Check Prime" in title:
        logic = "A prime number is greater than 1 and divisible only by 1 and itself. Check divisibility up to sqrt(n)."
        code_exp = "`isPrime()` handles numbers <2, then loops from 2 to sqrt(n). Returns 1 if prime, 0 otherwise. `main()` reads a number and prints the result."
    elif "Even or Odd" in title:
        logic = "An even number is divisible by 2; an odd number is not."
        code_exp = "`isEven()` returns 1 if number % 2 == 0 else 0. `main()` reads a number and prints 'Even' or 'Odd'."
    elif "Maximum of Two" in title:
        logic = "Compare two numbers and return the larger one."
        code_exp = "`max()` returns a if a > b else b. `main()` reads two numbers and prints the maximum."
    elif "Minimum of Two" in title:
        logic = "Compare two numbers and return the smaller one."
        code_exp = "`min()` returns a if a < b else b. `main()` reads two numbers and prints the minimum."
    elif "Power" in title:
        if "Iterative" in title:
            logic = "Compute base raised to exponent by repeated multiplication."
            code_exp = "`powerIter()` uses a loop to multiply base exponent times. `main()` reads base and exponent and prints result."
        else:
            logic = "Recursive power: base^exp = base * base^(exp-1) with base^0 = 1."
            code_exp = "`powerRec()` calls itself with decreasing exponent. `main()` reads base and exponent and prints result."
    elif "Sum of Digits" in title:
        logic = "Extract digits by repeatedly taking modulo 10 and dividing by 10, accumulating the sum."
        code_exp = "`sumOfDigits()` uses a while loop to add last digit and remove it. `main()` reads a number and prints the sum."
    elif "Reverse a Number" in title:
        logic = "Build the reversed number by repeatedly taking the last digit and appending it."
        code_exp = "`reverseNumber()` uses a loop: rev = rev*10 + digit. `main()` reads a number and prints the reversed number."
    elif "Palindrome Number" in title:
        logic = "A palindrome reads the same forwards and backwards. Compare the number with its reverse."
        code_exp = "`isPalindrome()` reverses the number and compares with original. `main()` reads a number and prints whether it's a palindrome."
    elif "Fibonacci" in title:
        if "Recursive" in title:
            logic = "Fibonacci: F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)."
            code_exp = "`fibRec()` calls itself recursively. `main()` reads n and prints the nth Fibonacci number."
        else:
            logic = "Fibonacci computed iteratively using a loop and two variables."
            code_exp = "`fibIter()` uses a for loop to build the sequence up to n. `main()` reads n and prints the nth Fibonacci number."
    elif "GCD" in title:
        logic = "Greatest Common Divisor using Euclidean algorithm: GCD(a,b) = GCD(b, a%b)."
        code_exp = "`gcd()` uses recursion or loop to apply the Euclidean algorithm. `main()` reads two numbers and prints their GCD."
    elif "LCM" in title:
        logic = "Least Common Multiple: LCM(a,b) = (a*b) / GCD(a,b)."
        code_exp = "`lcm()` first computes GCD using a helper function, then applies the formula. `main()` reads two numbers and prints LCM."
    elif "Count Digits" in title:
        logic = "Count the number of digits in a positive integer by repeatedly dividing by 10."
        code_exp = "`countDigits()` uses a while loop to divide until zero, counting steps. `main()` reads a number and prints the digit count."
    elif "Armstrong Number" in title:
        logic = "An Armstrong number (narcissistic) equals the sum of its digits each raised to the power of the number of digits."
        code_exp = "`isArmstrong()` counts digits, then computes sum of each digit raised to that power, and compares with original. `main()` reads a number and prints result."
    elif "Perfect Number" in title:
        logic = "A perfect number equals the sum of its proper divisors (excluding itself)."
        code_exp = "`isPerfect()` loops from 1 to n/2, sums divisors, and checks if sum equals n. `main()` reads a number and prints result."
    elif "Sum of Array Elements" in title:
        logic = "Iterate through the array and accumulate the total."
        code_exp = "`sumArray()` takes an array and its size, uses a for loop to add each element, and returns the sum. `main()` reads array and prints sum."
    elif "Average of Array Elements" in title:
        logic = "Compute the average as sum of elements divided by number of elements."
        code_exp = "`averageArray()` calls sumArray() (or computes sum directly) and divides by n (using float division). `main()` reads array and prints average."
    elif "Linear Search" in title:
        logic = "Search for a key in an array by checking each element sequentially. Return index if found, else -1."
        code_exp = "`linearSearch()` loops through array, compares each element with key, returns index if found. `main()` reads array and key, prints result."

    # New project explanations (25)
    elif "Constants" in title and "const and #define" in title:
        logic = "Use both `const` and `#define` to define the constant PI, then compute area of a circle."
        code_exp = "Two methods: `const double PI = 3.14159;` and `#define PI 3.14159`. The program reads radius, calculates area using both, and prints results."
    elif "Type Conversion" in title:
        logic = "Demonstrate implicit conversion (e.g., int to float in division) and explicit casting (e.g., (float)int)."
        code_exp = "Program shows: implicit conversion when dividing int by int stored in float, and explicit cast to get float division. Also shows truncation when casting float to int."
    elif "Relational Operators" in title and "Compare Two Numbers" in title:
        logic = "Use all relational operators (>, <, >=, <=, ==, !=) to compare two integers and print the results."
        code_exp = "Read two numbers, then print the result of each relational operation (1 for true, 0 for false)."
    elif "Logical Operators" in title and "Leap Year" in title:
        logic = "A year is a leap year if divisible by 400 or (divisible by 4 and not by 100). Use logical && and ||."
        code_exp = "`isLeap()` returns 1 if year satisfies leap condition. In main, read year and print result."
    elif "Compound Assignment" in title:
        logic = "Demonstrate +=, -=, *=, /=, %= on a variable."
        code_exp = "Start with a variable, apply each compound operator with a value, and print the result after each step."
    elif "Increment and Decrement" in title:
        logic = "Show difference between prefix (++i) and postfix (i++) increment/decrement."
        code_exp = "Declare a variable, print its value using prefix and postfix in expressions, and explain the output."
    elif "Formatted Input" in title and "scanf" in title:
        logic = "Use scanf to read different data types (int, float, char) with appropriate format specifiers."
        code_exp = "Read an integer, a float, and a character, then print them back using printf with proper format."
    elif "Expression Precedence" in title:
        logic = "Evaluate a complex expression involving multiple operators to understand precedence and associativity."
        code_exp = "Compute an expression like a + b * c - d / e and print the result, explaining the order."
    elif "While Loop" in title and "Print Numbers" in title:
        logic = "Use a while loop to print numbers from 1 to N."
        code_exp = "Initialize counter, while condition, print and increment inside loop."
    elif "While Loop" in title and "Sum of First N" in title:
        logic = "Compute sum of first N natural numbers using a while loop."
        code_exp = "Accumulate sum in a variable while iterating from 1 to N."
    elif "Do-While Loop" in title and "Menu-Driven Calculator" in title:
        logic = "Present a menu of operations (add, subtract, etc.) and repeat until user chooses exit, using do-while."
        code_exp = "Display menu, read choice, perform operation using switch, loop while choice != exit."
    elif "Do-While Loop" in title and "Guess the Number" in title:
        logic = "Generate a random number, let user guess, give hints, repeat until correct using do-while."
        code_exp = "Use rand() to generate number, do-while loop to keep asking, compare guess and give feedback."
    elif "For Loop" in title and "Multiplication Table" in title:
        logic = "Print multiplication table of a given number using for loop."
        code_exp = "Loop from 1 to 10, print number * i."
    elif "For Loop" in title and "Sum of Squares" in title:
        logic = "Compute sum of squares 1^2 + 2^2 + ... + n^2 using for loop."
        code_exp = "Accumulate i*i in a loop."
    elif "Break in Loop" in title:
        logic = "Find the first number in a range that is divisible by both 7 and 5 using break."
        code_exp = "Loop from a start to end, check condition, if found print and break."
    elif "Continue in Loop" in title:
        logic = "Print numbers from 1 to 20 skipping multiples of 3 using continue."
        code_exp = "Loop 1 to 20, if i%3==0 continue, else print."
    elif "Nested Loops" in title and "Right-Angled Triangle" in title:
        logic = "Print a right-angled triangle of stars with nested loops."
        code_exp = "Outer loop for rows, inner loop for columns, print stars accordingly."
    elif "Nested Loops" in title and "Pyramid Pattern" in title:
        logic = "Print a centered pyramid pattern using nested loops."
        code_exp = "Outer loop for rows, inner loops for spaces and stars."
    elif "Nested Loops" in title and "Diamond Pattern" in title:
        logic = "Print a diamond pattern using nested loops."
        code_exp = "Two parts: upper pyramid and lower inverted pyramid."
    elif "Nested Loops" in title and "Multiplication Table Grid" in title:
        logic = "Print a 10x10 multiplication table grid using nested loops."
        code_exp = "Outer loop for rows 1-10, inner for columns 1-10, print product formatted."
    elif "While vs Do-While" in title:
        logic = "Demonstrate that do-while executes at least once even if condition is false initially."
        code_exp = "Two loops: while with false condition (no output) and do-while with same condition (executes once)."
    elif "For Loop with Multiple Counters" in title:
        logic = "Use for loop with multiple counters to print pairs (i,j) for i=1..3, j=1..3."
        code_exp = "Nested for loops, print i and j."
    elif "Simple Interest" in title:
        logic = "Calculate simple interest: SI = (P * R * T) / 100."
        code_exp = "Read principal, rate, time; compute and print interest."
    elif "Temperature Conversion" in title:
        logic = "Convert Celsius to Fahrenheit and vice versa using formulas."
        code_exp = "Menu-driven: choose conversion, read temperature, apply formula, print result."
    elif "ASCII Values" in title:
        logic = "Print ASCII values of uppercase letters A to Z."
        code_exp = "Loop from 'A' to 'Z', print character and its integer value."

    else:
        # Fallback generic explanation
        logic = f"Standard algorithm for {title}."
        code_exp = f"The C code implements {title} as described in the example."

    return logic, code_exp


# ============================================
# Project data for 50 projects
# ============================================

projects = []
c_files = {}  # filename -> code string

# --- 25 Sample Projects (from original) ---
sample_projects = [
    {
        "title": "Add Two Numbers",
        "difficulty": "Beginner",
        "description": "Write a function that takes two integers and returns their sum.",
        "exampleText": "Enter two numbers: 5 7",
        "exampleOutput": "Sum = 12",
        "learningOutcome": "Basic function definition, return value.",
        "code": r"""#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main() {
    int x, y;
    printf("Enter two numbers: ");
    scanf("%d %d", &x, &y);
    printf("Sum = %d\n", add(x, y));
    return 0;
}
"""
    },
    {
        "title": "Subtract Two Numbers",
        "difficulty": "Beginner",
        "description": "Write a function that subtracts the second integer from the first and returns the result.",
        "exampleText": "Enter two numbers: 10 3",
        "exampleOutput": "Difference = 7",
        "learningOutcome": "Function with subtraction.",
        "code": r"""#include <stdio.h>

int subtract(int a, int b) {
    return a - b;
}

int main() {
    int x, y;
    printf("Enter two numbers: ");
    scanf("%d %d", &x, &y);
    printf("Difference = %d\n", subtract(x, y));
    return 0;
}
"""
    },
    {
        "title": "Multiply Two Numbers",
        "difficulty": "Beginner",
        "description": "Write a function that multiplies two integers and returns the product.",
        "exampleText": "Enter two numbers: 4 6",
        "exampleOutput": "Product = 24",
        "learningOutcome": "Multiplication in function.",
        "code": r"""#include <stdio.h>

int multiply(int a, int b) {
    return a * b;
}

int main() {
    int x, y;
    printf("Enter two numbers: ");
    scanf("%d %d", &x, &y);
    printf("Product = %d\n", multiply(x, y));
    return 0;
}
"""
    },
    {
        "title": "Divide Two Numbers (Integer Division)",
        "difficulty": "Beginner",
        "description": "Write a function that divides the first integer by the second (non‑zero) and returns the integer quotient.",
        "exampleText": "Enter two numbers: 15 4",
        "exampleOutput": "Quotient = 3",
        "learningOutcome": "Integer division, handling zero (optional).",
        "code": r"""#include <stdio.h>

int divide(int a, int b) {
    if (b == 0) {
        printf("Error: Division by zero\n");
        return 0;
    }
    return a / b;
}

int main() {
    int x, y;
    printf("Enter two numbers: ");
    scanf("%d %d", &x, &y);
    printf("Quotient = %d\n", divide(x, y));
    return 0;
}
"""
    },
    {
        "title": "Factorial (Iterative)",
        "difficulty": "Beginner",
        "description": "Write a function to compute the factorial of a non‑negative integer using iteration.",
        "exampleText": "Enter a number: 5",
        "exampleOutput": "Factorial = 120",
        "learningOutcome": "Iterative loops, factorial concept.",
        "code": r"""#include <stdio.h>

int factorialIter(int n) {
    int fact = 1;
    for (int i = 1; i <= n; i++)
        fact *= i;
    return fact;
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    if (n < 0)
        printf("Factorial not defined for negative numbers.\n");
    else
        printf("Factorial = %d\n", factorialIter(n));
    return 0;
}
"""
    },
    {
        "title": "Factorial (Recursive)",
        "difficulty": "Beginner",
        "description": "Write a recursive function to compute the factorial of a non‑negative integer.",
        "exampleText": "Enter a number: 5",
        "exampleOutput": "Factorial = 120",
        "learningOutcome": "Recursion, base case.",
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
        "title": "Check Prime Number",
        "difficulty": "Beginner",
        "description": "Write a function that returns 1 if a number is prime, 0 otherwise.",
        "exampleText": "Enter a number: 17",
        "exampleOutput": "Prime",
        "learningOutcome": "Prime checking, loops, sqrt optimization.",
        "code": r"""#include <stdio.h>
#include <math.h>

int isPrime(int n) {
    if (n <= 1) return 0;
    for (int i = 2; i <= sqrt(n); i++)
        if (n % i == 0) return 0;
    return 1;
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    if (isPrime(n))
        printf("Prime\n");
    else
        printf("Not Prime\n");
    return 0;
}
"""
    },
    {
        "title": "Check Even or Odd",
        "difficulty": "Beginner",
        "description": "Write a function that returns 1 if a number is even, 0 if odd.",
        "exampleText": "Enter a number: 8",
        "exampleOutput": "Even",
        "learningOutcome": "Modulo operator, conditional.",
        "code": r"""#include <stdio.h>

int isEven(int n) {
    return n % 2 == 0;
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    if (isEven(n))
        printf("Even\n");
    else
        printf("Odd\n");
    return 0;
}
"""
    },
    {
        "title": "Maximum of Two Numbers",
        "difficulty": "Beginner",
        "description": "Write a function that returns the larger of two integers.",
        "exampleText": "Enter two numbers: 12 9",
        "exampleOutput": "Maximum = 12",
        "learningOutcome": "Comparison and conditional.",
        "code": r"""#include <stdio.h>

int max(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    int x, y;
    printf("Enter two numbers: ");
    scanf("%d %d", &x, &y);
    printf("Maximum = %d\n", max(x, y));
    return 0;
}
"""
    },
    {
        "title": "Minimum of Two Numbers",
        "difficulty": "Beginner",
        "description": "Write a function that returns the smaller of two integers.",
        "exampleText": "Enter two numbers: 12 9",
        "exampleOutput": "Minimum = 9",
        "learningOutcome": "Comparison and conditional.",
        "code": r"""#include <stdio.h>

int min(int a, int b) {
    return (a < b) ? a : b;
}

int main() {
    int x, y;
    printf("Enter two numbers: ");
    scanf("%d %d", &x, &y);
    printf("Minimum = %d\n", min(x, y));
    return 0;
}
"""
    },
    {
        "title": "Power (Iterative)",
        "difficulty": "Beginner",
        "description": "Write a function to compute base raised to exponent (non‑negative) using iteration.",
        "exampleText": "Enter base and exponent: 2 5",
        "exampleOutput": "2^5 = 32",
        "learningOutcome": "Loop for exponentiation.",
        "code": r"""#include <stdio.h>

int powerIter(int base, int exp) {
    int result = 1;
    for (int i = 0; i < exp; i++)
        result *= base;
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
        "title": "Power (Recursive)",
        "difficulty": "Beginner",
        "description": "Write a recursive function to compute base raised to exponent (non‑negative).",
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
        "title": "Sum of Digits",
        "difficulty": "Beginner",
        "description": "Write a function that returns the sum of the digits of a positive integer.",
        "exampleText": "Enter a number: 1234",
        "exampleOutput": "Sum of digits = 10",
        "learningOutcome": "Digit extraction using modulo and division.",
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
        "title": "Reverse a Number",
        "difficulty": "Beginner",
        "description": "Write a function that returns the reverse of a given integer.",
        "exampleText": "Enter a number: 1234",
        "exampleOutput": "Reversed number = 4321",
        "learningOutcome": "Building reversed number.",
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
        "description": "Write a function that checks if a number is a palindrome (reads the same forwards and backwards).",
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
        "title": "Fibonacci (Iterative)",
        "difficulty": "Beginner",
        "description": "Write a function to return the nth Fibonacci number using iteration.",
        "exampleText": "Enter n: 6",
        "exampleOutput": "Fibonacci(6) = 8",
        "learningOutcome": "Iterative Fibonacci.",
        "code": r"""#include <stdio.h>

int fibIter(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1, c;
    for (int i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return b;
}

int main() {
    int n;
    printf("Enter n: ");
    scanf("%d", &n);
    printf("Fibonacci(%d) = %d\n", n, fibIter(n));
    return 0;
}
"""
    },
    {
        "title": "Fibonacci (Recursive)",
        "difficulty": "Beginner",
        "description": "Write a recursive function to return the nth Fibonacci number.",
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
        "title": "GCD (Euclidean Algorithm)",
        "difficulty": "Beginner",
        "description": "Write a function to compute the greatest common divisor of two integers using the Euclidean algorithm.",
        "exampleText": "Enter two numbers: 48 18",
        "exampleOutput": "GCD = 6",
        "learningOutcome": "Euclidean algorithm, recursion or loop.",
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
        "title": "LCM",
        "difficulty": "Beginner",
        "description": "Write a function to compute the least common multiple of two integers.",
        "exampleText": "Enter two numbers: 12 18",
        "exampleOutput": "LCM = 36",
        "learningOutcome": "Relation LCM = a*b / GCD.",
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
    return (a / gcd(a, b)) * b;  // to avoid overflow, divide first
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
        "title": "Count Digits",
        "difficulty": "Beginner",
        "description": "Write a function that returns the number of digits in a positive integer.",
        "exampleText": "Enter a number: 98765",
        "exampleOutput": "Number of digits = 5",
        "learningOutcome": "Loop to count digits.",
        "code": r"""#include <stdio.h>

int countDigits(int n) {
    if (n == 0) return 1;  // special case: 0 has 1 digit
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
        "title": "Armstrong Number",
        "difficulty": "Beginner",
        "description": "Write a function to check if a number is an Armstrong number (sum of its digits each raised to the power of number of digits equals the number).",
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
        "difficulty": "Beginner",
        "description": "Write a function to check if a number is perfect (equal to sum of its proper divisors).",
        "exampleText": "Enter a number: 28",
        "exampleOutput": "Perfect",
        "learningOutcome": "Divisor sum.",
        "code": r"""#include <stdio.h>

int isPerfect(int n) {
    int sum = 0;
    for (int i = 1; i <= n/2; i++)
        if (n % i == 0) sum += i;
    return sum == n && n != 0;
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
        "title": "Sum of Array Elements",
        "difficulty": "Beginner",
        "description": "Write a function that takes an integer array and its size, and returns the sum of all elements.",
        "exampleText": "Enter size: 5\nEnter elements: 1 2 3 4 5",
        "exampleOutput": "Sum = 15",
        "learningOutcome": "Array traversal, function with array parameter.",
        "code": r"""#include <stdio.h>

int sumArray(int arr[], int n) {
    int sum = 0;
    for (int i = 0; i < n; i++)
        sum += arr[i];
    return sum;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);
    printf("Sum = %d\n", sumArray(arr, n));
    return 0;
}
"""
    },
    {
        "title": "Average of Array Elements",
        "difficulty": "Beginner",
        "description": "Write a function that takes an integer array and its size, and returns the average as a float.",
        "exampleText": "Enter size: 5\nEnter elements: 1 2 3 4 5",
        "exampleOutput": "Average = 3.000000",
        "learningOutcome": "Floating point division, array sum.",
        "code": r"""#include <stdio.h>

float averageArray(int arr[], int n) {
    int sum = 0;
    for (int i = 0; i < n; i++)
        sum += arr[i];
    return (float)sum / n;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);
    printf("Average = %f\n", averageArray(arr, n));
    return 0;
}
"""
    },
    {
        "title": "Linear Search",
        "difficulty": "Beginner",
        "description": "Write a function that searches for a key in an array. Return the index if found, otherwise -1.",
        "exampleText": "Enter size: 6\nEnter elements: 2 4 6 8 10 12\nEnter key: 8",
        "exampleOutput": "Key found at index 3",
        "learningOutcome": "Array search, loop, conditional.",
        "code": r"""#include <stdio.h>

int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++)
        if (arr[i] == key) return i;
    return -1;
}

int main() {
    int n, key;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);
    printf("Enter key: ");
    scanf("%d", &key);
    int index = linearSearch(arr, n, key);
    if (index != -1)
        printf("Key found at index %d\n", index);
    else
        printf("Key not found\n");
    return 0;
}
"""
    }
]

# Add sample projects to projects list with new IDs P001-P025
for i, sp in enumerate(sample_projects, start=1):
    pid = f"P{i:03d}"
    project = {
        "projectId": pid,
        "title": sp["title"],
        "difficulty": sp["difficulty"],
        "description": sp["description"],
        "exampleText": sp["exampleText"],
        "exampleOutput": sp["exampleOutput"],
        "answerFile": f"./answers/{pid}.c",
        "learningOutcome": sp["learningOutcome"]
    }
    # Add explanations
    logic, code_exp = generate_explanations(project, sp["code"])
    project["logicExplanation"] = logic
    project["codeExplanation"] = code_exp
    projects.append(project)
    c_files[f"{pid}.c"] = sp["code"]

# --- 25 New Projects ---
new_projects_data = [
    {
        "title": "Demonstrate Constants (const and #define)",
        "difficulty": "Beginner",
        "description": "Write a program to calculate the area of a circle using PI defined as a constant via const and #define. Show both methods.",
        "exampleText": "Enter radius: 5",
        "exampleOutput": "Area (using const) = 78.539816\nArea (using #define) = 78.539816",
        "learningOutcome": "Understanding constants in C, const keyword, preprocessor #define.",
        "code": r"""#include <stdio.h>
#define PI_DEFINE 3.14159

int main() {
    const double PI_CONST = 3.14159;
    double radius, area_const, area_define;
    printf("Enter radius: ");
    scanf("%lf", &radius);
    area_const = PI_CONST * radius * radius;
    area_define = PI_DEFINE * radius * radius;
    printf("Area (using const) = %f\n", area_const);
    printf("Area (using #define) = %f\n", area_define);
    return 0;
}
"""
    },
    {
        "title": "Type Conversion (Implicit and Explicit)",
        "difficulty": "Beginner",
        "description": "Demonstrate implicit conversion and explicit casting in C.",
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
        "title": "Relational Operators – Compare Two Numbers",
        "difficulty": "Beginner",
        "description": "Use all relational operators to compare two integers and print the results (1 for true, 0 for false).",
        "exampleText": "Enter two numbers: 10 20",
        "exampleOutput": "10 > 20 : 0\n10 < 20 : 1\n10 >= 20 : 0\n10 <= 20 : 1\n10 == 20 : 0\n10 != 20 : 1",
        "learningOutcome": "Understanding relational operators and their output.",
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
        "description": "Check if a given year is a leap year using logical operators (&&, ||).",
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
        "title": "Compound Assignment Operators",
        "difficulty": "Beginner",
        "description": "Demonstrate the use of +=, -=, *=, /=, %= on a variable.",
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
        "description": "Show the difference between prefix and postfix increment/decrement.",
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
        "title": "Formatted Input with scanf – Read Multiple Types",
        "difficulty": "Beginner",
        "description": "Use scanf to read an integer, a float, and a character, then print them back.",
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
        "title": "Expression Precedence – Evaluate Complex Expression",
        "difficulty": "Beginner",
        "description": "Evaluate an expression involving multiple operators to understand precedence and associativity.",
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
        "title": "For Loop – Sum of Squares Series",
        "difficulty": "Beginner",
        "description": "Compute the sum of squares: 1^2 + 2^2 + ... + n^2 using a for loop.",
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
        "title": "Break in Loop – Find First Number Divisible by 7 and 5",
        "difficulty": "Intermediate",
        "description": "Find the first number in a given range that is divisible by both 7 and 5 using break.",
        "exampleText": "Enter start and end: 1 100",
        "exampleOutput": "First number divisible by 7 and 5 is 35",
        "learningOutcome": "Using break to exit loop early.",
        "code": r"""#include <stdio.h>

int main() {
    int start, end, i, found = 0;
    printf("Enter start and end: ");
    scanf("%d %d", &start, &end);
    for (i = start; i <= end; i++) {
        if (i % 7 == 0 && i % 5 == 0) {
            printf("First number divisible by 7 and 5 is %d\n", i);
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
        "exampleText": "Numbers from 1 to 20 skipping multiples of 3:",
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
        "title": "Nested Loops – Pyramid Pattern",
        "difficulty": "Intermediate",
        "description": "Print a centered pyramid of stars using nested loops.",
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
        "description": "Print a diamond pattern of stars using nested loops.",
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
        "title": "While vs Do-While – Demonstrate Difference",
        "difficulty": "Beginner",
        "description": "Show that a do-while loop executes at least once even if the condition is false initially, while a while loop may not execute.",
        "exampleText": "",
        "exampleOutput": "While loop with condition false: (no output)\nDo-while with same condition: This executes once!",
        "learningOutcome": "Difference between while and do-while.",
        "code": r"""#include <stdio.h>

int main() {
    int x = 10;
    printf("While loop with condition false:\n");
    while (x < 10) {
        printf("This won't print.\n");
    }
    printf("Do-while with same condition:\n");
    do {
        printf("This executes once!\n");
    } while (x < 10);
    return 0;
}
"""
    },
    {
        "title": "For Loop with Multiple Counters – Nested Pairs",
        "difficulty": "Intermediate",
        "description": "Use nested for loops to print pairs (i, j) for i = 1..3 and j = 1..3.",
        "exampleText": "",
        "exampleOutput": "(1,1) (1,2) (1,3)\n(2,1) (2,2) (2,3)\n(3,1) (3,2) (3,3)",
        "learningOutcome": "Nested loops with multiple counters.",
        "code": r"""#include <stdio.h>

int main() {
    int i, j;
    for (i = 1; i <= 3; i++) {
        for (j = 1; j <= 3; j++) {
            printf("(%d,%d) ", i, j);
        }
        printf("\n");
    }
    return 0;
}
"""
    },
    {
        "title": "Simple Interest Calculation",
        "difficulty": "Beginner",
        "description": "Calculate simple interest given principal, rate, and time.",
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
    },
    {
        "title": "Temperature Conversion (C to F and F to C)",
        "difficulty": "Beginner",
        "description": "Convert Celsius to Fahrenheit and Fahrenheit to Celsius using a menu.",
        "exampleText": "1. C to F\n2. F to C\nEnter choice: 1\nEnter temperature in C: 100",
        "exampleOutput": "100.00 C = 212.00 F",
        "learningOutcome": "Menu, arithmetic, and format specifiers.",
        "code": r"""#include <stdio.h>

int main() {
    int choice;
    float temp, converted;
    printf("1. Celsius to Fahrenheit\n2. Fahrenheit to Celsius\n");
    printf("Enter choice: ");
    scanf("%d", &choice);
    if (choice == 1) {
        printf("Enter temperature in Celsius: ");
        scanf("%f", &temp);
        converted = (temp * 9/5) + 32;
        printf("%.2f C = %.2f F\n", temp, converted);
    } else if (choice == 2) {
        printf("Enter temperature in Fahrenheit: ");
        scanf("%f", &temp);
        converted = (temp - 32) * 5/9;
        printf("%.2f F = %.2f C\n", temp, converted);
    } else {
        printf("Invalid choice.\n");
    }
    return 0;
}
"""
    },
    {
        "title": "Print ASCII Values of Uppercase Letters",
        "difficulty": "Beginner",
        "description": "Print the ASCII values of uppercase letters A to Z using a loop.",
        "exampleText": "",
        "exampleOutput": "A = 65\nB = 66\n...\nZ = 90",
        "learningOutcome": "Characters as integers, for loop.",
        "code": r"""#include <stdio.h>

int main() {
    char ch;
    for (ch = 'A'; ch <= 'Z'; ch++) {
        printf("%c = %d\n", ch, ch);
    }
    return 0;
}
"""
    }
]

# Add new projects with IDs P026-P050
for i, np in enumerate(new_projects_data, start=26):
    pid = f"P{i:03d}"
    project = {
        "projectId": pid,
        "title": np["title"],
        "difficulty": np["difficulty"],
        "description": np["description"],
        "exampleText": np["exampleText"],
        "exampleOutput": np["exampleOutput"],
        "answerFile": f"./answers/{pid}.c",
        "learningOutcome": np["learningOutcome"]
    }
    logic, code_exp = generate_explanations(project, np["code"])
    project["logicExplanation"] = logic
    project["codeExplanation"] = code_exp
    projects.append(project)
    c_files[f"{pid}.c"] = np["code"]

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