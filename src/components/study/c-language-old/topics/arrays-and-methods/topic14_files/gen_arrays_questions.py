import os
import json

# Define the JSON data
json_data = {
    "subjectLogo": {
        "path": "/images/c-logo.svg",
        "alt": "C Programming Language"
    },
    "topic": "C Array Output Questions – Moderate",
    "subject": "Computer Science",
    "class": 12,
    "board": "CBSE",
    "questions": [
        {"id": "C001", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C001", "output": "5", "explanation": "The first element of the array is 5."},
        {"id": "C002", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C002", "output": "9", "explanation": "The last element of the array is 9."},
        {"id": "C003", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C003", "output": "20", "explanation": "Sum of elements {2,4,6,8} = 20."},
        {"id": "C004", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C004", "output": "5", "explanation": "Average of {2,4,6,8} = 20/4 = 5."},
        {"id": "C005", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C005", "output": "8", "explanation": "Maximum element in {2,4,6,8} is 8."},
        {"id": "C006", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C006", "output": "2", "explanation": "Minimum element in {2,4,6,8} is 2."},
        {"id": "C007", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C007", "output": "8 6 4 2", "explanation": "Array printed in reverse order."},
        {"id": "C008", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C008", "output": "2", "explanation": "Count of even numbers in {1,2,3,4,5} is 2."},
        {"id": "C009", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C009", "output": "3", "explanation": "Count of odd numbers in {1,2,3,4,5} is 3."},
        {"id": "C010", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C010", "output": "2 6", "explanation": "Elements at even indices (0,2) of {2,4,6,8} are 2 and 6."},
        {"id": "C011", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C011", "output": "4 8", "explanation": "Elements at odd indices (1,3) of {2,4,6,8} are 4 and 8."},
        {"id": "C012", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C012", "output": "2", "explanation": "Index of value 6 in array {2,4,6,8} is 2."},
        {"id": "C013", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C013", "output": "2 4 6 8", "explanation": "Copied array elements printed."},
        {"id": "C014", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C014", "output": "2 4 6 8 3 5 7 9", "explanation": "Merged array of {2,4,6,8} and {3,5,7,9}."},
        {"id": "C015", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C015", "output": "4 6 8 2", "explanation": "Array left rotated by one: {2,4,6,8} -> {4,6,8,2}."},
        {"id": "C016", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C016", "output": "8 2 4 6", "explanation": "Array right rotated by one: {2,4,6,8} -> {8,2,4,6}."},
        {"id": "C017", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C017", "output": "1 2 3 4 5", "explanation": "Array sorted in ascending order (bubble sort of {5,4,3,2,1})."},
        {"id": "C018", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C018", "output": "6", "explanation": "Second largest in {8,6,4,2} is 6."},
        {"id": "C019", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C019", "output": "4", "explanation": "Second smallest in {8,6,4,2} is 4."},
        {"id": "C020", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C020", "output": "2 4 6 8", "explanation": "After removing duplicates (no duplicates in {2,4,6,8})."},
        {"id": "C021", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C021", "output": "2 appears 2 times\n3 appears 1 time\n4 appears 1 time", "explanation": "Frequency of each element in {2,3,2,4}."},
        {"id": "C022", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C022", "output": "Palindrome", "explanation": "Array {1,2,3,2,1} is a palindrome."},
        {"id": "C023", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C023", "output": "2", "explanation": "First element of the pair with sum 9 in {2,7,4,5}."},
        {"id": "C024", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C024", "output": "6", "explanation": "Maximum subarray sum of {4, -2, 3, -1, 2} is 6."},
        {"id": "C025", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C025", "output": "10", "explanation": "Sum of all elements in 2x2 matrix {{1,2},{3,4}} = 10."},
        {"id": "C026", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C026", "output": "19 22\n43 50", "explanation": "Product of two 2x2 matrices."},
        {"id": "C027", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C027", "output": "1 4 7\n2 5 8\n3 6 9", "explanation": "Transpose of a 3x3 matrix."},
        {"id": "C028", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C028", "output": "15", "explanation": "Sum of diagonal elements of a 3x3 matrix (1+5+9=15)."},
        {"id": "C029", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C029", "output": "6 15 24", "explanation": "Row-wise sums of a 3x3 matrix."},
        {"id": "C030", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C030", "output": "12 15 18", "explanation": "Column-wise sums of a 3x3 matrix."},
        {"id": "C031", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C031", "output": "Hello World", "explanation": "Array of pointers to strings: prints the first two strings."},
        {"id": "C032", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C032", "output": "5", "explanation": "Pointer to array: first element."},
        {"id": "C033", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C033", "output": "15", "explanation": "Passing array to function that returns sum."},
        {"id": "C034", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C034", "output": "2 4 6 8", "explanation": "Function returning pointer to static array."},
        {"id": "C035", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C035", "output": "1 2 3 4 5", "explanation": "Dynamically allocated array printed."},
        {"id": "C036", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C036", "output": "1 2 3\n4 5 6", "explanation": "Traversing a 2D array."},
        {"id": "C037", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C037", "output": "1 2\n3 4 5\n6", "explanation": "Simulated jagged array printed."},
        {"id": "C038", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C038", "output": "Alice 25\nBob 30", "explanation": "Array of structures."},
        {"id": "C039", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C039", "output": "90 85 92", "explanation": "Structure containing array of marks."},
        {"id": "C040", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C040", "output": "10 20 30", "explanation": "Passing array and its size to function."},
        {"id": "C041", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C041", "output": "1 2 3\n4 5 6\n7 8 9", "explanation": "Passing 2D array to function."},
        {"id": "C042", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C042", "output": "garbage value (undefined)", "explanation": "Accessing out of bounds leads to undefined behavior – the output may vary."},
        {"id": "C043", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C043", "output": "40", "explanation": "Using sizeof on array of 10 ints gives 40 bytes."},
        {"id": "C044", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C044", "output": "15", "explanation": "Array of function pointers – calls the add function."},
        {"id": "C045", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C045", "output": "Hello", "explanation": "Character array (string) printed."},
        {"id": "C046", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C046", "output": "HelloWorld", "explanation": "Copying and concatenating strings."},
        {"id": "C047", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C047", "output": "HelloHello", "explanation": "String concatenation."},
        {"id": "C048", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C048", "output": "5", "explanation": "Length of string 'Hello'."},
        {"id": "C049", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C049", "output": "Strings are equal", "explanation": "Comparison of two identical strings."},
        {"id": "C050", "difficulty": "Moderate", "question": "What is the output?", "codeFile": "C050", "output": "Palindrome", "explanation": "Checking if string 'madam' is palindrome."}
    ]
}

# Define the content of each C file
c_files_content = {
    "C001.c": """#include <stdio.h>
int main() {
    int arr[] = {5, 2, 8, 1};
    printf("%d", arr[0]);
    return 0;
}
""",
    "C002.c": """#include <stdio.h>
int main() {
    int arr[] = {3, 7, 2, 9};
    printf("%d", arr[3]);
    return 0;
}
""",
    "C003.c": """#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    int sum = 0;
    for (int i = 0; i < 4; i++) 
        sum += arr[i];
    printf("%d", sum);
    return 0;
}
""",
    "C004.c": """#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    int sum = 0;
    for (int i = 0; i < 4; i++) 
        sum += arr[i];
    printf("%d", sum / 4);
    return 0;
}
""",
    "C005.c": """#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    int max = arr[0];
    for (int i = 1; i < 4; i++) 
        if (arr[i] > max) 
            max = arr[i];
    printf("%d", max);
    return 0;
}
""",
    "C006.c": """#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    int min = arr[0];
    for (int i = 1; i < 4; i++) 
        if (arr[i] < min) 
            min = arr[i];
    printf("%d", min);
    return 0;
}
""",
    "C007.c": """#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    for (int i = 3; i >= 0; i--) 
        printf("%d ", arr[i]);
    return 0;
}
""",
    "C008.c": """#include <stdio.h>
int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int count = 0;
    for (int i = 0; i < 5; i++) 
        if (arr[i] % 2 == 0) 
            count++;
    printf("%d", count);
    return 0;
}
""",
    "C009.c": """#include <stdio.h>
int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int count = 0;
    for (int i = 0; i < 5; i++) 
        if (arr[i] % 2 != 0) 
            count++;
    printf("%d", count);
    return 0;
}
""",
    "C010.c": """#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    for (int i = 0; i < 4; i += 2) 
        printf("%d ", arr[i]);
    return 0;
}
""",
    "C011.c": """#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    for (int i = 1; i < 4; i += 2) 
        printf("%d ", arr[i]);
    return 0;
}
""",
    "C012.c": """#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    int key = 6, index = -1;
    for (int i = 0; i < 4; i++) 
        if (arr[i] == key) index = i;
    printf("%d", index);
    return 0;
}
""",
    "C013.c": """#include <stdio.h>
int main() {
    int src[] = {2, 4, 6, 8};
    int dest[4];
    for (int i = 0; i < 4; i++) 
        dest[i] = src[i];
    for (int i = 0; i < 4; i++) 
        printf("%d ", dest[i]);
    return 0;
}
""",
    "C014.c": """#include <stdio.h>
int main() {
    int a[] = {2, 4, 6, 8};
    int b[] = {3, 5, 7, 9};
    int c[8];
    for (int i = 0; i < 4; i++) 
        c[i] = a[i];
    for (int i = 0; i < 4; i++) 
        c[i+4] = b[i];
    for (int i = 0; i < 8; i++) 
        printf("%d ", c[i]);
    return 0;
}
""",
    "C015.c": """#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    int temp = arr[0];
    for (int i = 0; i < 3; i++) 
        arr[i] = arr[i+1];
    arr[3] = temp;
    for (int i = 0; i < 4; i++) 
        printf("%d ", arr[i]);
    return 0;
}
""",
    "C016.c": """#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    int temp = arr[3];
    for (int i = 3; i > 0; i--) 
        arr[i] = arr[i-1];
    arr[0] = temp;
    for (int i = 0; i < 4; i++) 
        printf("%d ", arr[i]);
    return 0;
}
""",
    "C017.c": """#include <stdio.h>
int main() {
    int arr[] = {5, 4, 3, 2, 1};
    int n = 5, temp;
    for (int i = 0; i < n-1; i++)
        for (int j = 0; j < n-i-1; j++)
            if (arr[j] > arr[j+1]) {
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
    for (int i = 0; i < n; i++) 
        printf("%d ", arr[i]);
    return 0;
}
""",
    "C018.c": """#include <stdio.h>
int main() {
    int arr[] = {8, 6, 4, 2};
    int first = arr[0], second = arr[1];
    if (second > first) 
    { 
        int t = first; first = second; second = t; 
    }
    for (int i = 2; i < 4; i++) {
        if (arr[i] > first) 
        { 
            second = first; first = arr[i]; 
        }
        else if (arr[i] > second) 
            second = arr[i];
    }
    printf("%d", second);
    return 0;
}
""",
    "C019.c": """#include <stdio.h>
int main() {
    int arr[] = {8, 6, 4, 2};
    int first = arr[0], second = arr[1];
    if (second < first) 
    { 
        int t = first; first = second; second = t; 
    }
    for (int i = 2; i < 4; i++) {
        if (arr[i] < first)
        { 
            second = first; first = arr[i]; 
        }
        else if (arr[i] < second) 
            second = arr[i];
    }
    printf("%d", second);
    return 0;
}
""",
    "C020.c": """#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    int temp[4], k = 0;
    for (int i = 0; i < 4; i++) {
        int dup = 0;
        for (int j = 0; j < k; j++) 
        if (temp[j] == arr[i]) 
            dup = 1;
        if (!dup) 
            temp[k++] = arr[i];
    }
    for (int i = 0; i < k; i++) 
        printf("%d ", temp[i]);
    return 0;
}
""",
    "C021.c": """#include <stdio.h>
int main() {
    int arr[] = {2, 3, 2, 4};
    int freq[10] = {0};
    for (int i = 0; i < 4; i++) 
        freq[arr[i]]++;
    for (int i = 0; i < 10; i++)
        if (freq[i] > 0) 
            printf("%d appears %d time(s)\\n", i, freq[i]);
    return 0;
}
""",
    "C022.c": """#include <stdio.h>
int main() {
    int arr[] = {1, 2, 3, 2, 1};
    int n = 5, palindrome = 1;
    for (int i = 0; i < n/2; i++)
        if (arr[i] != arr[n-1-i]) { palindrome = 0; break; }
    printf(palindrome ? "Palindrome" : "Not Palindrome");
    return 0;
}
""",
    "C023.c": """#include <stdio.h>
int main() {
    int arr[] = {2, 7, 4, 5};
    int target = 9;
    for (int i = 0; i < 4; i++)
        for (int j = i+1; j < 4; j++)
            if (arr[i] + arr[j] == target)
                printf("%d", arr[i]);
    return 0;
}
""",
    "C024.c": """#include <stdio.h>
int main() {
    int arr[] = {4, -2, 3, -1, 2};
    int max_so_far = arr[0], curr_max = arr[0];
    for (int i = 1; i < 5; i++) {
        curr_max = (arr[i] > curr_max + arr[i]) ? arr[i] : curr_max + arr[i];
        max_so_far = (curr_max > max_so_far) ? curr_max : max_so_far;
    }
    printf("%d", max_so_far);
    return 0;
}
""",
    "C025.c": """#include <stdio.h>
int main() {
    int mat[2][2] = {{1, 2}, {3, 4}};
    int sum = 0;
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            sum += mat[i][j];
    printf("%d", sum);
    return 0;
}
""",
    "C026.c": """#include <stdio.h>
int main() {
    int a[2][2] = {{1, 2}, {3, 4}};
    int b[2][2] = {{5, 6}, {7, 8}};
    int c[2][2] = {0};
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 2; k++)
                c[i][j] += a[i][k] * b[k][j];
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++)
            printf("%d ", c[i][j]);
        printf("\\n");
    }
    return 0;
}
""",
    "C027.c": """#include <stdio.h>
int main() {
    int mat[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int trans[3][3];
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            trans[j][i] = mat[i][j];
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++)
            printf("%d ", trans[i][j]);
        printf("\\n");
    }
    return 0;
}
""",
    "C028.c": """#include <stdio.h>
int main() {
    int mat[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int sum = 0;
    for (int i = 0; i < 3; i++) 
        sum += mat[i][i];
    printf("%d", sum);
    return 0;
}
""",
    "C029.c": """#include <stdio.h>
int main() {
    int mat[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    for (int i = 0; i < 3; i++) {
        int row_sum = 0;
        for (int j = 0; j < 3; j++) 
            row_sum += mat[i][j];
        printf("%d ", row_sum);
    }
    return 0;
}
""",
    "C030.c": """#include <stdio.h>
int main() {
    int mat[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    for (int j = 0; j < 3; j++) {
        int col_sum = 0;
        for (int i = 0; i < 3; i++) 
            col_sum += mat[i][j];
        printf("%d ", col_sum);
    }
    return 0;
}
""",
    "C031.c": """#include <stdio.h>
int main() {
    char *words[] = {"Hello", "World", "C", "Programming"};
    printf("%s %s", words[0], words[1]);
    return 0;
}
""",
    "C032.c": """#include <stdio.h>
int main() {
    int arr[5] = {5, 4, 3, 2, 1};
    int (*ptr)[5] = &arr;
    printf("%d", (*ptr)[0]);
    return 0;
}
""",
    "C033.c": """#include <stdio.h>
int sumArray(int arr[], int n) {
    int s = 0;
    for (int i = 0; i < n; i++) 
        s += arr[i];
    return s;
}
int main() {
    int arr[] = {1, 2, 3, 4, 5};
    printf("%d", sumArray(arr, 5));
    return 0;
}
""",
    "C034.c": """#include <stdio.h>
int* getArray() {
    static int arr[] = {2, 4, 6, 8};
    return arr;
}
int main() {
    int *p = getArray();
    for (int i = 0; i < 4; i++) 
        printf("%d ", p[i]);
    return 0;
}
""",
    "C035.c": """#include <stdio.h>
#include <stdlib.h>
int main() {
    int *arr = (int*)malloc(5 * sizeof(int));
    for (int i = 0; i < 5; i++) 
        arr[i] = i+1;
    for (int i = 0; i < 5; i++) 
        printf("%d ", arr[i]);
    free(arr);
    return 0;
}
""",
    "C036.c": """#include <stdio.h>
int main() {
    int mat[2][3] = {{1, 2, 3}, {4, 5, 6}};
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++)
            printf("%d ", mat[i][j]);
        printf("\\n");
    }
    return 0;
}
""",
    "C037.c": """#include <stdio.h>
int main() {
    int *jagged[3];
    int row1[] = {1, 2};
    int row2[] = {3, 4, 5};
    int row3[] = {6};
    jagged[0] = row1;
    jagged[1] = row2;
    jagged[2] = row3;
    int sizes[] = {2, 3, 1};
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < sizes[i]; j++)
            printf("%d ", jagged[i][j]);
        printf("\\n");
    }
    return 0;
}
""",
    "C038.c": """#include <stdio.h>
struct Person {
    char name[20];
    int age;
};
int main() {
    struct Person people[2] = {{"Alice", 25}, {"Bob", 30}};
    for (int i = 0; i < 2; i++)
        printf("%s %d\\n", people[i].name, people[i].age);
    return 0;
}
""",
    "C039.c": """#include <stdio.h>
struct Student {
    char name[20];
    int marks[3];
};
int main() {
    struct Student s = {"John", {90, 85, 92}};
    for (int i = 0; i < 3; i++)
        printf("%d ", s.marks[i]);
    return 0;
}
""",
    "C040.c": """#include <stdio.h>
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) 
        printf("%d ", arr[i]);
}
int main() {
    int arr[] = {10, 20, 30};
    printArray(arr, 3);
    return 0;
}
""",
    "C041.c": """#include <stdio.h>
void printMatrix(int mat[][3], int rows) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < 3; j++)
            printf("%d ", mat[i][j]);
        printf("\\n");
    }
}
int main() {
    int mat[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    printMatrix(mat, 3);
    return 0;
}
""",
    "C042.c": """#include <stdio.h>
int main() {
    int arr[3] = {1, 2, 3};
    printf("%d", arr[5]);  // out-of-bounds access
    return 0;
}
""",
    "C043.c": """#include <stdio.h>
int main() {
    int arr[10];
    printf("%lu", sizeof(arr));
    return 0;
}
""",
    "C044.c": """#include <stdio.h>
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int main() {
    int (*ops[2])(int, int) = {add, sub};
    printf("%d", ops[0](10, 5));
    return 0;
}
""",
    "C045.c": """#include <stdio.h>
int main() {
    char str[] = "Hello";
    printf("%s", str);
    return 0;
}
""",
    "C046.c": """#include <stdio.h>
#include <string.h>
int main() {
    char str1[20] = "Hello";
    char str2[] = "World";
    strcat(str1, str2);
    printf("%s", str1);
    return 0;
}
""",
    "C047.c": """#include <stdio.h>
#include <string.h>
int main() {
    char str[20] = "Hello";
    strcpy(str, "Hello");
    strcat(str, "Hello");
    printf("%s", str);
    return 0;
}
""",
    "C048.c": """#include <stdio.h>
#include <string.h>
int main() {
    char str[] = "Hello";
    printf("%lu", strlen(str));
    return 0;
}
""",
    "C049.c": """#include <stdio.h>
#include <string.h>
int main() {
    char str1[] = "Hello";
    char str2[] = "Hello";
    if (strcmp(str1, str2) == 0)
        printf("Strings are equal");
    else
        printf("Strings are not equal");
    return 0;
}
""",
    "C050.c": """#include <stdio.h>
#include <string.h>
int main() {
    char str[] = "madam";
    int len = strlen(str), palindrome = 1;
    for (int i = 0; i < len/2; i++)
        if (str[i] != str[len-1-i]) 
        { 
            palindrome = 0; break; 
        }
    printf(palindrome ? "Palindrome" : "Not Palindrome");
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
file_extention=".c"
for question in json_data["questions"]:
    if not question["codeFile"].endswith(file_extention):
        question["codeFile"] += file_extention


# Write JSON file in same folder as .py
json_path = os.path.join(current_dir, "output-questions.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(json_data, f, indent=2, ensure_ascii=False)

# Write each C file inside answers folder
for filename, content in c_files_content.items():
    file_path = os.path.join(answers_dir, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"✅ Successfully created 'answers' folder with {len(c_files_content)} C files")