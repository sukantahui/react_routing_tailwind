#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    char ch;
    int freq;
    struct Node *left, *right;
} Node;

typedef struct {
    int size;
    Node* array[20];
} MinHeap;

Node* createNode(char ch, int freq) {
    Node* n = (Node*)malloc(sizeof(Node));
    n->ch = ch; n->freq = freq;
    n->left = n->right = NULL;
    return n;
}

void swap(Node** a, Node** b) { Node* t = *a; *a = *b; *b = t; }

void minHeapify(MinHeap* h, int i) {
    int smallest = i, l = 2*i + 1, r = 2*i + 2;
    if (l < h->size && h->array[l]->freq < h->array[smallest]->freq) smallest = l;
    if (r < h->size && h->array[r]->freq < h->array[smallest]->freq) smallest = r;
    if (smallest != i) { swap(&h->array[i], &h->array[smallest]); minHeapify(h, smallest); }
}

Node* extractMin(MinHeap* h) {
    Node* min = h->array[0];
    h->array[0] = h->array[--h->size];
    minHeapify(h, 0);
    return min;
}

void insertMin(MinHeap* h, Node* n) {
    int i = h->size++;
    h->array[i] = n;
    while (i && h->array[(i-1)/2]->freq > h->array[i]->freq) {
        swap(&h->array[(i-1)/2], &h->array[i]);
        i = (i-1)/2;
    }
}

void printCodes(Node* root, int code[], int top) {
    if (root->left) { code[top] = 0; printCodes(root->left, code, top + 1); }
    if (root->right) { code[top] = 1; printCodes(root->right, code, top + 1); }
    if (!root->left && !root->right) {
        printf("Symbol '%c' (Freq: %2d) => Huffman Code: ", root->ch, root->freq);
        for (int i = 0; i < top; i++) printf("%d", code[i]);
        printf("\n");
    }
}

int main() {
    printf("=== Huffman Data Compression Binary Code Generator in C ===\n\n");
    char chars[] = {'A', 'B', 'C', 'D'};
    int freqs[] = {5, 1, 6, 3};
    int n = 4;

    MinHeap h = {.size = 0};
    for (int i = 0; i < n; i++) insertMin(&h, createNode(chars[i], freqs[i]));

    while (h.size > 1) {
        Node *l = extractMin(&h);
        Node *r = extractMin(&h);
        Node *parent = createNode('$', l->freq + r->freq);
        parent->left = l; parent->right = r;
        insertMin(&h, parent);
    }

    int code[10];
    printCodes(h.array[0], code, 0);
    return 0;
}
