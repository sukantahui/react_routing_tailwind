#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_QUEUE 20

typedef struct {
    int id;
    int priority;
    char taskName[32];
} Task;

typedef struct {
    Task heap[MAX_QUEUE];
    int count;
} TaskPriorityQueue;

void swap(Task *a, Task *b) { Task tmp = *a; *a = *b; *b = tmp; }

void enqueueTask(TaskPriorityQueue *pq, int id, int priority, const char *name) {
    if (pq->count == MAX_QUEUE) return;
    Task t = {id, priority, ""};
    strncpy(t.taskName, name, 31);
    pq->heap[pq->count] = t;
    int i = pq->count++;
    while (i > 0 && pq->heap[(i - 1) / 2].priority < pq->heap[i].priority) {
        swap(&pq->heap[(i - 1) / 2], &pq->heap[i]);
        i = (i - 1) / 2;
    }
    printf("[ENQUEUE] Task #%d '%s' (Pri: %d)\n", id, name, priority);
}

Task dequeueTask(TaskPriorityQueue *pq) {
    Task root = pq->heap[0];
    pq->heap[0] = pq->heap[--pq->count];
    int i = 0;
    while (2 * i + 1 < pq->count) {
        int maxChild = 2 * i + 1;
        if (maxChild + 1 < pq->count && pq->heap[maxChild + 1].priority > pq->heap[maxChild].priority) {
            maxChild++;
        }
        if (pq->heap[i].priority >= pq->heap[maxChild].priority) break;
        swap(&pq->heap[i], &pq->heap[maxChild]);
        i = maxChild;
    }
    printf("[DEQUEUE] Serving Task #%d '%s' (Pri: %d)\n", root.id, root.taskName, root.priority);
    return root;
}

int main() {
    printf("=== Priority Queue Scheduler backed by Max Heap in C ===\n\n");
    TaskPriorityQueue pq = {.count = 0};

    enqueueTask(&pq, 1, 5, "Database Backup");
    enqueueTask(&pq, 2, 10, "Critical Security Patch");
    enqueueTask(&pq, 3, 2, "Report Generation");

    dequeueTask(&pq); // Serves Critical Security Patch (Pri 10)
    dequeueTask(&pq); // Serves Database Backup (Pri 5)

    return 0;
}
