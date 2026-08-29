#include <stdio.h>
#include <stdlib.h>

typedef struct BitTrieNode {
    struct BitTrieNode *left;  // 0
    struct BitTrieNode *right; // 1
} BitTrieNode;

BitTrieNode* create_bit_node() {
    BitTrieNode *n = (BitTrieNode*)malloc(sizeof(BitTrieNode));
    n->left = NULL; n->right = NULL;
    return n;
}

void insert_bit(BitTrieNode *root, int num) {
    BitTrieNode *curr = root;
    for (int i = 31; i >= 0; i--) {
        int bit = (num >> i) & 1;
        if (bit == 0) {
            if (!curr->left) curr->left = create_bit_node();
            curr = curr->left;
        } else {
            if (!curr->right) curr->right = create_bit_node();
            curr = curr->right;
        }
    }
}

int find_max_xor(BitTrieNode *root, int num) {
    BitTrieNode *curr = root;
    int max_xor = 0;
    for (int i = 31; i >= 0; i--) {
        int bit = (num >> i) & 1;
        if (bit == 0) {
            if (curr->right) { max_xor |= (1 << i); curr = curr->right; }
            else curr = curr->left;
        } else {
            if (curr->left) { max_xor |= (1 << i); curr = curr->left; }
            else curr = curr->right;
        }
    }
    return max_xor;
}

int main() {
    BitTrieNode *root = create_bit_node();
    int nums[] = {3, 10, 5, 25, 2, 8};
    int n = 6;
    for (int i = 0; i < n; i++) insert_bit(root, nums[i]);

    int max_val = 0;
    for (int i = 0; i < n; i++) {
        int xor_val = find_max_xor(root, nums[i]);
        if (xor_val > max_val) max_val = xor_val;
    }

    printf("--- Maximum XOR of Two Numbers (Binary Bitwise Trie) ---\n");
    printf("Maximum Pairwise XOR = %d\n", max_val);
    return 0;
}
