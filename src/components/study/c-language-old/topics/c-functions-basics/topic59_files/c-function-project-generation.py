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

    # Logic and code explanations based on title
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
    elif "Even/Odd" in title:
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
    else:
        # Fallback generic explanation
        logic = f"Standard algorithm for {title}."
        code_exp = f"The C code implements {title} as described in the example."

    return logic, code_exp


# ============================================
# JSON data containing 25 basic function projects
# ============================================
json_data = {
    "projectCategory": "C Programming – 25 Basic Function Projects",
    "subject": "Computer Science (C Programming)",
    "board": "WBCHSE / CBSE / ISC",
    "class": "XI - XII",
    "tools": ["GCC", "Turbo C", "VS Code", "Code::Blocks"],
    "institute": {
        "author": "Sukanta Hui",
        "name": "Coder & AccoTax",
        "location": "Barrackpore & Naihati"
    },
    "projects": [
        {
            "projectId": "F001",
            "title": "Add Two Numbers",
            "difficulty": "Beginner",
            "description": "Write a function that takes two integers and returns their sum.",
            "exampleText": "Enter two numbers: 5 7",
            "exampleOutput": "Sum = 12",
            "answerFile": "./answers/F001.c",
            "learningOutcome": "Basic function definition, return value."
        },
        {
            "projectId": "F002",
            "title": "Subtract Two Numbers",
            "difficulty": "Beginner",
            "description": "Write a function that subtracts the second integer from the first and returns the result.",
            "exampleText": "Enter two numbers: 10 3",
            "exampleOutput": "Difference = 7",
            "answerFile": "./answers/F002.c",
            "learningOutcome": "Function with subtraction."
        },
        {
            "projectId": "F003",
            "title": "Multiply Two Numbers",
            "difficulty": "Beginner",
            "description": "Write a function that multiplies two integers and returns the product.",
            "exampleText": "Enter two numbers: 4 6",
            "exampleOutput": "Product = 24",
            "answerFile": "./answers/F003.c",
            "learningOutcome": "Multiplication in function."
        },
        {
            "projectId": "F004",
            "title": "Divide Two Numbers (Integer Division)",
            "difficulty": "Beginner",
            "description": "Write a function that divides the first integer by the second (non‑zero) and returns the integer quotient.",
            "exampleText": "Enter two numbers: 15 4",
            "exampleOutput": "Quotient = 3",
            "answerFile": "./answers/F004.c",
            "learningOutcome": "Integer division, handling zero (optional)."
        },
        {
            "projectId": "F005",
            "title": "Factorial (Iterative)",
            "difficulty": "Beginner",
            "description": "Write a function to compute the factorial of a non‑negative integer using iteration.",
            "exampleText": "Enter a number: 5",
            "exampleOutput": "Factorial = 120",
            "answerFile": "./answers/F005.c",
            "learningOutcome": "Iterative loops, factorial concept."
        },
        {
            "projectId": "F006",
            "title": "Factorial (Recursive)",
            "difficulty": "Beginner",
            "description": "Write a recursive function to compute the factorial of a non‑negative integer.",
            "exampleText": "Enter a number: 5",
            "exampleOutput": "Factorial = 120",
            "answerFile": "./answers/F006.c",
            "learningOutcome": "Recursion, base case."
        },
        {
            "projectId": "F007",
            "title": "Check Prime Number",
            "difficulty": "Beginner",
            "description": "Write a function that returns 1 if a number is prime, 0 otherwise.",
            "exampleText": "Enter a number: 17",
            "exampleOutput": "Prime",
            "answerFile": "./answers/F007.c",
            "learningOutcome": "Prime checking, loops, sqrt optimization."
        },
        {
            "projectId": "F008",
            "title": "Check Even or Odd",
            "difficulty": "Beginner",
            "description": "Write a function that returns 1 if a number is even, 0 if odd.",
            "exampleText": "Enter a number: 8",
            "exampleOutput": "Even",
            "answerFile": "./answers/F008.c",
            "learningOutcome": "Modulo operator, conditional."
        },
        {
            "projectId": "F009",
            "title": "Maximum of Two Numbers",
            "difficulty": "Beginner",
            "description": "Write a function that returns the larger of two integers.",
            "exampleText": "Enter two numbers: 12 9",
            "exampleOutput": "Maximum = 12",
            "answerFile": "./answers/F009.c",
            "learningOutcome": "Comparison and conditional."
        },
        {
            "projectId": "F010",
            "title": "Minimum of Two Numbers",
            "difficulty": "Beginner",
            "description": "Write a function that returns the smaller of two integers.",
            "exampleText": "Enter two numbers: 12 9",
            "exampleOutput": "Minimum = 9",
            "answerFile": "./answers/F010.c",
            "learningOutcome": "Comparison and conditional."
        },
        {
            "projectId": "F011",
            "title": "Power (Iterative)",
            "difficulty": "Beginner",
            "description": "Write a function to compute base raised to exponent (non‑negative) using iteration.",
            "exampleText": "Enter base and exponent: 2 5",
            "exampleOutput": "2^5 = 32",
            "answerFile": "./answers/F011.c",
            "learningOutcome": "Loop for exponentiation."
        },
        {
            "projectId": "F012",
            "title": "Power (Recursive)",
            "difficulty": "Beginner",
            "description": "Write a recursive function to compute base raised to exponent (non‑negative).",
            "exampleText": "Enter base and exponent: 2 5",
            "exampleOutput": "2^5 = 32",
            "answerFile": "./answers/F012.c",
            "learningOutcome": "Recursion for exponentiation."
        },
        {
            "projectId": "F013",
            "title": "Sum of Digits",
            "difficulty": "Beginner",
            "description": "Write a function that returns the sum of the digits of a positive integer.",
            "exampleText": "Enter a number: 1234",
            "exampleOutput": "Sum of digits = 10",
            "answerFile": "./answers/F013.c",
            "learningOutcome": "Digit extraction using modulo and division."
        },
        {
            "projectId": "F014",
            "title": "Reverse a Number",
            "difficulty": "Beginner",
            "description": "Write a function that returns the reverse of a given integer.",
            "exampleText": "Enter a number: 1234",
            "exampleOutput": "Reversed number = 4321",
            "answerFile": "./answers/F014.c",
            "learningOutcome": "Building reversed number."
        },
        {
            "projectId": "F015",
            "title": "Palindrome Number",
            "difficulty": "Beginner",
            "description": "Write a function that checks if a number is a palindrome (reads the same forwards and backwards).",
            "exampleText": "Enter a number: 1221",
            "exampleOutput": "Palindrome",
            "answerFile": "./answers/F015.c",
            "learningOutcome": "Reversing and comparing."
        },
        {
            "projectId": "F016",
            "title": "Fibonacci (Iterative)",
            "difficulty": "Beginner",
            "description": "Write a function to return the nth Fibonacci number using iteration.",
            "exampleText": "Enter n: 6",
            "exampleOutput": "Fibonacci(6) = 8",
            "answerFile": "./answers/F016.c",
            "learningOutcome": "Iterative Fibonacci."
        },
        {
            "projectId": "F017",
            "title": "Fibonacci (Recursive)",
            "difficulty": "Beginner",
            "description": "Write a recursive function to return the nth Fibonacci number.",
            "exampleText": "Enter n: 6",
            "exampleOutput": "Fibonacci(6) = 8",
            "answerFile": "./answers/F017.c",
            "learningOutcome": "Recursive Fibonacci."
        },
        {
            "projectId": "F018",
            "title": "GCD (Euclidean Algorithm)",
            "difficulty": "Beginner",
            "description": "Write a function to compute the greatest common divisor of two integers using the Euclidean algorithm.",
            "exampleText": "Enter two numbers: 48 18",
            "exampleOutput": "GCD = 6",
            "answerFile": "./answers/F018.c",
            "learningOutcome": "Euclidean algorithm, recursion or loop."
        },
        {
            "projectId": "F019",
            "title": "LCM",
            "difficulty": "Beginner",
            "description": "Write a function to compute the least common multiple of two integers.",
            "exampleText": "Enter two numbers: 12 18",
            "exampleOutput": "LCM = 36",
            "answerFile": "./answers/F019.c",
            "learningOutcome": "Relation LCM = a*b / GCD."
        },
        {
            "projectId": "F020",
            "title": "Count Digits",
            "difficulty": "Beginner",
            "description": "Write a function that returns the number of digits in a positive integer.",
            "exampleText": "Enter a number: 98765",
            "exampleOutput": "Number of digits = 5",
            "answerFile": "./answers/F020.c",
            "learningOutcome": "Loop to count digits."
        },
        {
            "projectId": "F021",
            "title": "Armstrong Number",
            "difficulty": "Beginner",
            "description": "Write a function to check if a number is an Armstrong number (sum of its digits each raised to the power of number of digits equals the number).",
            "exampleText": "Enter a number: 153",
            "exampleOutput": "Armstrong",
            "answerFile": "./answers/F021.c",
            "learningOutcome": "Digit extraction, power calculation."
        },
        {
            "projectId": "F022",
            "title": "Perfect Number",
            "difficulty": "Beginner",
            "description": "Write a function to check if a number is perfect (equal to sum of its proper divisors).",
            "exampleText": "Enter a number: 28",
            "exampleOutput": "Perfect",
            "answerFile": "./answers/F022.c",
            "learningOutcome": "Divisor sum."
        },
        {
            "projectId": "F023",
            "title": "Sum of Array Elements",
            "difficulty": "Beginner",
            "description": "Write a function that takes an integer array and its size, and returns the sum of all elements.",
            "exampleText": "Enter size: 5\nEnter elements: 1 2 3 4 5",
            "exampleOutput": "Sum = 15",
            "answerFile": "./answers/F023.c",
            "learningOutcome": "Array traversal, function with array parameter."
        },
        {
            "projectId": "F024",
            "title": "Average of Array Elements",
            "difficulty": "Beginner",
            "description": "Write a function that takes an integer array and its size, and returns the average as a float.",
            "exampleText": "Enter size: 5\nEnter elements: 1 2 3 4 5",
            "exampleOutput": "Average = 3.000000",
            "answerFile": "./answers/F024.c",
            "learningOutcome": "Floating point division, array sum."
        },
        {
            "projectId": "F025",
            "title": "Linear Search",
            "difficulty": "Beginner",
            "description": "Write a function that searches for a key in an array. Return the index if found, otherwise -1.",
            "exampleText": "Enter size: 6\nEnter elements: 2 4 6 8 10 12\nEnter key: 8",
            "exampleOutput": "Key found at index 3",
            "answerFile": "./answers/F025.c",
            "learningOutcome": "Array search, loop, conditional."
        }
    ]
}

