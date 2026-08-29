#include <stdio.h>
#include <stdbool.h>

int max(int a, int b) { return (a > b) ? a : b; }

int longest_consecutive(int nums[], int n) {
    bool hash_set[1000] = {false};
    for (int i = 0; i < n; i++) hash_set[nums[i]] = true;

    int longest = 0;
    for (int i = 0; i < n; i++) {
        if (!hash_set[nums[i] - 1]) { // Start of sequence
            int curr = nums[i];
            int streak = 1;
            while (hash_set[curr + 1]) { curr++; streak++; }
            longest = max(longest, streak);
        }
    }
    return longest;
}

int main() {
    int nums[] = {100, 4, 200, 1, 3, 2};
    printf("--- Longest Consecutive Sequence Finder ---\n");
    printf("Longest Consecutive Sequence Length = %d\n", longest_consecutive(nums, 6));
    return 0;
}
