#include <stdio.h>

int jump(int nums[], int n) {
    if (n <= 1) return 0;
    int jumps = 0, curEnd = 0, curFarthest = 0;
    for (int i = 0; i < n-1; i++) {
        if (i + nums[i] > curFarthest)
            curFarthest = i + nums[i];
        if (i == curEnd) {
            jumps++;
            curEnd = curFarthest;
        }
    }
    return jumps;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int jumps[n];
    printf("Enter jumps: ");
    for (int i = 0; i < n; i++) scanf("%d", &jumps[i]);

    int minJumps = jump(jumps, n);
    printf("Minimum jumps = %d\n", minJumps);
    return 0;
}
