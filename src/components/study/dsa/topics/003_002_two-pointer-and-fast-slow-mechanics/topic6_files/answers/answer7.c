#include <stdio.h>

int min(int a, int b) { return (a < b) ? a : b; }
int max(int a, int b) { return (a > b) ? a : b; }

int max_area(int height[], int n) {
    int left = 0, right = n - 1, max_water = 0;
    while (left < right) {
        int width = right - left;
        int area = min(height[left], height[right]) * width;
        max_water = max(max_water, area);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return max_water;
}

int main() {
    int height[] = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    int n = 9;
    printf("--- Container With Most Water ---\n");
    printf("Maximum Water Container Area = %d\n", max_area(height, n));
    return 0;
}
