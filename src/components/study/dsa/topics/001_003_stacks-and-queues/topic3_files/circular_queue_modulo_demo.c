#include <stdio.h>
#include <stdlib.h>

#define MAX 5

typedef struct {
    int items[MAX];
    int front;
    int rear;
} CircularQueue;

void initQueue(CircularQueue *q) {
    q->front = -1;
    q->rear = -1;
}

int isFull(CircularQueue *q) {
    return ((q->rear + 1) % MAX == q->front);
}

int isEmpty(CircularQueue *q) {
    return (q->front == -1);
}

void enqueue(CircularQueue *q, int val) {
    if (isFull(q)) {
        printf("[CIRCULAR QUEUE FULL] Cannot enqueue %d\n", val);
        return;
    }
    if (isEmpty(q)) q->front = 0;
    q->rear = (q->rear + 1) % MAX;
    q->items[q->rear] = val;
    printf("[ENQUEUE] Enqueued %d at index %d\n", val, q->rear);
}

int dequeue(CircularQueue *q) {
    if (isEmpty(q)) {
        printf("[CIRCULAR QUEUE EMPTY] Cannot dequeue\n");
        return -1;
    }
    int val = q->items[q->front];
    if (q->front == q->rear) { // Queue becomes empty after pop
        q->front = -1;
        q->rear = -1;
    } else {
        q->front = (q->front + 1) % MAX;
    }
    printf("[DEQUEUE] Dequeued %d\n", val);
    return val;
}

int main() {
    printf("=== Circular Queue Modulo Arithmetic (rear+1)%%MAX in C ===\n\n");
    CircularQueue q;
    initQueue(&q);

    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    enqueue(&q, 40);

    dequeue(&q); // Front wraps
    dequeue(&q);

    // Re-uses freed front slots cleanly!
    enqueue(&q, 50);
    enqueue(&q, 60);

    return 0;
}
