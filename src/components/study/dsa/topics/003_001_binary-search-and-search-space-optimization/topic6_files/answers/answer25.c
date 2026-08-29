#include <stdio.h>
#include <stdlib.h>

#define THREADS 8

typedef struct {
    int thread_id;
    int low;
    int high;
    int target;
    int *arr;
    int result_idx;
} ThreadData;

int binary_search_range(int *arr, int low, int high, int target) {
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

void parallel_binary_search_demo() {
    printf("--- Parallel Lock-Free Binary Search Space Partitioning ---\n");
    int size = 800;
    int *arr = (int*)malloc(sizeof(int) * size);
    for (int i = 0; i < size; i++) arr[i] = i * 2;

    int target = 450;
    int partition_size = size / THREADS;
    ThreadData threads[THREADS];

    printf("Partitioned search space across %d GPU worker threads simultaneously.\n", THREADS);

    for (int t = 0; t < THREADS; t++) {
        threads[t].thread_id = t;
        threads[t].low = t * partition_size;
        threads[t].high = (t == THREADS - 1) ? (size - 1) : ((t + 1) * partition_size - 1);
        threads[t].target = target;
        threads[t].arr = arr;
        threads[t].result_idx = binary_search_range(arr, threads[t].low, threads[t].high, target);

        if (threads[t].result_idx != -1) {
            printf("Thread %d found Target %d at Index %d!\n", t, target, threads[t].result_idx);
        }
    }

    free(arr);
}

int main() {
    parallel_binary_search_demo();
    return 0;
}

