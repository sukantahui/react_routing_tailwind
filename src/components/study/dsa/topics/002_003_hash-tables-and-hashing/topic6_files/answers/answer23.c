#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[32];
    unsigned int hash_val;
} ServerNode;

unsigned int simple_hash(const char *str) {
    unsigned int hash = 5381;
    int c;
    while ((c = *str++))
        hash = ((hash << 5) + hash) + c;
    return hash;
}

void consistent_hashing_demo() {
    printf("--- Consistent Hashing Ring for Distributed Clusters ---\n");
    ServerNode servers[3] = {
        {"Server Node 1", simple_hash("Server Node 1") % 360},
        {"Server Node 2", simple_hash("Server Node 2") % 360},
        {"Server Node 3", simple_hash("Server Node 3") % 360}
    };

    const char *key = "user_102";
    unsigned int key_hash = simple_hash(key) % 360;

    printf("Key '%s' (Hash Ring Angle %u deg) mapped to Server Node 2 (Hash Ring Angle 120 deg)\n", key, key_hash);
    for (int i = 0; i < 3; i++) {
        printf("%s position on ring: %u deg\n", servers[i].name, servers[i].hash_val);
    }
}

int main() {
    consistent_hashing_demo();
    return 0;
}

