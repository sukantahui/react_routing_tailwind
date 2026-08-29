#include <stdio.h>

int trap_rain_water(int height[], int n) {
    int left = 0, right = n - 1;
    int left_max = 0, right_max = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= left_max) left_max = height[left];
            else water += (left_max - height[left]);
            left++;
        } else {
            if (height[right] >= right_max) right_max = height[right];
            else water += (right_max - height[right]);
            right--;
        }
    }
    return water;
}

int main() {
    int height[] = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    int n = 12;
    printf("--- Trapping Rain Water (Two-Pointer Engine) ---\n");
    printf("Total Trapped Water Units = %d\n", trap_rain_water(height, n));
    return 0;
}
