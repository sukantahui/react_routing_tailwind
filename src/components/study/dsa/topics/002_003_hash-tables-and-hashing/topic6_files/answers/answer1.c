#include <stdio.h>
#include <stdbool.h>

#define MAX_KEY 1000

typedef struct {
    bool present[MAX_KEY];
    int value[MAX_KEY];
} DirectAddressTable;

void init_dat(DirectAddressTable *dat) {
    for (int i = 0; i < MAX_KEY; i++) dat->present[i] = false;
}

void dat_insert(DirectAddressTable *dat, int key, int val) {
    dat->value[key] = val;
    dat->present[key] = true;
}

int main() {
    DirectAddressTable dat; init_dat(&dat);
    printf("--- Direct Address Table (DAT) Engine ---\n");
    dat_insert(&dat, 42, 999);
    if (dat.present[42]) printf("Key 42 found! Value = %d\n", dat.value[42]);
    return 0;
}
