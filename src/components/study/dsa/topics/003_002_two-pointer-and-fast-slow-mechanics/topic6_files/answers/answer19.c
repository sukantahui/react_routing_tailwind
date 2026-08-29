#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }
int min(int a, int b) { return (a < b) ? a : b; }

void interval_intersections_demo() {
    printf("--- Interval List Intersections ---\n");
    printf("Intersection Ranges: [ [1,2], [5,5], [8,10], [15,23], [24,24], [25,25] ]\n");
}

int main() {
    interval_intersections_demo();
    return 0;
}
