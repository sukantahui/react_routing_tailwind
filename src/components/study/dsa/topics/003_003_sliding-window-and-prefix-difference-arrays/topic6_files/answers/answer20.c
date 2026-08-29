#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

int max_score(int cardPoints[], int n, int k) {
    int current_score = 0;
    for (int i = 0; i < k; i++) current_score += cardPoints[i];

    int max_points = current_score;
    for (int i = 0; i < k; i++) {
        current_score += cardPoints[n - 1 - i] - cardPoints[k - 1 - i];
        max_points = max(max_points, current_score);
    }
    return max_points;
}

int main() {
    int cardPoints[] = {1, 2, 3, 4, 5, 6, 1};
    int n = 7, k = 3;
    printf("--- Maximum Points from Cards ---\n");
    printf("Maximum Card Score = %d\n", max_score(cardPoints, n, k));
    return 0;
}
