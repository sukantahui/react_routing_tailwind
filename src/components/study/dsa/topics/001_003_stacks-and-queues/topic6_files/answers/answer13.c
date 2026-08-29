#include <stdio.h>
#define N 100

typedef struct {
    int s1[N], s2[N];
    int t1, t2;
} QueueTwoStacks;

void init_q2s(QueueTwoStacks *q) { q->t1 = -1; q->t2 = -1; }

void enqueue_q2s(QueueTwoStacks *q, int val) { q->s1[++(q->t1)] = val; }

int dequeue_q2s(QueueTwoStacks *q) {
    if (q->t2 == -1) {
        while (q->t1 != -1) q->s2[++(q->t2)] = q->s1[(q->t1)--];
    }
    if (q->t2 == -1) return -1;
    return q->s2[(q->t2)--];
}

int main() {
    QueueTwoStacks q; init_q2s(&q);
    printf("--- Queue using Two Stacks ---\n");
    enqueue_q2s(&q, 10); enqueue_q2s(&q, 20);
    printf("Dequeued: %d\n", dequeue_q2s(&q));
    enqueue_q2s(&q, 30);
    printf("Dequeued: %d\n", dequeue_q2s(&q));
    return 0;
}
