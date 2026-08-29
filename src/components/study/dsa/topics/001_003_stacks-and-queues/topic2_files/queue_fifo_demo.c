#include <stdio.h>
#include <stdlib.h>

#define MAX 5

typedef struct {
    int items[MAX];
    int front;
    int rear;
} LinearQueue;

void initQueue(LinearQueue *q) {
    q->front = -1;
    q->rear = -1;
}

void enqueue(LinearQueue *q, int value) {
    if (q->rear == MAX - 1) {
        printf("[QUEUE FULL] Linear Queue limitation hit! (Rear is at %d)\n", q->rear);
        return;
    }
    if (q->front == -1) q->front = 0;
    q->items[++(q->rear)] = value;
    printf("[ENQUEUE] Enqueued %d at index %d\n", value, q->rear);
}

int dequeue(LinearQueue *q) {
    if (q->front == -1 || q->front > q->rear) {
        printf("[QUEUE EMPTY] Cannot dequeue\n");
        return -1;
    }
    int val = q->items[q->front++];
    printf("[DEQUEUE] Dequeued %d from index %d\n", val, q->front - 1);
    return val;
}

int main() {
    printf("=== Linear Queue FIFO Mechanics & Memory Wasting Problem in C ===\n\n");
    LinearQueue q;
    initQueue(&q);

    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    enqueue(&q, 40);
    enqueue(&q, 50);

    dequeue(&q); // Front becomes 1
    dequeue(&q); // Front becomes 2

    // Even though 2 slots are free at indices 0 & 1, rear is MAX-1 (4)!
    enqueue(&q, 60); // Fails!

    return 0;
}
