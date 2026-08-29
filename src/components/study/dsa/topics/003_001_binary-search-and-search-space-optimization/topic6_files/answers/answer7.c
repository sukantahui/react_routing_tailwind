#include <stdio.h>

int integer_sqrt(int x) {
    if (x == 0 || x == 1) return x;
    long low = 1, high = x, ans = 0;
    while (low <= high) {
        long mid = low + (high - low) / 2;
        if (mid * mid == x) return mid;
        if (mid * mid < x) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
}

int main() {
    int x = 28;
    printf("--- Integer Square Root via Binary Search ---\n");
    printf("Floor Square Root of %d = %d\n", x, integer_sqrt(x));
    return 0;
}
