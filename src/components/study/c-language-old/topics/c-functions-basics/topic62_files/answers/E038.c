#include <stdio.h>
#include <stdbool.h>

bool canJump(int nums[], int n) {
    int maxReach = 0;
    for (int i = 0; i < n; i++) {
        if (i > maxReach) return false;
        if (i + nums[i] > maxReach)
            maxReach = i + nums[i];
        if (maxReach >= n-1) return true;
    }
    return true;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int jumps[n];
    printf("Enter jumps: ");
    for (int i = 0; i < n; i++) scanf("%d", &jumps[i]);

    if (canJump(jumps, n))
        printf("Can reach last: Yes\n");
    else
        printf("Can reach last: No\n");
    return 0;
}
