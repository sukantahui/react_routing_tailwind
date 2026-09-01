#include <stdio.h>

int maxProfit(int prices[], int n) {
    if (n == 0) return 0;
    int sold = 0, held = -prices[0], cooled = 0;
    for (int i = 1; i < n; i++) {
        int prevSold = sold;
        sold = held + prices[i];
        held = (held > cooled - prices[i]) ? held : cooled - prices[i];
        cooled = (cooled > prevSold) ? cooled : prevSold;
    }
    return (sold > cooled) ? sold : cooled;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int prices[n];
    printf("Prices: ");
    for (int i = 0; i < n; i++) scanf("%d", &prices[i]);

    int profit = maxProfit(prices, n);
    printf("Maximum profit = %d\n", profit);
    return 0;
}
