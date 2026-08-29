#include <stdio.h>
#include <stdlib.h>

int max(int a, int b) {
    return (a > b) ? a : b;
}

// 1. Dynamic Programming: 0/1 Knapsack Problem (Tabulation) - O(n * W)
int knapsack(int W, const int wt[], const int val[], int n) {
    int K[n + 1][W + 1];

    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                K[i][w] = 0;
            else if (wt[i - 1] <= w)
                K[i][w] = max(val[i - 1] + K[i - 1][w - wt[i - 1]], K[i - 1][w]);
            else
                K[i][w] = K[i - 1][w];
        }
    }
    return K[n][W];
}

// 2. Greedy Paradigm: Fractional Knapsack Item
typedef struct {
    int weight;
    int value;
    double ratio;
} Item;

int compareItems(const void *a, const void *b) {
    Item *itemA = (Item *)a;
    Item *itemB = (Item *)b;
    if (itemB->ratio > itemA->ratio) return 1;
    if (itemB->ratio < itemA->ratio) return -1;
    return 0;
}

double fractionalKnapsack(int W, Item items[], int n) {
    for (int i = 0; i < n; i++) {
        items[i].ratio = (double)items[i].value / items[i].weight;
    }

    qsort(items, n, sizeof(Item), compareItems);

    double totalValue = 0.0;
    int currWeight = 0;

    for (int i = 0; i < n; i++) {
        if (currWeight + items[i].weight <= W) {
            currWeight += items[i].weight;
            totalValue += items[i].value;
        } else {
            int remain = W - currWeight;
            totalValue += items[i].value * ((double)remain / items[i].weight);
            break;
        }
    }
    return totalValue;
}

int main() {
    printf("=== Dynamic Programming vs Greedy Paradigms in C ===\n\n");

    // DP 0/1 Knapsack Test
    int val01[] = {60, 100, 120};
    int wt01[] = {10, 20, 30};
    int W = 50;
    int n01 = sizeof(val01) / sizeof(val01[0]);

    printf("0/1 Knapsack Max Value (DP): %d\n", knapsack(W, wt01, val01, n01));

    // Greedy Fractional Knapsack Test
    Item items[] = {{10, 60, 0}, {20, 100, 0}, {30, 120, 0}};
    int nFrac = sizeof(items) / sizeof(items[0]);

    printf("Fractional Knapsack Max Value (Greedy): %.2f\n", fractionalKnapsack(W, items, nFrac));

    return 0;
}
