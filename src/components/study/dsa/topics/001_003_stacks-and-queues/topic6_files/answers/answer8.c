#include <stdio.h>
#define N 5

typedef struct {
    int arr[N];
    int front, rear, size;
} Deque;

void init_deque(Deque *d) { d->front = -1; d->rear = 0; d->size = 0; }

void push_front(Deque *d, int val) {
    if (d->size == N) { printf("Deque Full!\n"); return; }
    if (d->front == -1) { d->front = 0; d->rear = 0; }
    else d->front = (d->front - 1 + N) % N;
    d->arr[d->front] = val;
    d->size++;
}

void push_back(Deque *d, int val) {
    if (d->size == N) { printf("Deque Full!\n"); return; }
    if (d->front == -1) { d->front = 0; d->rear = 0; }
    else d->rear = (d->rear + 1) % N;
    d->arr[d->rear] = val;
    d->size++;
}

int main() {
    Deque d; init_deque(&d);
    printf("--- Double-Ended Queue (Deque) ---\n");
    push_front(&d, 10); push_back(&d, 20); push_front(&d, 5);
    printf("Front Element: %d, Rear Element: %d\n", d.arr[d.front], d.arr[d.rear]);
    return 0;
}
