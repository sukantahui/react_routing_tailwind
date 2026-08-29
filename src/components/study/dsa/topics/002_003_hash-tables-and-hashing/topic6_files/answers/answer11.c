#include <stdio.h>
#include <stdbool.h>

void two_sum(int arr[], int n, int target) {
    int hash_map[1000] = {0};
    bool visited[1000] = {false};

    printf("--- Two-Sum O(N) Hash Search ---\nTarget Sum = %d\n", target);
    for (int i = 0; i < n; i++) {
        int complement = target - arr[i];
        if (complement >= 0 && visited[complement]) {
            printf("Found Pair: %d + %d = %d (Indices: %d, %d)\n", complement, arr[i], target, hash_map[complement], i);
            return;
        }
        if (arr[i] >= 0) {
            visited[arr[i]] = true;
            hash_map[arr[i]] = i;
        }
    }
}

int main() {
    int arr[] = {2, 7, 11, 15};
    two_sum(arr, 4, 9);
    return 0;
}
