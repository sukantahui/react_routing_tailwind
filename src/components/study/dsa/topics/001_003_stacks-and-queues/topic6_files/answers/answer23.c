#include <stdio.h>
#include <stdbool.h>

#define RING_SIZE 4

typedef struct {
    int buffer[RING_SIZE];
    volatile int head;
    volatile int tail;
} RingBuffer;

void init_ring(RingBuffer *r) { r->head = 0; r->tail = 0; }

bool ring_push(RingBuffer *r, int val) {
    int next = (r->head + 1) % RING_SIZE;
    if (next == r->tail) return false; // Buffer Full
    r->buffer[r->head] = val;
    r->head = next;
    return true;
}

bool ring_pop(RingBuffer *r, int *val) {
    if (r->head == r->tail) return false; // Buffer Empty
    *val = r->buffer[r->tail];
    r->tail = (r->tail + 1) % RING_SIZE;
    return true;
}

int main() {
    RingBuffer ring; init_ring(&ring);
    printf("--- Lock-Free Circular Ring Buffer ---\n");
    ring_push(&ring, 100); ring_push(&ring, 200);
    int val;
    if (ring_pop(&ring, &val)) printf("Popped from Ring: %d\n", val);
    return 0;
}
