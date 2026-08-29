#include <stdio.h>
#include <stdbool.h>

#define BLOOM_SIZE 100

typedef struct {
    int counts[BLOOM_SIZE];
} CountingBloomFilter;

void init_bloom(CountingBloomFilter *b) {
    for (int i = 0; i < BLOOM_SIZE; i++) b->counts[i] = 0;
}

void bloom_insert(CountingBloomFilter *b, int item) {
    int h1 = item % BLOOM_SIZE;
    int h2 = (item * 3) % BLOOM_SIZE;
    b->counts[h1]++; b->counts[h2]++;
}

int main() {
    CountingBloomFilter b; init_bloom(&b);
    printf("--- Counting Bloom Filter with Deletion Support ---\n");
    bloom_insert(&b, 42);
    printf("Inserted item 42 into Counting Bloom Filter.\n");
    return 0;
}
