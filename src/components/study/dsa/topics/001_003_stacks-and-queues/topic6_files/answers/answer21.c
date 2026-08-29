#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

int largest_rectangle_area(int heights[], int n) {
    int stack[100], top = -1;
    int max_area = 0;
    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        while (top != -1 && heights[stack[top]] >= h) {
            int height = heights[stack[top--]];
            int width = (top == -1) ? i : (i - stack[top] - 1);
            max_area = max(max_area, height * width);
        }
        stack[++top] = i;
    }
    return max_area;
}

int main() {
    int heights[] = {2, 1, 5, 6, 2, 3};
    int n = 6;
    printf("--- Largest Rectangle in Histogram ---\n");
    printf("Maximum Rectangular Area = %d\n", largest_rectangle_area(heights, n));
    return 0;
}
