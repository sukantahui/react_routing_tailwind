#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

typedef struct {
    Node *front, *rear;
} LinkedQueue;

void enqueue_link(LinkedQueue *q, int val) {
    Node *n = (Node*)malloc(sizeof(Node));
    n->data = val; n->next = NULL;
    if (!q->rear) { q->front = q->rear = n; return; }
    q->rear->next = n; q->rear = n;
}

int dequeue_link(LinkedQueue *q) {
    if (!q->front) return -1;
    Node *temp = q->front;
    int val = temp->data;
    q->front = q->front->next;
    if (!q->front) q->rear = NULL;
    free(temp);
    return val;
}

int main() {
    LinkedQueue q = {NULL, NULL};
    printf("--- Linked List Queue ---\n");
    enqueue_link(&q, 10); enqueue_link(&q, 20);
    printf("Dequeued: %d\n", dequeue_link(&q));
    return 0;
}
