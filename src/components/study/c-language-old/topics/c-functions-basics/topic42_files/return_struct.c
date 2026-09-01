// return_struct.c – Returning a struct (often uses hidden pointer)
#include <stdio.h>

typedef struct {
    int x;
    int y;
} Point;

Point createPoint(int a, int b) {
    Point p = {a, b};
    return p;  // Compiler may pass a hidden pointer to a location in caller's frame
}

int main() {
    Point pt = createPoint(10, 20);
    printf("Point: (%d, %d)\n", pt.x, pt.y);
    return 0;
}