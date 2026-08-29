#include <stdio.h>

void count_bits(int n, int ans[]) {
    ans[0] = 0;
    for (int i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
}

int main() {
    int n = 5, ans[6];
    count_bits(n, ans);
    printf("--- Counting Bits 0 to N ---\nSet Bits array [0..5]: [ ");
    for (int i = 0; i <= n; i++) printf("%d ", ans[i]);
    printf("]\n");
    return 0;
}
