/**
 * for_array.c
 *
 * Demonstrates array traversal using a for loop.
 * Stores and prints marks of 5 students from Barrackpore.
 */

#include <stdio.h>

int main() {
    int marks[5] = {78, 85, 92, 67, 88};
    int total = 0;

    printf("Marks of students:\n");
    for (int i = 0; i < 5; i++) {
        printf("Student %d: %d\n", i + 1, marks[i]);
        total += marks[i];
    }

    printf("Average marks: %.2f\n", total / 5.0);
    return 0;
}