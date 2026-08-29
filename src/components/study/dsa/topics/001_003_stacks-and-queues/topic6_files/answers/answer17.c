#include <stdio.h>

int can_complete_circuit(int gas[], int cost[], int n) {
    int total_surplus = 0, curr_surplus = 0, start_idx = 0;
    for (int i = 0; i < n; i++) {
        total_surplus += gas[i] - cost[i];
        curr_surplus += gas[i] - cost[i];
        if (curr_surplus < 0) {
            start_idx = i + 1;
            curr_surplus = 0;
        }
    }
    return (total_surplus >= 0) ? start_idx : -1;
}

int main() {
    int gas[]  = {1, 2, 3, 4, 5};
    int cost[] = {3, 4, 5, 1, 2};
    int n = 5;
    printf("--- Gas Station Circular Circuit ---\n");
    int start = can_complete_circuit(gas, cost, n);
    if (start != -1) printf("Starting Gas Station Index = %d\n", start);
    else printf("Cannot complete circuit.\n");
    return 0;
}
