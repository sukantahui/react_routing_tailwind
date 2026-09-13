#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define DB_FILE "inventory.dat"
#define NAME_LEN 40

/* Item Structure representing an inventory record */
typedef struct {
    int id;
    char name[NAME_LEN];
    int quantity;
    double price;
} Item;

/* Helper to print an item */
void printItem(const Item *item, long recordNum, long byteOffset) {
    printf("Record #%-2ld (Offset %4ld bytes) -> ID: %-4d | %-20s | Qty: %-4d | Price: $%-7.2f\n",
           recordNum, byteOffset, item->id, item->name, item->quantity, item->price);
}

int main(void) {
    printf("=====================================================\n");
    printf("  C Random Access File Positioning: fseek, ftell, rewind\n");
    printf("=====================================================\n\n");

    /* Initial dataset of 5 items */
    Item stock[] = {
        {1001, "Mechanical Keyboard", 45, 89.99},
        {1002, "Wireless Mouse",      120, 29.50},
        {1003, "4K UHD Monitor",      18, 349.00},
        {1004, "USB-C Hub Multiport", 85, 45.00},
        {1005, "Noise-Canceling Headset", 32, 129.95}
    };
    int totalRecords = sizeof(stock) / sizeof(stock[0]);

    /* Step 1: Initialize database file with binary write */
    FILE *fp = fopen(DB_FILE, "wb+");
    if (fp == NULL) {
        perror("Error creating database file");
        return EXIT_FAILURE;
    }

    fwrite(stock, sizeof(Item), totalRecords, fp);
    printf(">>> Initialized '%s' with %d records. Total File Size: %ld bytes.\n\n",
           DB_FILE, totalRecords, ftell(fp));

    /* Step 2: Randomly read Record #3 (0-indexed index 2: 4K UHD Monitor) using SEEK_SET */
    int targetIndex = 2;
    long byteOffset = (long)(targetIndex * sizeof(Item));
    fseek(fp, byteOffset, SEEK_SET);

    Item retrieved;
    fread(&retrieved, sizeof(Item), 1, fp);
    printf(">>> Jumped via SEEK_SET to byte %ld:\n", byteOffset);
    printItem(&retrieved, targetIndex, byteOffset);

    /* Step 3: Relative seek forward using SEEK_CUR */
    /* Current position is now at index 3 (after reading index 2).
       Let's jump +1 record forward to index 4 (last record). */
    fseek(fp, 0 * (long)sizeof(Item), SEEK_CUR); /* stays at index 3 */
    fseek(fp, 1 * (long)sizeof(Item), SEEK_CUR); /* skips index 3 to index 4 */
    long curPos = ftell(fp);
    fread(&retrieved, sizeof(Item), 1, fp);
    printf("\n>>> Jumped +1 record forward via SEEK_CUR (offset %ld):\n", curPos);
    printItem(&retrieved, 4, curPos);

    /* Step 4: Seek from End using SEEK_END to read the last record directly */
    fseek(fp, -(long)sizeof(Item), SEEK_END);
    long endPos = ftell(fp);
    fread(&retrieved, sizeof(Item), 1, fp);
    printf("\n>>> Jumped -sizeof(Item) from SEEK_END (offset %ld):\n", endPos);
    printItem(&retrieved, totalRecords - 1, endPos);

    /* Step 5: In-place update of Record #2 (Wireless Mouse: ID 1002) */
    int updateIndex = 1;
    long updateOffset = (long)(updateIndex * sizeof(Item));
    fseek(fp, updateOffset, SEEK_SET);
    fread(&retrieved, sizeof(Item), 1, fp);

    printf("\n>>> Updating Record #%d in-place:\n", updateIndex);
    printf("    Before update -> Qty: %d, Price: $%.2f\n", retrieved.quantity, retrieved.price);

    /* Modify in RAM */
    retrieved.quantity += 50;   /* received fresh shipment */
    retrieved.price = 24.99;    /* promotional discount */

    /* Move file pointer back to record position to overwrite */
    fseek(fp, updateOffset, SEEK_SET);
    fwrite(&retrieved, sizeof(Item), 1, fp);
    fflush(fp);

    /* Step 6: Rewind and display entire updated file */
    printf("\n-----------------------------------------------------\n");
    printf(">>> Rewinding file with rewind() and displaying full database:\n\n");
    rewind(fp);

    long recCount = 0;
    while (fread(&retrieved, sizeof(Item), 1, fp) == 1) {
        printItem(&retrieved, recCount, (long)(recCount * sizeof(Item)));
        recCount++;
    }

    fclose(fp);
    printf("\n=== Random Access Operations Completed Successfully ===\n");
    return EXIT_SUCCESS;
}
