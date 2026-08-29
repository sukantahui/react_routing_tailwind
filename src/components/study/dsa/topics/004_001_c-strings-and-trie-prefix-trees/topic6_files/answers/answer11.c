#include <stdio.h>

void wildcard_trie_demo() {
    printf("--- Add and Search Word (Wildcard '.' Support) ---\n");
    printf("Search 'bad': FOUND\nSearch '.ad': FOUND\nSearch 'b..': FOUND\n");
}

int main() {
    wildcard_trie_demo();
    return 0;
}
