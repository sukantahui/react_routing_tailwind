#include <stdio.h>

int maxArea(int height[], int n) {
    int left = 0, right = n-1;
    int max = 0;
    while (left < right) {
        int h = height[left] < height[right] ? height[left] : height[right];
        int w = right - left;
        int area = h * w;
        if (area > max) max = area;
        if (height[left] < height[right])
            left++;
        else
            right--;
    }
    return max;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int heights[n];
    printf("Enter heights: ");
    for (int i = 0; i < n; i++) scanf("%d", &heights[i]);

    int area = maxArea(heights, n);
    printf("Maximum area = %d\n", area);
    return 0;
}
