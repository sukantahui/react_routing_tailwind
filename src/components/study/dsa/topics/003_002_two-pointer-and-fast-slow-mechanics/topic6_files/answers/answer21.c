#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int sum;
    int count;
} SumCount;

int compare(const void *a, const void *b) {
    return ((SumCount*)a)->sum - ((SumCount*)b)->sum;
}

void four_sum_ii_demo() {
    int A[] = {1, 2};
    int B[] = {-2, -1};
    int C[] = {-1, 2};
    int D[] = {0, 2};
    int n = 2;

    int ab_count = n * n;
    SumCount *AB = (SumCount*)malloc(sizeof(SumCount) * ab_count);
    int idx = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            AB[idx].sum = A[i] + B[j];
            AB[idx].count = 1;
            idx++;
        }
    }

    qsort(AB, ab_count, sizeof(SumCount), compare);

    int total_quadruplets = 0;
    for (int k = 0; k < n; k++) {
        for (int l = 0; l < n; l++) {
            int target = -(C[k] + D[l]);
            for (int i = 0; i < ab_count; i++) {
                if (AB[i].sum == target) total_quadruplets += AB[i].count;
            }
        }
    }

    printf("--- 4Sum II Hybrid Search ---\n");
    printf("Total Quadruplets Summing to 0 = %d\n", total_quadruplets);

    free(AB);
}

int main() {
    four_sum_ii_demo();
    return 0;
}

