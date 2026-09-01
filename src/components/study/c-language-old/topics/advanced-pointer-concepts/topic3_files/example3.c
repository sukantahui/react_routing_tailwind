#include <stdio.h>
#include <string.h>

// Structure definition
typedef struct {
    char name[50];
    int roll;
    float marks;
    char grade;
} Student;

// Passing structure by value (copies entire structure - inefficient for large structs)
void printStudentByValue(Student s) {
    printf("Student (by value): %s, Roll: %d, Marks: %.2f, Grade: %c\n", 
           s.name, s.roll, s.marks, s.grade);
}

// Passing structure by pointer (efficient - only copies address)
void updateStudentGrade(Student *s, char newGrade) {
    if (s != NULL) {
        s->grade = newGrade;  // Arrow operator for pointer to struct
        printf("Updated grade for %s to %c\n", s->name, newGrade);
    }
}

// Array parameter - automatically decays to pointer
void printArray(int arr[], int size) {
    printf("Array elements: ");
    for(int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
    printf("Inside function: sizeof(arr) = %zu (pointer size!)\n", sizeof(arr));
}

// Modify array elements using pointer
void doubleArrayElements(int *arr, int size) {
    for(int i = 0; i < size; i++) {
        arr[i] *= 2;  // arr[i] is same as *(arr + i)
    }
}

int main() {
    printf("=== Passing Structures and Arrays ===\n\n");
    
    // Structure example
    Student sreeparna = {"Sreeparna", 101, 85.5, 'A'};
    Student ritaja = {"Ritaja", 102, 78.0, 'B'};
    
    printStudentByValue(sreeparna);
    updateStudentGrade(&ritaja, 'A');
    
    // Array example
    int scores[] = {10, 20, 30, 40, 50};
    int size = sizeof(scores) / sizeof(scores[0]);
    
    printf("\nOriginal array (in main): ");
    for(int i = 0; i < size; i++) printf("%d ", scores[i]);
    printf("\n");
    printf("In main: sizeof(scores) = %zu (full array size!)\n", sizeof(scores));
    
    printArray(scores, size);
    doubleArrayElements(scores, size);
    
    printf("After doubling: ");
    for(int i = 0; i < size; i++) printf("%d ", scores[i]);
    printf("\n");
    
    return 0;
}