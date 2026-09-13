#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

/* =====================================================================
 * 1. LINKED STACK (LIFO: Last-In, First-Out)
 * ===================================================================== */
typedef struct StackNode {
    int data;
    struct StackNode *next;
} StackNode;

typedef struct {
    StackNode *top;
    size_t size;
} LinkedStack;

LinkedStack *createStack(void) {
    LinkedStack *stack = (LinkedStack *)malloc(sizeof(LinkedStack));
    stack->top = NULL;
    stack->size = 0;
    return stack;
}

void push(LinkedStack *s, int val) {
    StackNode *node = (StackNode *)malloc(sizeof(StackNode));
    node->data = val;
    node->next = s->top;
    s->top = node;
    s->size++;
}

bool pop(LinkedStack *s, int *outVal) {
    if (s->top == NULL) return false;
    StackNode *temp = s->top;
    *outVal = temp->data;
    s->top = temp->next;
    free(temp);
    s->size--;
    return true;
}

bool peekStack(const LinkedStack *s, int *outVal) {
    if (s->top == NULL) return false;
    *outVal = s->top->data;
    return true;
}

void freeStack(LinkedStack *s) {
    int val;
    while (pop(s, &val));
    free(s);
}

/* =====================================================================
 * 2. LINKED QUEUE (FIFO: First-In, First-Out)
 * ===================================================================== */
typedef struct QueueNode {
    int data;
    struct QueueNode *next;
} QueueNode;

typedef struct {
    QueueNode *front;
    QueueNode *rear;
    size_t size;
} LinkedQueue;

LinkedQueue *createQueue(void) {
    LinkedQueue *q = (LinkedQueue *)malloc(sizeof(LinkedQueue));
    q->front = NULL;
    q->rear = NULL;
    q->size = 0;
    return q;
}

void enqueue(LinkedQueue *q, int val) {
    QueueNode *node = (QueueNode *)malloc(sizeof(QueueNode));
    node->data = val;
    node->next = NULL;
    if (q->rear == NULL) {
        q->front = q->rear = node;
    } else {
        q->rear->next = node;
        q->rear = node;
    }
    q->size++;
}

bool dequeue(LinkedQueue *q, int *outVal) {
    if (q->front == NULL) return false;
    QueueNode *temp = q->front;
    *outVal = temp->data;
    q->front = q->front->next;
    if (q->front == NULL) {
        q->rear = NULL;
    }
    free(temp);
    q->size--;
    return true;
}

void freeQueue(LinkedQueue *q) {
    int val;
    while (dequeue(q, &val));
    free(q);
}

int main(void) {
    printf("=====================================================\n");
    printf("  Stack (LIFO) & Queue (FIFO) Implementations in C\n");
    printf("=====================================================\n\n");

    /* 1. Stack Demonstration */
    printf(">>> 1. Stack (LIFO: Last-In, First-Out) Operations:\n");
    LinkedStack *stack = createStack();

    push(stack, 100);
    push(stack, 200);
    push(stack, 300);
    printf("    Pushed 100, 200, 300 to Stack (Size: %zu)\n", stack->size);

    int topVal;
    if (peekStack(stack, &topVal)) {
        printf("    Peek Top Element: %d\n", topVal);
    }

    printf("    Popping elements from Stack: ");
    int popped;
    while (pop(stack, &popped)) {
        printf("[%d] ", popped);
    }
    printf("\n");
    freeStack(stack);

    /* 2. Queue Demonstration */
    printf("\n-----------------------------------------------------\n");
    printf(">>> 2. Queue (FIFO: First-In, First-Out) Operations:\n");
    LinkedQueue *queue = createQueue();

    enqueue(queue, 10);
    enqueue(queue, 20);
    enqueue(queue, 30);
    printf("    Enqueued 10, 20, 30 to Queue (Size: %zu)\n", queue->size);

    printf("    Dequeuing elements from Queue: ");
    int dequeued;
    while (dequeue(queue, &dequeued)) {
        printf("[%d] ", dequeued);
    }
    printf("\n");
    freeQueue(queue);

    printf("\n=== Stack & Queue Demonstration Completed Successfully ===\n");
    return EXIT_SUCCESS;
}
