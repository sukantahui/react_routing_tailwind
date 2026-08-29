#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define ALPHABET_SIZE 26

typedef struct TrieNode {
    struct TrieNode *children[ALPHABET_SIZE];
    bool is_end_of_word;
} TrieNode;

TrieNode* create_trie_node() {
    TrieNode *n = (TrieNode*)malloc(sizeof(TrieNode));
    n->is_end_of_word = false;
    for (int i = 0; i < ALPHABET_SIZE; i++) n->children[i] = NULL;
    return n;
}

void insert_trie(TrieNode *root, const char *word) {
    TrieNode *curr = root;
    for (int i = 0; word[i] != '\0'; i++) {
        int idx = word[i] - 'a';
        if (!curr->children[idx]) curr->children[idx] = create_trie_node();
        curr = curr->children[idx];
    }
    curr->is_end_of_word = true;
}

int main() {
    TrieNode *root = create_trie_node();
    printf("--- Trie Node Creation & Fundamental Insertion ---\n");
    insert_trie(root, "apple"); insert_trie(root, "app");
    printf("Inserted 'apple' and 'app' into Trie successfully!\n");
    return 0;
}
