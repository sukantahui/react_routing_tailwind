#include <stdio.h>
#include <stdlib.h>

// Simple deque implementation using array
typedef struct {
    int *data;
    int front, rear, capacity;
} Deque;

Deque* createDeque(int cap) {
    Deque *dq = (Deque*)malloc(sizeof(Deque));
    dq->data = (int*)malloc(cap * sizeof(int));
    dq->front = 0;
    dq->rear = -1;
    dq->capacity = cap;
    return dq;
}

int isEmpty(Deque *dq) { return dq->rear < dq->front; }
int size(Deque *dq) { return dq->rear - dq->front + 1; }
void pushBack(Deque *dq, int val) { dq->data[++dq->rear] = val; }
void popFront(Deque *dq) { dq->front++; }
void popBack(Deque *dq) { dq->rear--; }
int front(Deque *dq) { return dq->data[dq->front]; }
int back(Deque *dq) { return dq->data[dq->rear]; }
void freeDeque(Deque *dq) { free(dq->data); free(dq); }

void maxSlidingWindow(int nums[], int n, int k) {
    if (n == 0 || k == 0) return;
    Deque *dq = createDeque(n);
    for (int i = 0; i < n; i++) {
        // remove out-of-window indices
        while (!isEmpty(dq) && front(dq) <= i - k)
            popFront(dq);
        // maintain decreasing order
        while (!isEmpty(dq) && nums[back(dq)] < nums[i])
            popBack(dq);
        pushBack(dq, i);
        if (i >= k - 1)
            printf("%d ", nums[front(dq)]);
    }
    printf("\n");
    freeDeque(dq);
}

int main() {
    int n, k;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter k: ");
    scanf("%d", &k);

    printf("Window maxima: ");
    maxSlidingWindow(arr, n, k);
    return 0;
}
