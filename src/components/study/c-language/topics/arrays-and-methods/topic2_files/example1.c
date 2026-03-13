#include <stdio.h>

int main() {
    int scores[5] = {85, 92, 78, 90, 88};

    printf("Scores of students at Barrackpore CNAT:\n");
    // Correct loop: i from 0 to 4
    for (int i = 0; i < 5; i++) {
        printf("Student index %d (locker %d): %d\n", i, i, scores[i]);
    }

    // Show that first element is at index 0
    printf("\nFirst student's score: scores[0] = %d\n", scores[0]);
    printf("Last student's score: scores[4] = %d\n", scores[4]);

    return 0;
}