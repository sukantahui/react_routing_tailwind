#include <stdio.h>

int maxArea(int height[], int n) {
    int left = 0, right = n - 1;
    int maxWater = 0;
    while (left < right) {
        int h = (height[left] < height[right]) ? height[left] : height[right];
        int w = right - left;
        int area = h * w;
        if (area > maxWater) maxWater = area;
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}

int main() {
    int n, height[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter heights: ");
    for (int i = 0; i < n; i++) scanf("%d", &height[i]);

    int water = maxArea(height, n);
    printf("Maximum area = %d\n", water);
    return 0;
}