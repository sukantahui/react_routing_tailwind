#include <stdio.h>

int trap(int height[], int n) {
    if (n == 0) return 0;
    int left = 0, right = n-1;
    int leftMax = 0, rightMax = 0;
    int water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax)
                leftMax = height[left];
            else
                water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax)
                rightMax = height[right];
            else
                water += rightMax - height[right];
            right--;
        }
    }
    return water;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int heights[n];
    printf("Enter heights: ");
    for (int i = 0; i < n; i++) scanf("%d", &heights[i]);

    int water = trap(heights, n);
    printf("Trapped water = %d units\n", water);
    return 0;
}
