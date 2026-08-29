#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_HEAP 20

// Task structure for Priority Queue
typedef struct {
    int taskId;
    int priority; // Higher value = Higher Priority
    char description[64];
} Task;

typedef struct {
    Task tasks[MAX_HEAP];
    int size;
} PriorityQueue;

void swapTask(Task *a, Task *b) {
    Task tmp = *a;
    *a = *b;
    *b = tmp;
}

void initPriorityQueue(PriorityQueue *pq) {
    pq->size = 0;
}

int parent(int i) { return (i - 1) / 2; }
int leftChild(int i) { return 2 * i + 1; }
int rightChild(int i) { return 2 * i + 2; }

// Heapify-Up (Bubble Up) - O(log n)
void heapifyUp(PriorityQueue *pq, int index) {
    while (index > 0 && pq->tasks[parent(index)].priority < pq->tasks[index].priority) {
        swapTask(&pq->tasks[parent(index)], &pq->tasks[index]);
        index = parent(index);
    }
}

// Heapify-Down (Sift Down) - O(log n)
void heapifyDown(PriorityQueue *pq, int index) {
    int maxIndex = index;
    int left = leftChild(index);
    int right = rightChild(index);

    if (left < pq->size && pq->tasks[left].priority > pq->tasks[maxIndex].priority)
        maxIndex = left;

    if (right < pq->size && pq->tasks[right].priority > pq->tasks[maxIndex].priority)
        maxIndex = right;

    if (index != maxIndex) {
        swapTask(&pq->tasks[index], &pq->tasks[maxIndex]);
        heapifyDown(pq, maxIndex);
    }
}

// Push task to Priority Queue - O(log n)
void pushTask(PriorityQueue *pq, int taskId, int priority, const char *desc) {
    if (pq->size == MAX_HEAP) {
        printf("[PQ FULL] Cannot add task %d\n", taskId);
        return;
    }
    Task t;
    t.taskId = taskId;
    t.priority = priority;
    strncpy(t.description, desc, 63);

    pq->tasks[pq->size] = t;
    pq->size++;
    heapifyUp(pq, pq->size - 1);
    printf("[PQ PUSH] Task #%d '%s' (Priority %d) added\n", taskId, desc, priority);
}

// Pop highest priority task - O(log n)
Task popTask(PriorityQueue *pq) {
    Task empty = {-1, -1, "EMPTY"};
    if (pq->size <= 0) {
        printf("[PQ EMPTY] No tasks available\n");
        return empty;
    }
    Task root = pq->tasks[0];
    pq->tasks[0] = pq->tasks[pq->size - 1];
    pq->size--;
    heapifyDown(pq, 0);
    printf("[PQ POP] Dispatched Task #%d '%s' (Priority %d)\n", root.taskId, root.description, root.priority);
    return root;
}

void printPriorityQueue(PriorityQueue *pq) {
    printf("\n--- Current Priority Queue Binary Heap Array ---\n");
    for (int i = 0; i < pq->size; i++) {
        printf("[%d] Task #%d: '%s' (Pri: %d)\n", i, pq->tasks[i].taskId, pq->tasks[i].description, pq->tasks[i].priority);
    }
    printf("------------------------------------------------\n\n");
}

int main() {
    printf("=== Enterprise Priority Queue & Max Heap Scheduler in C ===\n\n");
    PriorityQueue pq;
    initPriorityQueue(&pq);

    pushTask(&pq, 101, 3, "Background Data Sync");
    pushTask(&pq, 102, 9, "Emergency System Alert");
    pushTask(&pq, 103, 5, "User Payment Request");
    pushTask(&pq, 104, 1, "Log Cleanup Worker");
    pushTask(&pq, 105, 8, "High Priority API Request");

    printPriorityQueue(&pq);

    popTask(&pq); // Dispatches Emergency Alert (Pri 9)
    popTask(&pq); // Dispatches High Priority API (Pri 8)

    printPriorityQueue(&pq);

    return 0;
}
