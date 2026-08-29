#include <stdio.h>
#include <stdlib.h>

void count_frequencies(int arr[], int n) {
    if (n == 0) return;
    
    int max_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max_val) max_val = arr[i];
    }

    int *freq = (int*)calloc(max_val + 1, sizeof(int));
    for (int i = 0; i < n; i++) {
        freq[arr[i]]++;
    }

    printf("--- Element Frequency Histogram ---\n");
    for (int i = 0; i <= max_val; i++) {
        if (freq[i] > 0) {
            printf("Element %2d : %d occurrence(s)\n", i, freq[i]);
        }
    }

    free(freq);
}

int main() {
    int arr[] = {4, 2, 4, 5, 2, 3, 1, 4, 5, 2};
    int n = sizeof(arr) / sizeof(arr[0]);

    count_frequencies(arr, n);
    return 0;
}
