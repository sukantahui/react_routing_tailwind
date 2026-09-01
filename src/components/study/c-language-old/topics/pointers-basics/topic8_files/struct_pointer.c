#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main() {
    struct Point points[] = {{1,2}, {3,4}, {5,6}};
    struct Point *p = points;   // points to points[0]

    printf("Size of struct Point = %zu bytes\n", sizeof(struct Point));
    printf("points[0] at %p\n", (void*)p);
    printf("points[1] at %p\n", (void*)(p+1));
    printf("Difference = %ld bytes\n", (char*)(p+1) - (char*)p);

    // Traverse using pointer arithmetic
    for (p = points; p < points + 3; p++) {
        printf("Point: (%d, %d)\n", p->x, p->y);
    }

    return 0;
}