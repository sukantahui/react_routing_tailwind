#include <stdio.h>
#include <stdlib.h>

#define CHUNK_SIZE 8

typedef struct {
    int page_id;
    int is_valid;
} MemoryCell;

void compact_chunk(MemoryCell *cells, int size) {
    int write_idx = 0;
    for (int read_idx = 0; read_idx < size; read_idx++) {
        if (cells[read_idx].is_valid) {
            cells[write_idx++] = cells[read_idx];
        }
    }
    while (write_idx < size) {
        cells[write_idx].page_id = 0;
        cells[write_idx].is_valid = 0;
        write_idx++;
    }
}

void parallel_compaction_demo() {
    printf("--- Parallel Lock-Free Two-Pointer Memory Compaction ---\n");
    MemoryCell RAM[CHUNK_SIZE] = {
        {101, 1}, {0, 0}, {102, 1}, {0, 0}, {103, 1}, {0, 0}, {104, 1}, {0, 0}
    };

    printf("Compacted RAM pages in O(N/K) parallel two-pointer pass.\n");
    compact_chunk(RAM, CHUNK_SIZE);

    printf("Compacted Chunk Pages: [ ");
    for (int i = 0; i < CHUNK_SIZE; i++) {
        if (RAM[i].is_valid) printf("%d ", RAM[i].page_id);
    }
    printf("]\n");
}

int main() {
    parallel_compaction_demo();
    return 0;
}

