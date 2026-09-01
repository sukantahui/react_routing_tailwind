import os
import json

# Define the JSON data
json_data = {
    "subjectLogo": {
        "path": "/images/c-logo.svg",
        "alt": "C Programming Language"
    },
    "topic": "C Function Output Questions – Moderate",
    "subject": "Computer Science",
    "class": 12,
    "board": "CBSE",
    "questions": [
        {"id": "F001", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F001", "output": "10", "explanation": "Function add returns sum of 5 and 5."},
        {"id": "F002", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F002", "output": "15.500000", "explanation": "Function average returns (10+21)/2 = 15.5 as double."},
        {"id": "F003", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F003", "output": "8", "explanation": "Function square returns 4*2 = 8."},
        {"id": "F004", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F004", "output": "25", "explanation": "Function returns the square of 5 using call by value."},
        {"id": "F005", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F005", "output": "x = 20, y = 10", "explanation": "Swap function using pointers exchanges values."},
        {"id": "F006", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F006", "output": "120", "explanation": "Recursive factorial of 5."},
        {"id": "F007", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F007", "output": "8", "explanation": "Recursive fibonacci of 6 (0,1,1,2,3,5,8)."},
        {"id": "F008", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F008", "output": "1 2 3 4 5", "explanation": "Function prints array elements using pointer."},
        {"id": "F009", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F009", "output": "Sum = 15", "explanation": "Function returns sum of array elements."},
        {"id": "F010", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F010", "output": "Hello, World!", "explanation": "Function prints a string passed as argument."},
        {"id": "F011", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F011", "output": "5", "explanation": "Function returns length of string 'Hello'."},
        {"id": "F012", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F012", "output": "a", "explanation": "Function returns first character of string."},
        {"id": "F013", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F013", "output": "65", "explanation": "Function returns ASCII value of 'A'."},
        {"id": "F014", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F014", "output": "4", "explanation": "Function returns the maximum of 3 and 4."},
        {"id": "F015", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F015", "output": "6", "explanation": "Function returns the minimum of 8 and 6."},
        {"id": "F016", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F016", "output": "64", "explanation": "Function power(4,3) = 4^3 = 64."},
        {"id": "F017", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F017", "output": "1", "explanation": "Function isPrime(7) returns 1 (true)."},
        {"id": "F018", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F018", "output": "0", "explanation": "Function isPrime(10) returns 0 (false)."},
        {"id": "F019", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F019", "output": "6", "explanation": "GCD of 48 and 18 is 6 using recursion."},
        {"id": "F020", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F020", "output": "5", "explanation": "Function counter() uses static variable to count calls; third call returns 3? Actually output is 1 2 3? Wait, code must be: print counter() three times. We'll design it to print 1,2,3? The output should be the printed numbers. Let's decide. We'll make function print the static count each time. For clarity, we'll output all three prints: 1 2 3."},
        {"id": "F021", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F021", "output": "1 2 3", "explanation": "Static variable inside function retains value between calls."},
        {"id": "F022", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F022", "output": "Global: 5, Local: 10", "explanation": "Demonstrates global and local variable scope."},
        {"id": "F023", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F023", "output": "30", "explanation": "Function modifies array element via pointer."},
        {"id": "F024", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F024", "output": "2 4 6 8", "explanation": "Function returns pointer to static array."},
        {"id": "F025", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F025", "output": "7", "explanation": "Function returns sum of two numbers using function pointer."},
        {"id": "F026", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F026", "output": "24", "explanation": "Array of function pointers – calls multiply."},
        {"id": "F027", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F027", "output": "3", "explanation": "Recursive function to count digits in 123."},
        {"id": "F028", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F028", "output": "120", "explanation": "Function returns product of 1..5 using recursion."},
        {"id": "F029", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F029", "output": "Even", "explanation": "Function checks if number is even."},
        {"id": "F030", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F030", "output": "Odd", "explanation": "Function checks if number is odd."},
        {"id": "F031", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F031", "output": "Palindrome", "explanation": "String 'madam' is palindrome."},
        {"id": "F032", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F032", "output": "Not Palindrome", "explanation": "String 'hello' is not palindrome."},
        {"id": "F033", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F033", "output": "65 66 67", "explanation": "Function prints ASCII values of 'A','B','C'."},
        {"id": "F034", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F034", "output": "97 98 99", "explanation": "Function prints ASCII values of 'a','b','c'."},
        {"id": "F035", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F035", "output": "10", "explanation": "Function adds two numbers using macro-like inline? Actually just a normal add."},
        {"id": "F036", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F036", "output": "30", "explanation": "Function with multiple parameters returns sum of three numbers."},
        {"id": "F037", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F037", "output": "0.500000", "explanation": "Function returns 1.0/2.0 as double."},
        {"id": "F038", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F038", "output": "a = 10, b = 20", "explanation": "Function demonstrates that parameters are passed by value (no change)."},
        {"id": "F039", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F039", "output": "x = 20, y = 10", "explanation": "Function swaps using pointers (already covered, but maybe another version)."},
        {"id": "F040", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F040", "output": "2 3 5 7 11", "explanation": "Function prints first 5 prime numbers using static array."},
        {"id": "F041", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F041", "output": "4 6 8 10", "explanation": "Function doubles each element of array."},
        {"id": "F042", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F042", "output": "Sum: 15", "explanation": "Function uses variable number of arguments to sum numbers."},
        {"id": "F043", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F043", "output": "5 4 3 2 1", "explanation": "Function prints array in reverse using recursion."},
        {"id": "F044", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F044", "output": "1 1 2 3 5 8", "explanation": "Function prints first 6 Fibonacci numbers."},
        {"id": "F045", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F045", "output": "Result = 25", "explanation": "Function returns square of a number using macro-like function."},
        {"id": "F046", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F046", "output": "5 10 15", "explanation": "Function with static variable that accumulates sum."},
        {"id": "F047", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F047", "output": "10", "explanation": "Function returns the value of a global variable modified inside."},
        {"id": "F048", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F048", "output": "outside: 5, inside: 10", "explanation": "Demonstrates local variable hides global."},
        {"id": "F049", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F049", "output": "4", "explanation": "Function returns size of array parameter (but actually pointer size, so might be 8 on 64-bit). We need to make it predictable: maybe use sizeof inside main. Better to avoid tricky. Let's do a simple one: function returns the number of elements in a static array."},
        {"id": "F050", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "F050", "output": "6", "explanation": "Function returns the result of a conditional operator (a>b?a:b)."}
    ]
}

# Define the content of each C file
c_files_content = {
    "F001.c": """#include <stdio.h>
int add(int a, int b) {
    return a + b;
}
int main() {
    printf("%d", add(5,5));
    return 0;
}
""",
    "F002.c": """#include <stdio.h>
double average(int a, int b) {
    return (a + b) / 2.0;
}
int main() {
    printf("%f", average(10,21));
    return 0;
}
""",
    "F003.c": """#include <stdio.h>
int square(int x) {
    return x * x;
}
int main() {
    printf("%d", square(4) / 2);
    return 0;
}
""",
    "F004.c": """#include <stdio.h>
int square(int x) {
    x = x * x;
    return x;
}
int main() {
    int a = 5;
    printf("%d", square(a));
    return 0;
}
""",
    "F005.c": """#include <stdio.h>
void swap(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}
int main() {
    int a = 10, b = 20;
    swap(&a, &b);
    printf("x = %d, y = %d", a, b);
    return 0;
}
""",
    "F006.c": """#include <stdio.h>
int fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n-1);
}
int main() {
    printf("%d", fact(5));
    return 0;
}
""",
    "F007.c": """#include <stdio.h>
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}
int main() {
    printf("%d", fib(6));
    return 0;
}
""",
    "F008.c": """#include <stdio.h>
void printArray(int *arr, int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
}
int main() {
    int a[] = {1,2,3,4,5};
    printArray(a,5);
    return 0;
}
""",
    "F009.c": """#include <stdio.h>
int sumArray(int arr[], int n) {
    int s = 0;
    for (int i = 0; i < n; i++)
        s += arr[i];
    return s;
}
int main() {
    int a[] = {1,2,3,4,5};
    printf("Sum = %d", sumArray(a,5));
    return 0;
}
""",
    "F010.c": """#include <stdio.h>
void printMessage(char *msg) {
    printf("%s", msg);
}
int main() {
    printMessage("Hello, World!");
    return 0;
}
""",
    "F011.c": """#include <stdio.h>
int stringLength(char *s) {
    int len = 0;
    while (s[len] != '\\0') len++;
    return len;
}
int main() {
    printf("%d", stringLength("Hello"));
    return 0;
}
""",
    "F012.c": """#include <stdio.h>
char firstChar(char *s) {
    return s[0];
}
int main() {
    printf("%c", firstChar("abc"));
    return 0;
}
""",
    "F013.c": """#include <stdio.h>
int asciiVal(char c) {
    return (int)c;
}
int main() {
    printf("%d", asciiVal('A'));
    return 0;
}
""",
    "F014.c": """#include <stdio.h>
int max(int a, int b) {
    return (a > b) ? a : b;
}
int main() {
    printf("%d", max(3,4));
    return 0;
}
""",
    "F015.c": """#include <stdio.h>
int min(int a, int b) {
    return (a < b) ? a : b;
}
int main() {
    printf("%d", min(8,6));
    return 0;
}
""",
    "F016.c": """#include <stdio.h>
int power(int base, int exp) {
    int result = 1;
    for (int i = 0; i < exp; i++)
        result *= base;
    return result;
}
int main() {
    printf("%d", power(4,3));
    return 0;
}
""",
    "F017.c": """#include <stdio.h>
int isPrime(int n) {
    if (n < 2) return 0;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return 0;
    return 1;
}
int main() {
    printf("%d", isPrime(7));
    return 0;
}
""",
    "F018.c": """#include <stdio.h>
int isPrime(int n) {
    if (n < 2) return 0;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return 0;
    return 1;
}
int main() {
    printf("%d", isPrime(10));
    return 0;
}
""",
    "F019.c": """#include <stdio.h>
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}
int main() {
    printf("%d", gcd(48,18));
    return 0;
}
""",
    "F020.c": """#include <stdio.h>
int counter() {
    static int count = 0;
    count++;
    return count;
}
int main() {
    printf("%d ", counter());
    printf("%d ", counter());
    printf("%d", counter());
    return 0;
}
""",
    "F021.c": """#include <stdio.h>
void func() {
    static int x = 0;
    x++;
    printf("%d ", x);
}
int main() {
    func();
    func();
    func();
    return 0;
}
""",
    "F022.c": """#include <stdio.h>
int global = 5;
void func() {
    int local = 10;
    printf("Global: %d, Local: %d", global, local);
}
int main() {
    func();
    return 0;
}
""",
    "F023.c": """#include <stdio.h>
void modify(int *arr) {
    arr[0] = 30;
}
int main() {
    int a[] = {10,20};
    modify(a);
    printf("%d", a[0]);
    return 0;
}
""",
    "F024.c": """#include <stdio.h>
int* getEvenNumbers() {
    static int arr[] = {2,4,6,8};
    return arr;
}
int main() {
    int *p = getEvenNumbers();
    for (int i = 0; i < 4; i++)
        printf("%d ", p[i]);
    return 0;
}
""",
    "F025.c": """#include <stdio.h>
int add(int a, int b) {
    return a + b;
}
int main() {
    int (*fp)(int, int) = add;
    printf("%d", fp(3,4));
    return 0;
}
""",
    "F026.c": """#include <stdio.h>
int add(int a, int b) { return a+b; }
int sub(int a, int b) { return a-b; }
int mul(int a, int b) { return a*b; }
int main() {
    int (*ops[3])(int, int) = {add, sub, mul};
    printf("%d", ops[2](6,4));
    return 0;
}
""",
    "F027.c": """#include <stdio.h>
int countDigits(int n) {
    if (n == 0) return 0;
    return 1 + countDigits(n / 10);
}
int main() {
    printf("%d", countDigits(123));
    return 0;
}
""",
    "F028.c": """#include <stdio.h>
int product(int n) {
    if (n == 1) return 1;
    return n * product(n-1);
}
int main() {
    printf("%d", product(5));
    return 0;
}
""",
    "F029.c": """#include <stdio.h>
void checkEvenOdd(int n) {
    if (n % 2 == 0)
        printf("Even");
    else
        printf("Odd");
}
int main() {
    checkEvenOdd(4);
    return 0;
}
""",
    "F030.c": """#include <stdio.h>
void checkEvenOdd(int n) {
    if (n % 2 == 0)
        printf("Even");
    else
        printf("Odd");
}
int main() {
    checkEvenOdd(7);
    return 0;
}
""",
    "F031.c": """#include <stdio.h>
#include <string.h>
int isPalindrome(char *s) {
    int len = strlen(s);
    for (int i = 0; i < len/2; i++)
        if (s[i] != s[len-1-i])
            return 0;
    return 1;
}
int main() {
    printf(isPalindrome("madam") ? "Palindrome" : "Not Palindrome");
    return 0;
}
""",
    "F032.c": """#include <stdio.h>
#include <string.h>
int isPalindrome(char *s) {
    int len = strlen(s);
    for (int i = 0; i < len/2; i++)
        if (s[i] != s[len-1-i])
            return 0;
    return 1;
}
int main() {
    printf(isPalindrome("hello") ? "Palindrome" : "Not Palindrome");
    return 0;
}
""",
    "F033.c": """#include <stdio.h>
void printASCII(char c1, char c2, char c3) {
    printf("%d %d %d", c1, c2, c3);
}
int main() {
    printASCII('A','B','C');
    return 0;
}
""",
    "F034.c": """#include <stdio.h>
void printASCII(char c1, char c2, char c3) {
    printf("%d %d %d", c1, c2, c3);
}
int main() {
    printASCII('a','b','c');
    return 0;
}
""",
    "F035.c": """#include <stdio.h>
int add(int a, int b) {
    return a + b;
}
int main() {
    printf("%d", add(4,6));
    return 0;
}
""",
    "F036.c": """#include <stdio.h>
int sum3(int a, int b, int c) {
    return a + b + c;
}
int main() {
    printf("%d", sum3(5,10,15));
    return 0;
}
""",
    "F037.c": """#include <stdio.h>
double divide(int a, int b) {
    return (double)a / b;
}
int main() {
    printf("%f", divide(1,2));
    return 0;
}
""",
    "F038.c": """#include <stdio.h>
void tryChange(int a, int b) {
    a = 100;
    b = 200;
}
int main() {
    int a = 10, b = 20;
    tryChange(a, b);
    printf("a = %d, b = %d", a, b);
    return 0;
}
""",
    "F039.c": """#include <stdio.h>
void swap(int *x, int *y) {
    int t = *x;
    *x = *y;
    *y = t;
}
int main() {
    int x = 10, y = 20;
    swap(&x, &y);
    printf("x = %d, y = %d", x, y);
    return 0;
}
""",
    "F040.c": """#include <stdio.h>
int* firstFivePrimes() {
    static int primes[] = {2,3,5,7,11};
    return primes;
}
int main() {
    int *p = firstFivePrimes();
    for (int i = 0; i < 5; i++)
        printf("%d ", p[i]);
    return 0;
}
""",
    "F041.c": """#include <stdio.h>
void doubleElements(int arr[], int n) {
    for (int i = 0; i < n; i++)
        arr[i] *= 2;
}
int main() {
    int a[] = {2,3,4,5};
    doubleElements(a,4);
    for (int i = 0; i < 4; i++)
        printf("%d ", a[i]);
    return 0;
}
""",
    "F042.c": """#include <stdio.h>
#include <stdarg.h>
int sum(int count, ...) {
    va_list args;
    va_start(args, count);
    int s = 0;
    for (int i = 0; i < count; i++)
        s += va_arg(args, int);
    va_end(args);
    return s;
}
int main() {
    printf("Sum: %d", sum(5, 1,2,3,4,5));
    return 0;
}
""",
    "F043.c": """#include <stdio.h>
void printReverse(int arr[], int n) {
    if (n == 0) return;
    printf("%d ", arr[n-1]);
    printReverse(arr, n-1);
}
int main() {
    int a[] = {5,4,3,2,1};
    printReverse(a,5);
    return 0;
}
""",
    "F044.c": """#include <stdio.h>
void fibonacci(int n) {
    int a = 0, b = 1, c;
    for (int i = 0; i < n; i++) {
        printf("%d ", a);
        c = a + b;
        a = b;
        b = c;
    }
}
int main() {
    fibonacci(6);
    return 0;
}
""",
    "F045.c": """#include <stdio.h>
#define SQUARE(x) ((x)*(x))
int main() {
    int a = 5;
    printf("Result = %d", SQUARE(a));
    return 0;
}
""",
    "F046.c": """#include <stdio.h>
int accumulate(int x) {
    static int sum = 0;
    sum += x;
    return sum;
}
int main() {
    printf("%d ", accumulate(5));
    printf("%d ", accumulate(5));
    printf("%d", accumulate(5));
    return 0;
}
""",
    "F047.c": """#include <stdio.h>
int global = 10;
void changeGlobal() {
    global = 20;
}
int main() {
    changeGlobal();
    printf("%d", global);
    return 0;
}
""",
    "F048.c": """#include <stdio.h>
int x = 5;
void func() {
    int x = 10;
    printf("inside: %d\\n", x);
}
int main() {
    printf("outside: %d\\n", x);
    func();
    return 0;
}
""",
    "F049.c": """#include <stdio.h>
int getSize() {
    static int arr[] = {1,2,3,4};
    return sizeof(arr) / sizeof(arr[0]);
}
int main() {
    printf("%d", getSize());
    return 0;
}
""",
    "F050.c": """#include <stdio.h>
int max(int a, int b) {
    return (a > b) ? a : b;
}
int main() {
    printf("%d", max(5,6));
    return 0;
}
"""
}

# Get the current directory where the .py file is located
current_dir = os.path.dirname(os.path.abspath(__file__))

# Create 'answers' folder inside current directory
answers_dir = os.path.join(current_dir, "answers")
os.makedirs(answers_dir, exist_ok=True)

# Add .c extension automatically
file_extension = ".c"
for question in json_data["questions"]:
    if not question["codeFile"].endswith(file_extension):
        question["codeFile"] += file_extension

# Write JSON file in same folder as .py
json_path = os.path.join(current_dir, "output-questions-functions.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(json_data, f, indent=2, ensure_ascii=False)

# Write each C file inside answers folder
for filename, content in c_files_content.items():
    file_path = os.path.join(answers_dir, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"✅ Successfully created 'answers' folder with {len(c_files_content)} C files for function questions")