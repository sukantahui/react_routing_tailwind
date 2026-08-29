#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

#define MAX 5

// ============================================================================
// 1. Array-Based Stack Implementation (LIFO)
// ============================================================================
typedef struct {
    int items[MAX];
    int top;
} ArrayStack;

void initArrayStack(ArrayStack *s) {
    s->top = -1;
}

bool isStackFull(ArrayStack *s) {
    return s->top == MAX - 1;
}

bool isStackEmpty(ArrayStack *s) {
    return s->top == -1;
}

void push(ArrayStack *s, int value) {
    if (isStackFull(s)) {
        printf("[STACK OVERFLOW] Cannot push %d. Stack capacity reached.\n", value);
        return;
    }
    s->items[++(s->top)] = value;
    printf("[STACK PUSH] Pushed %d (Top index: %d)\n", value, s->top);
}

int pop(ArrayStack *s) {
    if (isStackEmpty(s)) {
        printf("[STACK UNDERFLOW] Stack is empty. Cannot pop.\n");
        return -1;
    }
    int poppedVal = s->items[(s->top)--];
    printf("[STACK POP] Popped %d\n", poppedVal);
    return poppedVal;
}

int peekStack(ArrayStack *s) {
    if (isStackEmpty(s)) return -1;
    return s->items[s->top];
}

// ============================================================================
// 2. Circular Queue Implementation (FIFO with Modulo Wrapping)
// ============================================================================
typedef struct {
    int items[MAX];
    int front;
    int rear;
} CircularQueue;

void initQueue(CircularQueue *q) {
    q->front = -1;
    q->rear = -1;
}

bool isQueueFull(CircularQueue *q) {
    return (q->rear + 1) % MAX == q->front;
}

bool isQueueEmpty(CircularQueue *q) {
    return q->front == -1;
}

void enqueue(CircularQueue *q, int value) {
    if (isQueueFull(q)) {
        printf("[QUEUE FULL] Cannot enqueue %d (Front: %d, Rear: %d)\n", value, q->front, q->rear);
        return;
    }
    if (isQueueEmpty(q)) {
        q->front = 0;
    }
    q->rear = (q->rear + 1) % MAX;
    q->items[q->rear] = value;
    printf("[ENQUEUE] Added %d at index %d\n", value, q->rear);
}

int dequeue(CircularQueue *q) {
    if (isQueueEmpty(q)) {
        printf("[QUEUE UNDERFLOW] Queue is empty.\n");
        return -1;
    }
    int val = q->items[q->front];
    if (q->front == q->rear) { // Reset empty state
        q->front = -1;
        q->rear = -1;
    } else {
        q->front = (q->front + 1) % MAX;
    }
    printf("[DEQUEUE] Removed %d\n", val);
    return val;
}

void printQueue(CircularQueue *q) {
    if (isQueueEmpty(q)) {
        printf("Queue: [ EMPTY ]\n");
        return;
    }
    printf("Queue Contents: [ ");
    int i = q->front;
    while (1) {
        printf("%d ", q->items[i]);
        if (i == q->rear) break;
        i = (i + 1) % MAX;
    }
    printf("] (Front: %d, Rear: %d)\n", q->front, q->rear);
}

// ============================================================================
// Main Execution Lab
// ============================================================================
int main() {
    printf("========================================================\n");
    printf("  CODER & ACCOTAX - STACK & CIRCULAR QUEUE LAB IN C\n");
    printf("========================================================\n\n");

    printf("--- 1. Array Stack Operations (LIFO) ---\n");
    ArrayStack st;
    initArrayStack(&st);
    push(&st, 10);
    push(&st, 20);
    push(&st, 30);
    printf("Current Stack Top: %d\n", peekStack(&st));
    pop(&st);
    pop(&st);
    pop(&st);
    pop(&st); // Underflow test
    printf("\n");

    printf("--- 2. Circular Queue Operations (FIFO) ---\n");
    CircularQueue q;
    initQueue(&q);
    enqueue(&q, 100);
    enqueue(&q, 200);
    enqueue(&q, 300);
    enqueue(&q, 400);
    printQueue(&q);

    dequeue(&q);
    dequeue(&q);
    printQueue(&q);

    printf("Enqueuing 500 and 600 (wrapping around array indices)...\n");
    enqueue(&q, 500);
    enqueue(&q, 600);
    printQueue(&q);

    return 0;
}
