#include <stdio.h>

int max(int a, int b) { return a > b ? a : b; }

int maxProfit(int prices[], int n) {
    if (n < 2) return 0;
    int buy = -prices[0], sell = 0, cooldown = 0;
    for (int i = 1; i < n; i++) {
        int newBuy = max(buy, cooldown - prices[i]);
        int newSell = max(sell, buy + prices[i]);
        int newCooldown = max(cooldown, sell);
        buy = newBuy;
        sell = newSell;
        cooldown = newCooldown;
    }
    return sell;
}

int main() {
    int n, prices[100];
    printf("Enter number of days: ");
    scanf("%d", &n);
    printf("Enter prices: ");
    for (int i = 0; i < n; i++) scanf("%d", &prices[i]);

    int profit = maxProfit(prices, n);
    printf("Maximum profit = %d\n", profit);
    return 0;
}