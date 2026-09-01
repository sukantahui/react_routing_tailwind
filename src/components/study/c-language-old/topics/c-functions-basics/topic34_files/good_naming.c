// good_naming.c – clear, intention‑revealing names
#include <stdio.h>

// Function to calculate average of an array
double calculateAverage(int arr[], int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return (double)sum / size;
}

// Function to check if a student passed (score >= 40)
int isPassing(int score) {
    return score >= 40;
}

// Function to print student result
void printStudentResult(const char* name, int score) {
    printf("%s: %d - %s\n", name, score, isPassing(score) ? "PASS" : "FAIL");
}

int main() {
    int marks[] = {45, 38, 72, 61};
    char* names[] = {"Swadeep", "Tuhina", "Abhronila", "Debangshu"};
    int size = sizeof(marks) / sizeof(marks[0]);

    double avg = calculateAverage(marks, size);
    printf("Class average: %.2f\n", avg);

    for (int i = 0; i < size; i++) {
        printStudentResult(names[i], marks[i]);
    }
    return 0;
}