#include <stdio.h>
#include <stdlib.h>

#define MAX 5

typedef struct {
    int arr[MAX];
    int front;
    int rear;
    int size;
} Deque;

void initDeque(Deque *dq) {
    dq->front = -1;
    dq->rear = 0;
    dq->size = 0;
}

void insertFront(Deque *dq, int val) {
    if (dq->size == MAX) { printf("[DEQUE FULL] Cannot insert front %d\n", val); return; }
    if (dq->front == -1) { dq->front = 0; dq->rear = 0; }
    else dq->front = (dq->front - 1 + MAX) % MAX;
    dq->arr[dq->front] = val;
    dq->size++;
    printf("[DEQUE FRONT] Inserted %d at front index %d\n", val, dq->front);
}

void insertRear(Deque *dq, int val) {
    if (dq->size == MAX) { printf("[DEQUE FULL] Cannot insert rear %d\n", val); return; }
    if (dq->front == -1) { dq->front = 0; dq->rear = 0; }
    else dq->rear = (dq->rear + 1) % MAX;
    dq->arr[dq->rear] = val;
    dq->size++;
    printf("[DEQUE REAR] Inserted %d at rear index %d\n", val, dq->rear);
}

int deleteFront(Deque *dq) {
    if (dq->size == 0) return -1;
    int val = dq->arr[dq->front];
    dq->front = (dq->front + 1) % MAX;
    dq->size--;
    printf("[DEQUE FRONT POP] Removed %d\n", val);
    return val;
}

int deleteRear(Deque *dq) {
    if (dq->size == 0) return -1;
    int val = dq->arr[dq->rear];
    dq->rear = (dq->rear - 1 + MAX) % MAX;
    dq->size--;
    printf("[DEQUE REAR POP] Removed %d\n", val);
    return val;
}

int main() {
    printf("=== Double-Ended Queue (Deque) Mechanics in C ===\n\n");
    Deque dq;
    initDeque(&dq);

    insertRear(&dq, 10);
    insertRear(&dq, 20);
    insertFront(&dq, 5); // Enqueue at front!

    deleteRear(&dq);
    deleteFront(&dq);

    return 0;
}
