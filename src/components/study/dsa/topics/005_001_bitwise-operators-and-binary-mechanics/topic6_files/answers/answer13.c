#include <stdio.h>

int range_bitwise_and(int left, int right) {
    int shift = 0;
    while (left < right) {
        left >>= 1;
        right >>= 1;
        shift++;
    }
    return left << shift;
}

int main() {
    int left = 5, right = 7;
    printf("--- Bitwise AND of Range [Left, Right] ---\n");
    printf("Range Bitwise AND [5..7] = %d\n", range_bitwise_and(left, right));
    return 0;
}
