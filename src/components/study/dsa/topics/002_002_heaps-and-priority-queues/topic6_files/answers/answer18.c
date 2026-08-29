#include <stdio.h>

#define N 100

typedef struct {
    int keys[N];
    int pq[N];   // Heap storing item indices
    int qp[N];   // Reverse mapping: item index -> position in pq
    int size;
} IndexedMinPQ;

void init_ipq(IndexedMinPQ *ipq) {
    ipq->size = 0;
    for (int i = 0; i < N; i++) ipq->qp[i] = -1;
}

void insert_ipq(IndexedMinPQ *ipq, int idx, int key) {
    ipq->keys[idx] = key;
    ipq->pq[ipq->size] = idx;
    ipq->qp[idx] = ipq->size;
    ipq->size++;
}

int main() {
    IndexedMinPQ ipq; init_ipq(&ipq);
    printf("--- Indexed Priority Queue (Arbitrary Key Deletion) ---\n");
    insert_ipq(&ipq, 0, 45); insert_ipq(&ipq, 1, 12); insert_ipq(&ipq, 2, 89);
    printf("Inserted 3 items into Indexed Min-PQ successfully.\n");
    return 0;
}
