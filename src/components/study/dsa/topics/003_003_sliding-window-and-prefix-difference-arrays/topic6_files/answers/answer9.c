#include <stdio.h>

void product_except_self(int nums[], int n, int ans[]) {
    ans[0] = 1;
    for (int i = 1; i < n; i++) ans[i] = ans[i - 1] * nums[i - 1];

    int R = 1;
    for (int i = n - 1; i >= 0; i--) {
        ans[i] = ans[i] * R;
        R *= nums[i];
    }
}

int main() {
    int nums[] = {1, 2, 3, 4};
    int n = 4, ans[4];
    printf("--- Product of Array Except Self ---\n");
    product_except_self(nums, n, ans);
    printf("Product Array: [ ");
    for (int i = 0; i < n; i++) printf("%d ", ans[i]);
    printf("]\n");
    return 0;
}
