#include <stdio.h>
#include <stdbool.h>

int max(int a, int b) { return (a > b) ? a : b; }

bool can_eat_all(int piles[], int n, int speed, int h) {
    long hours = 0;
    for (int i = 0; i < n; i++) {
        hours += (piles[i] + speed - 1) / speed;
    }
    return hours <= h;
}

int min_eating_speed(int piles[], int n, int h) {
    int max_p = 0;
    for (int i = 0; i < n; i++) max_p = max(max_p, piles[i]);

    int low = 1, high = max_p, ans = max_p;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (can_eat_all(piles, n, mid, h)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

int main() {
    int piles[] = {3, 6, 7, 11};
    int n = 4, h = 8;
    printf("--- Koko Eating Bananas Search Space Optimization ---\n");
    printf("Minimum Eating Speed = %d bananas/hr\n", min_eating_speed(piles, n, h));
    return 0;
}
