#include <stdio.h>
#define N 5

typedef struct {
    int data[N];
    int front, rear, count;
} CircularQueue;

void init_circular(CircularQueue *q) { q->front = 0; q->rear = -1; q->count = 0; }

void enqueue_c(CircularQueue *q, int val) {
    if (q->count == N) { printf("Circular Queue Full!\n"); return; }
    q->rear = (q->rear + 1) % N;
    q->data[q->rear] = val;
    q->count++;
}

int dequeue_c(CircularQueue *q) {
    if (q->count == 0) { printf("Circular Queue Empty!\n"); return -1; }
    int val = q->data[q->front];
    q->front = (q->front + 1) % N;
    q->count--;
    return val;
}

int main() {
    CircularQueue q; init_circular(&q);
    printf("--- Circular Queue ADT ---\n");
    enqueue_c(&q, 10); enqueue_c(&q, 20); enqueue_c(&q, 30);
    printf("Dequeued: %d\n", dequeue_c(&q));
    enqueue_c(&q, 40); enqueue_c(&q, 50); enqueue_c(&q, 60);
    return 0;
}
