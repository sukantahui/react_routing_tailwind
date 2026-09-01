#include <stdio.h>

int candy(int ratings[], int n) {
    int candies[n];
    for (int i = 0; i < n; i++) candies[i] = 1;

    for (int i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1])
            candies[i] = candies[i - 1] + 1;
    }

    for (int i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1] && candies[i] <= candies[i + 1])
            candies[i] = candies[i + 1] + 1;
    }

    int sum = 0;
    for (int i = 0; i < n; i++) sum += candies[i];
    return sum;
}

int main() {
    int n, ratings[100];
    printf("Enter number of children: ");
    scanf("%d", &n);
    printf("Enter ratings: ");
    for (int i = 0; i < n; i++) scanf("%d", &ratings[i]);

    int total = candy(ratings, n);
    printf("Minimum candies = %d\n", total);
    return 0;
}