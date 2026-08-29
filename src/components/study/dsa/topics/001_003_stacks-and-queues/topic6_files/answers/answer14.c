#include <stdio.h>
#define N 100

typedef struct {
    int q1[N], q2[N];
    int f1, r1, f2, r2;
} StackTwoQueues;

void init_s2q(StackTwoQueues *s) { s->f1 = 0; s->r1 = -1; s->f2 = 0; s->r2 = -1; }

void push_s2q(StackTwoQueues *s, int val) {
    s->q2[++(s->r2)] = val;
    while (s->f1 <= s->r1) s->q2[++(s->r2)] = s->q1[(s->f1)++];
    // Swap q1 and q2
    for (int i = s->f2; i <= s->r2; i++) s->q1[i - s->f2] = s->q2[i];
    s->f1 = 0; s->r1 = s->r2 - s->f2;
    s->f2 = 0; s->r2 = -1;
}

int pop_s2q(StackTwoQueues *s) {
    if (s->f1 > s->r1) return -1;
    return s->q1[(s->f1)++];
}

int main() {
    StackTwoQueues s; init_s2q(&s);
    printf("--- Stack using Two Queues ---\n");
    push_s2q(&s, 10); push_s2q(&s, 20); push_s2q(&s, 30);
    printf("Popped: %d\n", pop_s2q(&s));
    return 0;
}
