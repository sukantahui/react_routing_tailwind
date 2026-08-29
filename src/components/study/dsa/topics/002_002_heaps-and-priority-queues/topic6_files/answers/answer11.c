#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int val, freq;
} ElementFreq;

void swap(ElementFreq *a, ElementFreq *b) { ElementFreq temp = *a; *a = *b; *b = temp; }

void heapify_min_freq(ElementFreq h[], int k, int i) {
    int smallest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < k && h[l].freq < h[smallest].freq) smallest = l;
    if (r < k && h[r].freq < h[smallest].freq) smallest = r;
    if (smallest != i) { swap(&h[i], &h[smallest]); heapify_min_freq(h, k, smallest); }
}

int main() {
    ElementFreq freqs[] = {{1, 3}, {2, 2}, {3, 1}, {4, 4}};
    int n = 4, k = 2;
    ElementFreq heap[2];
    for (int i = 0; i < k; i++) heap[i] = freqs[i];
    for (int i = k / 2 - 1; i >= 0; i--) heapify_min_freq(heap, k, i);

    for (int i = k; i < n; i++) {
        if (freqs[i].freq > heap[0].freq) {
            heap[0] = freqs[i];
            heapify_min_freq(heap, k, 0);
        }
    }

    printf("--- Top K Frequent Elements (K=2) ---\n");
    for (int i = 0; i < k; i++) printf("Element %d (Freq %d)\n", heap[i].val, heap[i].freq);
    return 0;
}
