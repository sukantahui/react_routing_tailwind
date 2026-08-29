#include <stdio.h>

void daily_temperatures(int temp[], int n, int ans[]) {
    int stack[100], top = -1;
    for (int i = 0; i < n; i++) {
        while (top != -1 && temp[i] > temp[stack[top]]) {
            int idx = stack[top--];
            ans[idx] = i - idx;
        }
        stack[++top] = i;
    }
    while (top != -1) ans[stack[top--]] = 0;
}

int main() {
    int temp[] = {73, 74, 75, 71, 69, 72, 76, 73};
    int n = 8, ans[8];
    printf("--- Daily Temperatures / Next Warmer Day ---\n");
    daily_temperatures(temp, n, ans);
    printf("Days to wait: [ ");
    for (int i = 0; i < n; i++) printf("%d ", ans[i]);
    printf("]\n");
    return 0;
}
