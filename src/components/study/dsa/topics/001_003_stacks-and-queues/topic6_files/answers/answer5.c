#include <stdio.h>
#define CAPACITY 5

typedef struct {
    int data[CAPACITY];
    int front, rear;
} ArrayQueue;

void init_queue(ArrayQueue *q) { q->front = 0; q->rear = -1; }

void enqueue(ArrayQueue *q, int val) {
    if (q->rear == CAPACITY - 1) { printf("Queue Full!\n"); return; }
    q->data[++(q->rear)] = val;
}

int dequeue(ArrayQueue *q) {
    if (q->front > q->rear) { printf("Queue Empty!\n"); return -1; }
    return q->data[(q->front)++];
}

int main() {
    ArrayQueue q; init_queue(&q);
    printf("--- Standard Linear Queue ---\n");
    enqueue(&q, 10); enqueue(&q, 20); enqueue(&q, 30);
    printf("Dequeued: %d\n", dequeue(&q));
    return 0;
}
