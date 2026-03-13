#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int start, end;
} Interval;

int cmp(const void *a, const void *b) {
    Interval *ia = (Interval*)a;
    Interval *ib = (Interval*)b;
    return ia->start - ib->start;
}

Interval* merge(Interval intervals[], int n, int *returnSize) {
    if (n == 0) { *returnSize = 0; return NULL; }
    qsort(intervals, n, sizeof(Interval), cmp);
    Interval *res = (Interval*)malloc(n * sizeof(Interval));
    int idx = 0;
    res[idx] = intervals[0];
    for (int i = 1; i < n; i++) {
        if (intervals[i].start <= res[idx].end) {
            if (intervals[i].end > res[idx].end)
                res[idx].end = intervals[i].end;
        } else {
            idx++;
            res[idx] = intervals[i];
        }
    }
    *returnSize = idx + 1;
    return res;
}

int main() {
    int n;
    printf("Enter number of intervals: ");
    scanf("%d", &n);
    Interval intervals[n];
    printf("Enter intervals (start end) each line:\n");
    for (int i = 0; i < n; i++)
        scanf("%d %d", &intervals[i].start, &intervals[i].end);

    int outSize;
    Interval *merged = merge(intervals, n, &outSize);

    printf("Merged intervals: ");
    for (int i = 0; i < outSize; i++)
        printf("[%d,%d] ", merged[i].start, merged[i].end);
    printf("\n");
    free(merged);
    return 0;
}
