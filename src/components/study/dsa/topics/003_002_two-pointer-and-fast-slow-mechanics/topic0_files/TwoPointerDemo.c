/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Two-Pointer Paradigm & Fast-Slow Pointer Mechanics
 * File: TwoPointerDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Definition for Singly-Linked List Node
typedef struct Node {
    int data;
    struct Node* next;
} Node;

// Utility to create a new linked list node
Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (!newNode) {
        fprintf(stderr, "Memory allocation failure!\n");
        exit(EXIT_FAILURE);
    }
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

// 1. Opposite-End Converging Pointers: Container With Most Water in O(n)
int maxWaterArea(const int height[], int n) {
    int left = 0;
    int right = n - 1;
    int maxArea = 0;

    while (left < right) {
        int width = right - left;
        int minHeight = height[left] < height[right] ? height[left] : height[right];
        int currentArea = width * minHeight;

        if (currentArea > maxArea) {
            maxArea = currentArea;
        }

        // Greedy Decision: Shrink the shorter boundary to search for taller bars
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxArea;
}

// 2. Dutch National Flag 3-Way Partitioning (Sort 0s, 1s, and 2s in O(n))
void sortColors(int arr[], int n) {
    int low = 0;
    int mid = 0;
    int high = n - 1;

    while (mid <= high) {
        if (arr[mid] == 0) {
            // Swap arr[low] and arr[mid]
            int temp = arr[low];
            arr[low] = arr[mid];
            arr[mid] = temp;
            low++;
            mid++;
        } else if (arr[mid] == 1) {
            mid++;
        } else { // arr[mid] == 2
            // Swap arr[mid] and arr[high]
            int temp = arr[mid];
            arr[mid] = arr[high];
            arr[high] = temp;
            high--;
            // Do not increment mid here; re-evaluate swapped element
        }
    }
}

// 3. Fast & Slow Pointer Mechanics: Middle Node & Cycle Detection
Node* findMiddleNode(Node* head) {
    if (!head) return NULL;
    Node* slow = head;
    Node* fast = head;

    // Fast moves 2 steps, Slow moves 1 step
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow; // Points directly to the middle node
}

// Floyd's Cycle Detection
bool hasCycle(Node* head) {
    if (!head) return false;
    Node* slow = head;
    Node* fast = head;

    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            return true; // Pointers collided, cycle exists
        }
    }
    return false;
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - TWO-POINTER & FAST-SLOW POINTER DEMO      \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    // 1. Container with Most Water
    int heights[] = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    int nHeights = sizeof(heights) / sizeof(heights[0]);
    int maxWater = maxWaterArea(heights, nHeights);
    printf("1. Container With Most Water:\n");
    printf("   Heights: {1, 8, 6, 2, 5, 4, 8, 3, 7}\n");
    printf("   -> Maximum Water Trapped: %d units (O(n) time, O(1) space)\n\n", maxWater);

    // 2. Dutch National Flag 3-Way Sort
    int colors[] = {2, 0, 2, 1, 1, 0, 2, 1, 0};
    int nColors = sizeof(colors) / sizeof(colors[0]);
    printf("2. Dutch National Flag 3-Way Partitioning:\n");
    printf("   Before Sort: ");
    for (int i = 0; i < nColors; i++) printf("%d ", colors[i]);
    printf("\n");

    sortColors(colors, nColors);

    printf("   After Sort:  ");
    for (int i = 0; i < nColors; i++) printf("%d ", colors[i]);
    printf("\n\n");

    // 3. Linked List Fast & Slow Pointers
    Node* head = createNode(10);
    head->next = createNode(20);
    head->next->next = createNode(30);
    head->next->next->next = createNode(40);
    head->next->next->next->next = createNode(50);

    Node* midNode = findMiddleNode(head);
    printf("3. Fast & Slow Pointers in Linked List:\n");
    printf("   List: 10 -> 20 -> 30 -> 40 -> 50\n");
    printf("   -> Middle Node Value: %d\n", midNode ? midNode->data : -1);

    // Memory Cleanup
    Node* curr = head;
    while (curr != NULL) {
        Node* temp = curr;
        curr = curr->next;
        free(temp);
    }

    return 0;
}
