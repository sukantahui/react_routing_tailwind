#include <stdio.h>

void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }

void min_heapify(int h[], int size, int i) {
    int smallest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < size && h[l] < h[smallest]) smallest = l;
    if (r < size && h[r] < h[smallest]) smallest = r;
    if (smallest != i) { swap(&h[i], &h[smallest]); min_heapify(h, size, smallest); }
}

int extract_min(int h[], int *size) {
    int root = h[0];
    h[0] = h[--(*size)];
    min_heapify(h, *size, 0);
    return root;
}

void insert_min(int h[], int *size, int val) {
    int i = (*size)++;
    h[i] = val;
    while (i != 0 && h[(i - 1) / 2] > h[i]) {
        swap(&h[i], &h[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

int connect_ropes(int ropes[], int n) {
    int size = n;
    int h[100];
    for (int i = 0; i < n; i++) h[i] = ropes[i];
    for (int i = size / 2 - 1; i >= 0; i--) min_heapify(h, size, i);

    int total_cost = 0;
    while (size > 1) {
        int first = extract_min(h, &size);
        int second = extract_min(h, &size);
        int cost = first + second;
        total_cost += cost;
        insert_min(h, &size, cost);
    }
    return total_cost;
}

int main() {
    int ropes[] = {4, 3, 2, 6};
    int n = 4;
    printf("--- Connect Ropes with Minimum Total Cost ---\n");
    printf("Minimum Total Connection Cost = %d\n", connect_ropes(ropes, n));
    return 0;
}
