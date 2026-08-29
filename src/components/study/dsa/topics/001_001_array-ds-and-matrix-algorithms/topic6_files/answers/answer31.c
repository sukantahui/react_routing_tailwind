#include <stdio.h>

int trap_rainwater(int height[], int n) {
    int left = 0, right = n - 1;
    int left_max = 0, right_max = 0;
    int total_water = 0;

    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= left_max) {
                left_max = height[left];
            } else {
                total_water += left_max - height[left];
            }
            left++;
        } else {
            if (height[right] >= right_max) {
                right_max = height[right];
            } else {
                total_water += right_max - height[right];
            }
            right--;
        }
    }
    return total_water;
}

int main() {
    int height[] = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    int n = sizeof(height) / sizeof(height[0]);

    printf("--- Trapping Rainwater Elevation Engine ---\nElevation Map: [ 0 1 0 2 1 0 1 3 2 1 2 1 ]\n");
    int water = trap_rainwater(height, n);

    printf("Total Trapped Water Volume = %d units\n", water);
    return 0;
}
