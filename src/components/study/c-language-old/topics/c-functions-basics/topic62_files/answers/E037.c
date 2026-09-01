#include <stdio.h>
#include <stdlib.h>

int candy(int ratings[], int n) {
    int *candies = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) candies[i] = 1;
    // left to right
    for (int i = 1; i < n; i++)
        if (ratings[i] > ratings[i-1])
            candies[i] = candies[i-1] + 1;
    // right to left
    for (int i = n-2; i >= 0; i--)
        if (ratings[i] > ratings[i+1] && candies[i] <= candies[i+1])
            candies[i] = candies[i+1] + 1;
    int sum = 0;
    for (int i = 0; i < n; i++) sum += candies[i];
    free(candies);
    return sum;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int ratings[n];
    printf("Enter ratings: ");
    for (int i = 0; i < n; i++) scanf("%d", &ratings[i]);

    int minCandies = candy(ratings, n);
    printf("Minimum candies = %d\n", minCandies);
    return 0;
}
