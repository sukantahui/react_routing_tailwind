#include <stdio.h>

typedef struct {
    int pid;
    int priority;
} Process;

typedef struct {
    Process heap[50];
    int size;
} PriorityQueue;

void swap(Process *a, Process *b) { Process temp = *a; *a = *b; *b = temp; }

void insert_pq(PriorityQueue *pq, int pid, int priority) {
    int i = pq->size++;
    pq->heap[i] = (Process){pid, priority};
    while (i != 0 && pq->heap[(i - 1) / 2].priority < pq->heap[i].priority) {
        swap(&pq->heap[i], &pq->heap[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

int main() {
    PriorityQueue pq = {{{0}}, 0};
    printf("--- Priority Queue Process Scheduler ---\n");
    insert_pq(&pq, 101, 2); insert_pq(&pq, 102, 9); insert_pq(&pq, 103, 5);
    printf("Highest Priority Process PID = %d (Priority = %d)\n", pq.heap[0].pid, pq.heap[0].priority);
    return 0;
}
