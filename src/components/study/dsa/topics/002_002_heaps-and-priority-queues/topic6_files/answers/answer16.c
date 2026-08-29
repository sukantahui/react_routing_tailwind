#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int x, y, dist_sq;
} Point;

void swap(Point *a, Point *b) { Point temp = *a; *a = *b; *b = temp; }

void max_heapify(Point h[], int k, int i) {
    int largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < k && h[l].dist_sq > h[largest].dist_sq) largest = l;
    if (r < k && h[r].dist_sq > h[largest].dist_sq) largest = r;
    if (largest != i) { swap(&h[i], &h[largest]); max_heapify(h, k, largest); }
}

int main() {
    Point pts[] = {{1, 3, 10}, {-2, 2, 8}, {5, 8, 89}};
    int n = 3, k = 2;
    Point h[2];
    for (int i = 0; i < k; i++) h[i] = pts[i];
    for (int i = k / 2 - 1; i >= 0; i--) max_heapify(h, k, i);

    for (int i = k; i < n; i++) {
        if (pts[i].dist_sq < h[0].dist_sq) {
            h[0] = pts[i];
            max_heapify(h, k, 0);
        }
    }

    printf("--- K Closest Points to Origin (K=2) ---\n");
    for (int i = 0; i < k; i++) printf("Point (%d, %d)\n", h[i].x, h[i].y);
    return 0;
}
