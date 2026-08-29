#include <stdio.h>
#include <stdbool.h>

void sort_stalls(int stalls[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (stalls[i] > stalls[j]) {
                int temp = stalls[i]; stalls[i] = stalls[j]; stalls[j] = temp;
            }
        }
    }
}

bool can_place_cows(int stalls[], int n, int cows, int dist) {
    int count = 1, last_pos = stalls[0];
    for (int i = 1; i < n; i++) {
        if (stalls[i] - last_pos >= dist) {
            count++;
            last_pos = stalls[i];
            if (count >= cows) return true;
        }
    }
    return false;
}

int aggressive_cows(int stalls[], int n, int cows) {
    sort_stalls(stalls, n);
    int low = 1, high = stalls[n - 1] - stalls[0], ans = 0;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (can_place_cows(stalls, n, cows, mid)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
}

int main() {
    int stalls[] = {1, 2, 8, 4, 9};
    int n = 5, cows = 3;
    printf("--- Aggressive Cows Maximize Minimum Distance ---\n");
    printf("Maximized Minimum Distance = %d\n", aggressive_cows(stalls, n, cows));
    return 0;
}