# ============================================
# C code for each project (F001.c .. F025.c)
# ============================================
c_files_content = {
    "F001.c": r"""#include <stdio.h>

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
""",
    "F002.c": r"""#include <stdio.h>

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
""",
    "F003.c": r"""#include <stdio.h>

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
""",
    "F004.c": r"""#include <stdio.h>

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
""",
    "F005.c": r"""#include <stdio.h>

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
""",
    "F006.c": r"""#include <stdio.h>

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
""",
    "F007.c": r"""#include <stdio.h>
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
""",
    "F008.c": r"""#include <stdio.h>

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
""",
    "F009.c": r"""#include <stdio.h>

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
""",
    "F010.c": r"""#include <stdio.h>

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
""",
    "F011.c": r"""#include <stdio.h>

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
""",
    "F012.c": r"""#include <stdio.h>

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
""",
    "F013.c": r"""#include <stdio.h>

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
""",
    "F014.c": r"""#include <stdio.h>

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
""",
    "F015.c": r"""#include <stdio.h>

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
""",
    "F016.c": r"""#include <stdio.h>

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
""",
    "F017.c": r"""#include <stdio.h>

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
""",
    "F018.c": r"""#include <stdio.h>

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
""",
    "F019.c": r"""#include <stdio.h>

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
""",
    "F020.c": r"""#include <stdio.h>

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
""",
    "F021.c": r"""#include <stdio.h>
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
""",
    "F022.c": r"""#include <stdio.h>

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
""",
    "F023.c": r"""#include <stdio.h>

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
""",
    "F024.c": r"""#include <stdio.h>

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
""",
    "F025.c": r"""#include <stdio.h>

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

# ============================================
# Add explanation fields to each project
# ============================================
for proj in json_data["projects"]:
    pid = proj["projectId"]
    code = c_files_content.get(pid + ".c", "")
    logic, code_exp = generate_explanations(proj, code)
    proj["logicExplanation"] = logic
    proj["codeExplanation"] = code_exp

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
for filename, content in c_files_content.items():
    file_path = os.path.join(answers_dir, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"✅ Successfully created 'answers' folder with {len(c_files_content)} C files and 'basic-function-projects.json'")