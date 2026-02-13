/**
 * break_search.c
 *
 * Search for a number in an array. If found, print its position and stop.
 * Uses break to exit the loop early.
 */

#include <stdio.h>

int main() {
    int numbers[] = {12, 45, 78, 23, 89, 56, 34, 67};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    int searchKey = 89;
    int found = 0;  // 0 = false, 1 = true
    int position = -1;

    for (int i = 0; i < size; i++) {
        if (numbers[i] == searchKey) {
            found = 1;
            position = i;
            break;  // exit loop immediately
        }
    }

    if (found) {
        printf("✅ Number %d found at index %d.\n", searchKey, position);
    } else {
        printf("❌ Number %d not found.\n", searchKey);
    }

    return 0;
}