/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: C String Mechanics & Trie (Prefix Tree) Data Structure
 * File: TrieDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

#define ALPHABET_SIZE 26

// Trie Node Struct Definition
typedef struct TrieNode {
    struct TrieNode* children[ALPHABET_SIZE];
    bool isEndOfWord;
} TrieNode;

// Create a new initialized Trie node
TrieNode* createTrieNode(void) {
    TrieNode* node = (TrieNode*)malloc(sizeof(TrieNode));
    if (!node) {
        fprintf(stderr, "Memory allocation failed for Trie node!\n");
        exit(EXIT_FAILURE);
    }
    node->isEndOfWord = false;
    for (int i = 0; i < ALPHABET_SIZE; i++) {
        node->children[i] = NULL;
    }
    return node;
}

// Insert a word into the Trie
void insertTrie(TrieNode* root, const char* key) {
    TrieNode* crawler = root;
    int len = (int)strlen(key);

    for (int level = 0; level < len; level++) {
        // Convert character to 0-25 alphabet index
        int index = key[level] - 'a';
        if (index < 0 || index >= ALPHABET_SIZE) continue;

        if (crawler->children[index] == NULL) {
            crawler->children[index] = createTrieNode();
        }
        crawler = crawler->children[index];
    }
    crawler->isEndOfWord = true;
}

// Search for an exact word in the Trie
bool searchTrie(TrieNode* root, const char* key) {
    TrieNode* crawler = root;
    int len = (int)strlen(key);

    for (int level = 0; level < len; level++) {
        int index = key[level] - 'a';
        if (index < 0 || index >= ALPHABET_SIZE) return false;

        if (crawler->children[index] == NULL) {
            return false; // Path does not exist
        }
        crawler = crawler->children[index];
    }
    return (crawler != NULL && crawler->isEndOfWord);
}

// Check if any word starts with the given prefix
bool startsWithPrefix(TrieNode* root, const char* prefix) {
    TrieNode* crawler = root;
    int len = (int)strlen(prefix);

    for (int level = 0; level < len; level++) {
        int index = prefix[level] - 'a';
        if (index < 0 || index >= ALPHABET_SIZE) return false;

        if (crawler->children[index] == NULL) {
            return false;
        }
        crawler = crawler->children[index];
    }
    return true; // Prefix path exists
}

// Recursive function to print all words stored under a subtree
void printSuggestionsRec(TrieNode* root, char* prefixBuffer, int depth) {
    if (root->isEndOfWord) {
        prefixBuffer[depth] = '\0';
        printf("     • %s\n", prefixBuffer);
    }

    for (int i = 0; i < ALPHABET_SIZE; i++) {
        if (root->children[i] != NULL) {
            prefixBuffer[depth] = (char)('a' + i);
            printSuggestionsRec(root->children[i], prefixBuffer, depth + 1);
        }
    }
}

// Autocomplete suggestions for a prefix
void autocomplete(TrieNode* root, const char* prefix) {
    TrieNode* crawler = root;
    int len = (int)strlen(prefix);
    char buffer[100];

    for (int level = 0; level < len; level++) {
        int index = prefix[level] - 'a';
        if (crawler->children[index] == NULL) {
            printf("   No suggestions found for prefix \"%s\"\n", prefix);
            return;
        }
        buffer[level] = prefix[level];
        crawler = crawler->children[index];
    }

    printf("   Autocomplete Suggestions for \"%s\":\n", prefix);
    printSuggestionsRec(crawler, buffer, len);
}

// Recursive memory cleanup (Post-Order Traversal)
void freeTrie(TrieNode* root) {
    if (!root) return;
    for (int i = 0; i < ALPHABET_SIZE; i++) {
        if (root->children[i]) {
            freeTrie(root->children[i]);
        }
    }
    free(root);
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - TRIE PREFIX TREE & AUTOCOMPLETE DEMO      \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    TrieNode* root = createTrieNode();

    // Insert vocabulary words into the Trie
    const char* words[] = {
        "barrackpore", "binary", "bin", "bind", "binding", 
        "bitwise", "bubble", "bucket", "buffer", "tree", "trie"
    };
    int numWords = sizeof(words) / sizeof(words[0]);

    printf("1. Inserting %d words into Trie...\n", numWords);
    for (int i = 0; i < numWords; i++) {
        insertTrie(root, words[i]);
    }
    printf("   ✓ Trie successfully built in physical RAM.\n\n");

    // Search operations
    printf("2. Testing Search Queries:\n");
    const char* queries[] = {"binary", "bind", "bin", "bank", "trie", "algorithm"};
    for (int i = 0; i < 6; i++) {
        bool found = searchTrie(root, queries[i]);
        printf("   • search(\"%s\") -> %s\n", queries[i], found ? "FOUND ✓" : "NOT FOUND ✗");
    }
    printf("\n");

    // Prefix checking and Autocomplete
    printf("3. Testing Autocomplete Suggestions:\n");
    autocomplete(root, "bi");
    printf("\n");
    autocomplete(root, "bu");
    printf("\n");

    // Safe Memory Teardown
    printf("4. Freeing all Trie memory via Post-Order Traversal...\n");
    freeTrie(root);
    printf("   ✓ All allocated node chunks freed. Zero memory leaks.\n");

    return 0;
}
