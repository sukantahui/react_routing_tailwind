#include <stdio.h>

int find_max_capital(int k, int w, int profits[], int capital[], int n) {
    // Greedy selection using priority queue logic
    for (int i = 0; i < k; i++) {
        int best_profit = -1, best_idx = -1;
        for (int j = 0; j < n; j++) {
            if (capital[j] <= w && profits[j] > best_profit) {
                best_profit = profits[j];
                best_idx = j;
            }
        }
        if (best_idx == -1) break;
        w += best_profit;
        capital[best_idx] = 1e9; // Mark used
    }
    return w;
}

int main() {
    int profits[] = {1, 2, 3};
    int capital[] = {0, 1, 1};
    int k = 2, w = 0, n = 3;

    printf("--- Maximum Capital IPO Project Scheduler ---\nInitial Capital: %d\n", w);
    int final_cap = find_max_capital(k, w, profits, capital, n);
    printf("Final Maximized Capital = %d\n", final_cap);
    return 0;
}
