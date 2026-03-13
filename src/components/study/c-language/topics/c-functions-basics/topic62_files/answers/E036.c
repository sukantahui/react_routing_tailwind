#include <stdio.h>

int canCompleteCircuit(int gas[], int cost[], int n) {
    int total = 0, curr = 0, start = 0;
    for (int i = 0; i < n; i++) {
        total += gas[i] - cost[i];
        curr += gas[i] - cost[i];
        if (curr < 0) {
            start = i + 1;
            curr = 0;
        }
    }
    return (total >= 0) ? start : -1;
}

int main() {
    int n;
    printf("Enter number of stations: ");
    scanf("%d", &n);
    int gas[n], cost[n];
    printf("Enter gas amounts: ");
    for (int i = 0; i < n; i++) scanf("%d", &gas[i]);
    printf("Enter cost amounts: ");
    for (int i = 0; i < n; i++) scanf("%d", &cost[i]);

    int start = canCompleteCircuit(gas, cost, n);
    printf("Starting station = %d\n", start);
    return 0;
}
