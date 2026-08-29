#include <stdio.h>

int min(int a, int b) { return (a < b) ? a : b; }

int min_cost_climbing_stairs(int cost[], int n) {
    int prev2 = cost[0], prev1 = cost[1];
    for (int i = 2; i < n; i++) {
        int curr = cost[i] + min(prev1, prev2);
        prev2 = prev1;
        prev1 = curr;
    }
    return min(prev1, prev2);
}

int main() {
    int cost[] = {10, 15, 20};
    printf("--- Min Cost Climbing Stairs (1D DP) ---\nMin Cost = %d\n", min_cost_climbing_stairs(cost, 3));
    return 0;
}
