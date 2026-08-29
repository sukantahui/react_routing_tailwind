#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

int rob_house(int nums[], int n) {
    int prev2 = 0, prev1 = 0;
    for (int i = 0; i < n; i++) {
        int curr = max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

int main() {
    int nums[] = {2, 7, 9, 3, 1};
    printf("--- House Robber I (1D DP) ---\nMaximum Robbed Value = %d\n", rob_house(nums, 5));
    return 0;
}
