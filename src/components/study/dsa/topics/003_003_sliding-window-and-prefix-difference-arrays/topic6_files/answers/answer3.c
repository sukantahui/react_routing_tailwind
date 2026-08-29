#include <stdio.h>

void build_prefix_sum(int arr[], int n, int prefix[]) {
    prefix[0] = arr[0];
    for (int i = 1; i < n; i++) prefix[i] = prefix[i - 1] + arr[i];
}

int query_range_sum(int prefix[], int L, int R) {
    if (L == 0) return prefix[R];
    return prefix[R] - prefix[L - 1];
}

int main() {
    int arr[] = {10, 20, 10, 5, 15};
    int n = 5, prefix[5];
    build_prefix_sum(arr, n, prefix);

    printf("--- 1D Prefix Sum O(1) Range Queries ---\n");
    printf("Range Sum [1..3] (20 + 10 + 5) = %d\n", query_range_sum(prefix, 1, 3));
    return 0;
}
