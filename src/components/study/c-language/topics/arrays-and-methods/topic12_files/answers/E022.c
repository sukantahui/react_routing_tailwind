#include <stdio.h>

typedef struct {
    int start;
    int end;
} Interval;

int main() {
    int n;
    printf("Enter number of intervals: ");
    scanf("%d", &n);
    Interval intervals[100];
    printf("Enter intervals (start end) one per line:\n");
    for (int i = 0; i < n; i++) {
        scanf("%d %d", &intervals[i].start, &intervals[i].end);
    }

    // Bubble sort by start
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (intervals[j].start > intervals[j + 1].start) {
                Interval t = intervals[j];
                intervals[j] = intervals[j + 1];
                intervals[j + 1] = t;
            }
        }
    }

    Interval merged[100];
    int m = 0;
    merged[m++] = intervals[0];
    for (int i = 1; i < n; i++) {
        if (intervals[i].start <= merged[m - 1].end) {
            if (intervals[i].end > merged[m - 1].end)
                merged[m - 1].end = intervals[i].end;
        } else {
            merged[m++] = intervals[i];
        }
    }

    printf("Merged intervals:\n");
    for (int i = 0; i < m; i++)
        printf("[%d,%d] ", merged[i].start, merged[i].end);
    printf("\n");
    return 0;
}