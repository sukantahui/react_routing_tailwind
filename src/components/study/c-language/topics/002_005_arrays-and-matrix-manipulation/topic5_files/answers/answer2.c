#include <stdio.h>

/**
 * Project 2: Class Marksheet Statistical Ranker & Median Finder
 * Sorts student marks using Selection Sort in descending order,
 * then computes mean, median, highest, lowest, and rank list.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

int main(void) {
    int marks[] = {78, 92, 45, 88, 63, 95, 52, 81, 70};
    int n = sizeof(marks) / sizeof(marks[0]);
    int sum = 0;

    // Selection sort in descending order
    for (int i = 0; i < n - 1; i++) {
        int maxIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (marks[j] > marks[maxIdx]) {
                maxIdx = j;
            }
        }
        if (maxIdx != i) {
            int temp = marks[i];
            marks[i] = marks[maxIdx];
            marks[maxIdx] = temp;
        }
    }

    for (int i = 0; i < n; i++) sum += marks[i];
    double mean = (double)sum / n;
    double median = (n % 2 != 0) ? marks[n / 2] : (marks[(n - 1) / 2] + marks[n / 2]) / 2.0;

    printf("====================================================\n");
    printf(" Student Merit Ranking & Statistical Analysis\n");
    printf("====================================================\n");
    printf("Total Students : %d\n", n);
    printf("Highest Mark   : %d (Rank 1)\n", marks[0]);
    printf("Lowest Mark    : %d (Rank %d)\n", marks[n - 1], n);
    printf("Class Mean     : %.2f\n", mean);
    printf("Class Median   : %.2f\n\n", median);

    printf("Ranked Scoreboard:\n");
    for (int i = 0; i < n; i++) {
        printf("  Rank %d: %d\n", i + 1, marks[i]);
    }

    return 0;
}
