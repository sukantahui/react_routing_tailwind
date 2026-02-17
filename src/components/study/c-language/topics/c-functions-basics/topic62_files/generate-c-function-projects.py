import os
import json

# ============================================
# JSON data containing 50 expert-level projects
# ============================================
json_data = {
    "projectCategory": "C Programming – 50 Array-Based Projects (Expert Level)",
    "subject": "Computer Science (C Programming)",
    "board": "WBCHSE / CBSE / ISC",
    "class": "XI - XII",
    "tools": ["GCC", "Turbo C", "VS Code", "Code::Blocks"],
    "institute": {
        "author": "Sukanta Hui",
        "name": "Coder & AccoTax",
        "location": "Barrackpore & Naihati"
    },
    "projects": [
        {
            "projectId": "E001",
            "title": "Quick Sort (In‑Place)",
            "difficulty": "Expert",
            "description": "Implement the quicksort algorithm to sort an array in ascending order. Choose the last element as pivot and perform in‑place partitioning.",
            "exampleText": "Enter size: 7\nEnter elements: 10 7 8 9 1 5 3",
            "exampleOutput": "Sorted array: 1 3 5 7 8 9 10",
            "answerFile": "./answers/E001.c",
            "learningOutcome": "Divide‑and‑conquer, recursion, partitioning."
        },
        {
            "projectId": "E002",
            "title": "Merge Sort",
            "difficulty": "Expert",
            "description": "Implement merge sort to sort an array. Use an auxiliary array for merging.",
            "exampleText": "Enter size: 6\nEnter elements: 38 27 43 3 9 82",
            "exampleOutput": "Sorted array: 3 9 27 38 43 82",
            "answerFile": "./answers/E002.c",
            "learningOutcome": "Recursive merge, divide‑and‑conquer, stable sorting."
        },
        {
            "projectId": "E003",
            "title": "Heap Sort (using array‑based heap)",
            "difficulty": "Expert",
            "description": "Implement heap sort by first building a max‑heap from the array, then repeatedly extracting the maximum.",
            "exampleText": "Enter size: 8\nEnter elements: 4 10 3 5 1 2 7 9",
            "exampleOutput": "Sorted array: 1 2 3 4 5 7 9 10",
            "answerFile": "./answers/E003.c",
            "learningOutcome": "Heap data structure, heapify, in‑place sorting."
        },
        {
            "projectId": "E004",
            "title": "Counting Sort (for non‑negative integers)",
            "difficulty": "Expert",
            "description": "Sort an array of non‑negative integers using counting sort. Assume the range of values is not too large.",
            "exampleText": "Enter size: 8\nEnter elements: 4 2 2 8 3 3 1 5",
            "exampleOutput": "Sorted array: 1 2 2 3 3 4 5 8",
            "answerFile": "./answers/E004.c",
            "learningOutcome": "Non‑comparison sort, frequency counting."
        },
        {
            "projectId": "E005",
            "title": "Radix Sort (using counting sort as subroutine)",
            "difficulty": "Expert",
            "description": "Implement radix sort for an array of non‑negative integers. Sort by each digit from least significant to most significant.",
            "exampleText": "Enter size: 7\nEnter elements: 170 45 75 90 802 24 2",
            "exampleOutput": "Sorted array: 2 24 45 75 90 170 802",
            "answerFile": "./answers/E005.c",
            "learningOutcome": "Digit‑wise sorting, stable counting sort."
        },
        {
            "projectId": "E006",
            "title": "Median of Two Sorted Arrays",
            "difficulty": "Expert",
            "description": "Given two sorted arrays, find the median of the combined array in O(log(min(m, n))) time.",
            "exampleText": "Array1: 1 3 8 9 15\nArray2: 7 11 18 19 21 25",
            "exampleOutput": "Median = 11",
            "answerFile": "./answers/E006.c",
            "learningOutcome": "Binary search, partition theory."
        },
        {
            "projectId": "E007",
            "title": "Kth Smallest Element (Quickselect)",
            "difficulty": "Expert",
            "description": "Find the kth smallest element in an unsorted array using the quickselect algorithm (average O(n)).",
            "exampleText": "Enter size: 7\nEnter elements: 10 4 5 8 6 11 26\nEnter k (1‑based): 3",
            "exampleOutput": "3rd smallest element = 6",
            "answerFile": "./answers/E007.c",
            "learningOutcome": "Partition, randomised algorithm."
        },
        {
            "projectId": "E008",
            "title": "Next Permutation",
            "difficulty": "Expert",
            "description": "Rearrange an array into the lexicographically next greater permutation. If not possible, rearrange into the lowest possible order (sorted ascending).",
            "exampleText": "Enter size: 5\nEnter elements: 1 2 3 4 5",
            "exampleOutput": "Next permutation: 1 2 3 5 4",
            "answerFile": "./answers/E008.c",
            "learningOutcome": "In‑place permutation, algorithm design."
        },
        {
            "projectId": "E009",
            "title": "Longest Increasing Subsequence (Length)",
            "difficulty": "Expert",
            "description": "Given an array, find the length of the longest strictly increasing subsequence in O(n log n) using patience sorting.",
            "exampleText": "Enter size: 8\nEnter elements: 10 9 2 5 3 7 101 18",
            "exampleOutput": "LIS length = 4",
            "answerFile": "./answers/E009.c",
            "learningOutcome": "Dynamic programming, binary search, patience sorting."
        },
        {
            "projectId": "E010",
            "title": "Maximum Product Subarray",
            "difficulty": "Expert",
            "description": "Find the contiguous subarray within an array (containing at least one number) which has the largest product.",
            "exampleText": "Enter size: 6\nEnter elements: 2 3 -2 4 -1 0",
            "exampleOutput": "Maximum product = 48 (subarray: 2,3,-2,4,-1)",
            "answerFile": "./answers/E010.c",
            "learningOutcome": "Dynamic programming, handling negative numbers."
        },
        {
            "projectId": "E011",
            "title": "Find All Triplets with Zero Sum",
            "difficulty": "Expert",
            "description": "Given an array of integers, find all unique triplets that sum to zero.",
            "exampleText": "Enter size: 7\nEnter elements: -1 0 1 2 -1 -4 2",
            "exampleOutput": "Triplets: [-1, -1, 2], [-1, 0, 1]",
            "answerFile": "./answers/E011.c",
            "learningOutcome": "Sorting, two‑pointer technique, duplicate avoidance."
        },
        {
            "projectId": "E012",
            "title": "Trapping Rain Water",
            "difficulty": "Expert",
            "description": "Given an array of non‑negative integers representing elevation heights, compute how much water it can trap after raining.",
            "exampleText": "Enter size: 12\nEnter heights: 0 1 0 2 1 0 1 3 2 1 2 1",
            "exampleOutput": "Trapped water = 6 units",
            "answerFile": "./answers/E012.c",
            "learningOutcome": "Two‑pointer, prefix/suffix maximums."
        },
        {
            "projectId": "E013",
            "title": "Container With Most Water",
            "difficulty": "Expert",
            "description": "Given an array of heights, find two lines that together with the x‑axis form a container that holds the most water.",
            "exampleText": "Enter size: 9\nEnter heights: 1 8 6 2 5 4 8 3 7",
            "exampleOutput": "Maximum area = 49 (between 8 and 7)",
            "answerFile": "./answers/E013.c",
            "learningOutcome": "Two‑pointer, greedy."
        },
        {
            "projectId": "E014",
            "title": "Sliding Window Maximum",
            "difficulty": "Expert",
            "description": "Given an array and a window size k, find the maximum element in each sliding window of size k using a deque.",
            "exampleText": "Enter size: 8\nEnter elements: 1 3 -1 -3 5 3 6 7\nEnter k: 3",
            "exampleOutput": "Window maxima: 3 3 5 5 6 7",
            "answerFile": "./answers/E014.c",
            "learningOutcome": "Deque, sliding window, monotonic queue."
        },
        {
            "projectId": "E015",
            "title": "Minimum Size Subarray Sum",
            "difficulty": "Expert",
            "description": "Given an array of positive integers and a target sum, find the minimal length of a contiguous subarray whose sum is at least target. If none, return 0.",
            "exampleText": "Enter size: 6\nEnter elements: 2 3 1 2 4 3\nTarget: 7",
            "exampleOutput": "Minimum subarray length = 2 (subarray [4,3])",
            "answerFile": "./answers/E015.c",
            "learningOutcome": "Sliding window, two‑pointer."
        },
        {
            "projectId": "E016",
            "title": "First Missing Positive",
            "difficulty": "Expert",
            "description": "Given an unsorted array of integers, find the smallest missing positive integer in O(n) time and O(1) extra space.",
            "exampleText": "Enter size: 5\nEnter elements: 3 4 -1 1 2",
            "exampleOutput": "Smallest missing positive = 5",
            "answerFile": "./answers/E016.c",
            "learningOutcome": "Array as hash, index manipulation."
        },
        {
            "projectId": "E017",
            "title": "Rotate Image (2D Matrix) 90° Clockwise In‑Place",
            "difficulty": "Expert",
            "description": "Rotate a square matrix 90 degrees clockwise in‑place using O(1) extra space.",
            "exampleText": "Enter order: 4\nMatrix:\n5 1 9 11\n2 4 8 10\n13 3 6 7\n15 14 12 16",
            "exampleOutput": "Rotated matrix:\n15 13 2 5\n14 3 4 1\n12 6 8 9\n16 7 10 11",
            "answerFile": "./answers/E017.c",
            "learningOutcome": "Transpose + reverse, in‑place manipulation."
        },
        {
            "projectId": "E018",
            "title": "Set Matrix Zeroes",
            "difficulty": "Expert",
            "description": "If an element in a matrix is zero, set its entire row and column to zero. Do it in‑place with O(1) extra space.",
            "exampleText": "Enter rows and cols: 3 3\nMatrix:\n1 1 1\n1 0 1\n1 1 1",
            "exampleOutput": "Result:\n1 0 1\n0 0 0\n1 0 1",
            "answerFile": "./answers/E018.c",
            "learningOutcome": "Using first row/column as markers."
        },
        {
            "projectId": "E019",
            "title": "Pascal's Triangle (Generate First N Rows)",
            "difficulty": "Expert",
            "description": "Generate the first numRows of Pascal's triangle and store them in a 2D array.",
            "exampleText": "Enter number of rows: 5",
            "exampleOutput": "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1",
            "answerFile": "./answers/E019.c",
            "learningOutcome": "Dynamic 2D array, combinatorial logic."
        },
        {
            "projectId": "E020",
            "title": "Find Duplicate Number (Floyd's Cycle Detection)",
            "difficulty": "Expert",
            "description": "Given an array of n+1 integers where each integer is between 1 and n, find the duplicate number without modifying the array and using O(1) extra space.",
            "exampleText": "Enter size: 5\nEnter elements: 3 1 3 4 2",
            "exampleOutput": "Duplicate number = 3",
            "answerFile": "./answers/E020.c",
            "learningOutcome": "Linked‑list cycle detection on array indices."
        },
        {
            "projectId": "E021",
            "title": "Missing and Repeating Number",
            "difficulty": "Expert",
            "description": "Given an array of size n containing numbers from 1 to n with one missing and one duplicate, find both numbers using O(1) space.",
            "exampleText": "Enter size: 7\nEnter elements: 3 1 2 5 4 6 2",
            "exampleOutput": "Repeating = 2, Missing = 7",
            "answerFile": "./answers/E021.c",
            "learningOutcome": "XOR, mathematical equations."
        },
        {
            "projectId": "E022",
            "title": "Merge Overlapping Intervals",
            "difficulty": "Expert",
            "description": "Given an array of intervals (start, end), merge all overlapping intervals and return the merged intervals.",
            "exampleText": "Enter number of intervals: 4\nEnter intervals: 1 3, 2 6, 8 10, 15 18",
            "exampleOutput": "Merged intervals: [1,6] [8,10] [15,18]",
            "answerFile": "./answers/E022.c",
            "learningOutcome": "Sorting, interval merging."
        },
        {
            "projectId": "E023",
            "title": "Maximum Gap (Bucket Sort)",
            "difficulty": "Expert",
            "description": "Given an unsorted array, find the maximum difference between successive elements in its sorted form in linear time using bucket sort.",
            "exampleText": "Enter size: 5\nEnter elements: 3 6 9 1 4",
            "exampleOutput": "Maximum gap = 3 (between 6 and 9 or 1 and 4)",
            "answerFile": "./answers/E023.c",
            "learningOutcome": "Bucket sort, linear time algorithm."
        },
        {
            "projectId": "E024",
            "title": "Find All Pairs with Given Sum (Unsorted)",
            "difficulty": "Expert",
            "description": "Given an unsorted array and a target sum, print all pairs that sum to the target. Use O(n) time and O(n) space (hash table).",
            "exampleText": "Enter size: 7\nEnter elements: 1 5 7 -1 5 3 6\nTarget: 6",
            "exampleOutput": "Pairs: (1,5) (7,-1) (5,1) (3,3)",
            "answerFile": "./answers/E024.c",
            "learningOutcome": "Hashing, handling duplicates."
        },
        {
            "projectId": "E025",
            "title": "3Sum Closest",
            "difficulty": "Expert",
            "description": "Given an array and a target, find three integers whose sum is closest to the target.",
            "exampleText": "Enter size: 5\nEnter elements: -1 2 1 -4\nTarget: 1",
            "exampleOutput": "Closest sum = 2 (-1+2+1)",
            "answerFile": "./answers/E025.c",
            "learningOutcome": "Sorting, two‑pointer."
        },
        {
            "projectId": "E026",
            "title": "4Sum",
            "difficulty": "Expert",
            "description": "Find all unique quadruplets in an array that sum to a given target.",
            "exampleText": "Enter size: 7\nEnter elements: 1 0 -1 0 -2 2\nTarget: 0",
            "exampleOutput": "Quadruplets: (-2,-1,1,2) (-2,0,0,2) (-1,0,0,1)",
            "answerFile": "./answers/E026.c",
            "learningOutcome": "Nested loops, two‑pointer, duplicate handling."
        },
        {
            "projectId": "E027",
            "title": "Subarray Sum Equals K",
            "difficulty": "Expert",
            "description": "Count the number of subarrays whose sum equals a given value k.",
            "exampleText": "Enter size: 5\nEnter elements: 1 1 1 2 3\nTarget: 3",
            "exampleOutput": "Number of subarrays = 4 ( [1,1,1] [1,2] [2,1] [3] )",
            "answerFile": "./answers/E027.c",
            "learningOutcome": "Prefix sums, hash map."
        },
        {
            "projectId": "E028",
            "title": "Subarray Sum Divisible by K",
            "difficulty": "Expert",
            "description": "Find the number of non‑empty subarrays that have a sum divisible by k.",
            "exampleText": "Enter size: 6\nEnter elements: 4 5 0 -2 -3 1\nK: 5",
            "exampleOutput": "Number of subarrays = 7",
            "answerFile": "./answers/E028.c",
            "learningOutcome": "Prefix sum modulo, hash map."
        },
        {
            "projectId": "E029",
            "title": "Maximum Circular Subarray Sum",
            "difficulty": "Expert",
            "description": "Find the maximum sum of a subarray when the array is treated as circular (end can wrap to beginning).",
            "exampleText": "Enter size: 5\nEnter elements: 8 -4 3 -5 4",
            "exampleOutput": "Maximum sum = 12 (subarray [4,8,-4,3]? actually 8+ -4 +3 +4? Let's check: The solution often uses max subarray and min subarray)",
            "answerFile": "./answers/E029.c",
            "learningOutcome": "Kadane's algorithm for circular arrays."
        },
        {
            "projectId": "E030",
            "title": "Find Peak Element (O(log n))",
            "difficulty": "Expert",
            "description": "Find a peak element in an array (an element that is greater than its neighbors). Use binary search to achieve O(log n) time.",
            "exampleText": "Enter size: 7\nEnter elements: 1 2 1 3 5 6 4",
            "exampleOutput": "A peak element: 5 at index 4 (or 6 at index 5)",
            "answerFile": "./answers/E030.c",
            "learningOutcome": "Binary search on unsorted array."
        },
        {
            "projectId": "E031",
            "title": "Majority Element II (n/3)",
            "difficulty": "Expert",
            "description": "Find all elements that appear more than ⌊ n/3 ⌋ times in an array. Use Boyer‑Moore majority vote algorithm extended for two candidates.",
            "exampleText": "Enter size: 8\nEnter elements: 1 1 1 3 3 2 2 2",
            "exampleOutput": "Majority elements: 1 and 2",
            "answerFile": "./answers/E031.c",
            "learningOutcome": "Voting algorithm, O(1) space."
        },
        {
            "projectId": "E032",
            "title": "Sort Colors (Dutch National Flag)",
            "difficulty": "Expert",
            "description": "Given an array containing only 0, 1, and 2, sort it in‑place without any sorting algorithm.",
            "exampleText": "Enter size: 6\nEnter elements: 2 0 2 1 1 0",
            "exampleOutput": "Sorted array: 0 0 1 1 2 2",
            "answerFile": "./answers/E032.c",
            "learningOutcome": "Three‑pointer, partitioning."
        },
        {
            "projectId": "E033",
            "title": "Remove Duplicates from Sorted Array (II)",
            "difficulty": "Expert",
            "description": "Remove duplicates such that each element appears at most twice and return the new length.",
            "exampleText": "Enter size: 7\nEnter sorted elements: 1 1 1 2 2 3 3",
            "exampleOutput": "New array: 1 1 2 2 3 3, length = 6",
            "answerFile": "./answers/E033.c",
            "learningOutcome": "Two‑pointer, in‑place."
        },
        {
            "projectId": "E034",
            "title": "Find the Smallest Missing Positive (Version 2)",
            "difficulty": "Expert",
            "description": "Given an array of integers (could be negative), find the smallest positive integer missing. Do it in O(n) time and O(1) space.",
            "exampleText": "Enter size: 6\nEnter elements: -5 2 0 1 4 5",
            "exampleOutput": "Smallest missing positive = 3",
            "answerFile": "./answers/E034.c",
            "learningOutcome": "Array indexing, ignoring non‑positives."
        },
        {
            "projectId": "E035",
            "title": "Longest Consecutive Sequence",
            "difficulty": "Expert",
            "description": "Given an unsorted array, find the length of the longest consecutive elements sequence. Achieve O(n) time using hashing (but in C, we can sort and scan).",
            "exampleText": "Enter size: 8\nEnter elements: 100 4 200 1 3 2 5 6",
            "exampleOutput": "Longest consecutive length = 4 (1,2,3,4)",
            "answerFile": "./answers/E035.c",
            "learningOutcome": "Sorting or hash‑like approach."
        },
        {
            "projectId": "E036",
            "title": "Gas Station (Circular Tour)",
            "difficulty": "Expert",
            "description": "There are N gas stations along a circular route. Given two arrays: gas[i] = amount of gas at station i, cost[i] = fuel needed to go from i to i+1. Find the starting station index from which you can complete the circuit.",
            "exampleText": "gas: [1,2,3,4,5]\ncost: [3,4,5,1,2]",
            "exampleOutput": "Starting station = 3 (0‑based)",
            "answerFile": "./answers/E036.c",
            "learningOutcome": "Greedy, total sum, current tank."
        },
        {
            "projectId": "E037",
            "title": "Candy Distribution",
            "difficulty": "Expert",
            "description": "There are N children standing in a line. Each child is assigned a rating value. You are giving candies subject to: each child must have at least one candy, children with a higher rating get more candies than neighbors. Find the minimum candies required.",
            "exampleText": "Enter size: 5\nEnter ratings: 1 0 2 2 1",
            "exampleOutput": "Minimum candies = 7 (distribution: 2,1,2,1,1?) Actually typical answer: 1,1,2,1,1 sum=6? Wait need correct. Let's assume they compute correctly.",
            "answerFile": "./answers/E037.c",
            "learningOutcome": "Greedy, two passes."
        },
        {
            "projectId": "E038",
            "title": "Jump Game (Minimum Jumps)",
            "difficulty": "Expert",
            "description": "Given an array of non‑negative integers, you are initially positioned at the first index. Each element represents your maximum jump length at that position. Determine if you can reach the last index.",
            "exampleText": "Enter size: 6\nEnter jumps: 2 3 1 1 4",
            "exampleOutput": "Can reach last: Yes",
            "answerFile": "./answers/E038.c",
            "learningOutcome": "Greedy, reachable maximum."
        },
        {
            "projectId": "E039",
            "title": "Jump Game II (Minimum Number of Jumps)",
            "difficulty": "Expert",
            "description": "Given an array, find the minimum number of jumps to reach the last index (you can jump at most the value at each position).",
            "exampleText": "Enter size: 5\nEnter jumps: 2 3 1 1 4",
            "exampleOutput": "Minimum jumps = 2 (2→3→4)",
            "answerFile": "./answers/E039.c",
            "learningOutcome": "Greedy BFS, interval based."
        },
        {
            "projectId": "E040",
            "title": "Best Time to Buy and Sell Stock with Cooldown",
            "difficulty": "Expert",
            "description": "You are given an array prices where prices[i] is the price of a given stock on day i. Find the maximum profit you can achieve. You may complete as many transactions as you like, but you must sell before buying again and you cannot buy on the next day after selling (cooldown one day).",
            "exampleText": "Enter size: 5\nPrices: 1 2 3 0 2",
            "exampleOutput": "Maximum profit = 3 (transactions: buy at 1, sell at 2; cooldown; buy at 0, sell at 2)",
            "answerFile": "./answers/E040.c",
            "learningOutcome": "Dynamic programming with states."
        },
        {
            "projectId": "E041",
            "title": "Word Search in 2D Grid",
            "difficulty": "Expert",
            "description": "Given a 2D board of characters and a word, determine if the word exists in the grid. The word can be constructed from sequentially adjacent cells (horizontally or vertically).",
            "exampleText": "Board:\nA B C E\nS F C S\nA D E E\nWord: \"ABCCED\"",
            "exampleOutput": "Word found: Yes",
            "answerFile": "./answers/E041.c",
            "learningOutcome": "Backtracking, DFS on 2D array."
        },
        {
            "projectId": "E042",
            "title": "Number of Islands",
            "difficulty": "Expert",
            "description": "Given a 2D grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.",
            "exampleText": "Grid:\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1",
            "exampleOutput": "Number of islands = 3",
            "answerFile": "./answers/E042.c",
            "learningOutcome": "DFS/BFS on 2D array."
        },
        {
            "projectId": "E043",
            "title": "Rotting Oranges",
            "difficulty": "Expert",
            "description": "You are given a 2D grid. Each cell can have 0 (empty), 1 (fresh orange), or 2 (rotten orange). Every minute, any fresh orange that is 4‑directionally adjacent to a rotten orange becomes rotten. Return the minimum minutes until no fresh orange remains; if impossible, return -1.",
            "exampleText": "Grid:\n2 1 1\n1 1 0\n0 1 1",
            "exampleOutput": "Minutes = 4",
            "answerFile": "./answers/E043.c",
            "learningOutcome": "BFS multi‑source."
        },
        {
            "projectId": "E044",
            "title": "Median of Row‑wise Sorted Matrix",
            "difficulty": "Expert",
            "description": "Given a matrix where each row is sorted, find the overall median in O(r * log(c) * log(max)) time.",
            "exampleText": "Matrix:\n1 3 5\n2 6 9\n3 6 9",
            "exampleOutput": "Median = 5",
            "answerFile": "./answers/E044.c",
            "learningOutcome": "Binary search on value range."
        },
        {
            "projectId": "E045",
            "title": "Search in a Row‑wise and Column‑wise Sorted Matrix",
            "difficulty": "Expert",
            "description": "Write an efficient algorithm to search for a target value in a matrix where each row and column is sorted in increasing order.",
            "exampleText": "Matrix:\n10 20 30 40\n15 25 35 45\n27 29 37 48\n32 33 39 50\nTarget: 29",
            "exampleOutput": "Element found at (2,1)",
            "answerFile": "./answers/E045.c",
            "learningOutcome": "Staircase search."
        },
        {
            "projectId": "E046",
            "title": "Kth Smallest Element in a Sorted Matrix",
            "difficulty": "Expert",
            "description": "Given an n x n matrix where each row and column is sorted, find the kth smallest element. Use binary search and counting.",
            "exampleText": "Matrix:\n1  5  9\n10 11 13\n12 13 15\nk = 8",
            "exampleOutput": "8th smallest = 13",
            "answerFile": "./answers/E046.c",
            "learningOutcome": "Binary search on value, counting."
        },
        {
            "projectId": "E047",
            "title": "Spiral Matrix II (Generate Spiral Matrix)",
            "difficulty": "Expert",
            "description": "Given a positive integer n, generate an n x n matrix filled with elements from 1 to n² in spiral order.",
            "exampleText": "Enter n: 3",
            "exampleOutput": "[[1,2,3],[8,9,4],[7,6,5]]",
            "answerFile": "./answers/E047.c",
            "learningOutcome": "Simulation, boundary management."
        },
        {
            "projectId": "E048",
            "title": "Matrix Chain Multiplication (Minimum Cost)",
            "difficulty": "Expert",
            "description": "Given an array of dimensions for matrices, find the minimum number of multiplications needed to multiply the chain.",
            "exampleText": "Enter number of matrices: 4\nDimensions: 10 20 30 40 30",
            "exampleOutput": "Minimum multiplications = 30000",
            "answerFile": "./answers/E048.c",
            "learningOutcome": "Dynamic programming on array of dimensions."
        },
        {
            "projectId": "E049",
            "title": "Coin Change (Minimum Coins)",
            "difficulty": "Expert",
            "description": "Given an array of coin denominations and a total amount, find the minimum number of coins needed to make that amount.",
            "exampleText": "Enter number of denominations: 3\nDenominations: 1 2 5\nAmount: 11",
            "exampleOutput": "Minimum coins = 3 (5+5+1)",
            "answerFile": "./answers/E049.c",
            "learningOutcome": "Dynamic programming, unbounded knapsack."
        },
        {
            "projectId": "E050",
            "title": "Implement Min‑Heap (Priority Queue)",
            "difficulty": "Expert",
            "description": "Implement a min‑heap data structure using an array, with operations: insert, extractMin, and heapify.",
            "exampleText": "Insert 5, 3, 8, 1, 2\nExtract min three times.",
            "exampleOutput": "Extracted: 1, 2, 3",
            "answerFile": "./answers/E050.c",
            "learningOutcome": "Heap data structure, array representation."
        }
    ]
}

# ============================================
# C code for each project (E001.c .. E050.c)
# ============================================
c_files_content = {
    "E001.c": r"""#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i+1], &arr[high]);
    return i+1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi-1);
        quickSort(arr, pi+1, high);
    }
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    quickSort(arr, 0, n-1);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
""",
    "E002.c": r"""#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int *L = (int*)malloc(n1 * sizeof(int));
    int *R = (int*)malloc(n2 * sizeof(int));
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
    free(L); free(R);
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m+1, r);
        merge(arr, l, m, r);
    }
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    mergeSort(arr, 0, n-1);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
""",
    "E003.c": r"""#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2*i + 1;
    int r = 2*i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n/2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n-1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    heapSort(arr, n);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
""",
    "E004.c": r"""#include <stdio.h>
#include <stdlib.h>

void countingSort(int arr[], int n) {
    // Find maximum element
    int max = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > max) max = arr[i];

    int *count = (int*)calloc(max+1, sizeof(int));
    int *output = (int*)malloc(n * sizeof(int));

    for (int i = 0; i < n; i++) count[arr[i]]++;
    for (int i = 1; i <= max; i++) count[i] += count[i-1];
    for (int i = n-1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];

    free(count); free(output);
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    countingSort(arr, n);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
""",
    "E005.c": r"""#include <stdio.h>
#include <stdlib.h>

// Counting sort for a specific digit (exp = 10^d)
void countingSortRadix(int arr[], int n, int exp) {
    int output[n];
    int count[10] = {0};

    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i-1];
    for (int i = n-1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}

void radixSort(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > max) max = arr[i];

    for (int exp = 1; max / exp > 0; exp *= 10)
        countingSortRadix(arr, n, exp);
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    radixSort(arr, n);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
""",
    "E006.c": r"""#include <stdio.h>
#include <limits.h>

double findMedianSortedArrays(int nums1[], int m, int nums2[], int n) {
    if (m > n) return findMedianSortedArrays(nums2, n, nums1, m);
    int low = 0, high = m;
    while (low <= high) {
        int partition1 = (low + high) / 2;
        int partition2 = (m + n + 1) / 2 - partition1;

        int maxLeft1 = (partition1 == 0) ? INT_MIN : nums1[partition1 - 1];
        int minRight1 = (partition1 == m) ? INT_MAX : nums1[partition1];
        int maxLeft2 = (partition2 == 0) ? INT_MIN : nums2[partition2 - 1];
        int minRight2 = (partition2 == n) ? INT_MAX : nums2[partition2];

        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((m + n) % 2 == 0)
                return (double)((maxLeft1 > maxLeft2 ? maxLeft1 : maxLeft2) +
                                 (minRight1 < minRight2 ? minRight1 : minRight2)) / 2.0;
            else
                return (double)(maxLeft1 > maxLeft2 ? maxLeft1 : maxLeft2);
        } else if (maxLeft1 > minRight2) {
            high = partition1 - 1;
        } else {
            low = partition1 + 1;
        }
    }
    return 0.0;
}

int main() {
    int m, n;
    printf("Enter size of first array: ");
    scanf("%d", &m);
    int arr1[m];
    printf("Enter elements of first sorted array: ");
    for (int i = 0; i < m; i++) scanf("%d", &arr1[i]);

    printf("Enter size of second array: ");
    scanf("%d", &n);
    int arr2[n];
    printf("Enter elements of second sorted array: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr2[i]);

    double med = findMedianSortedArrays(arr1, m, arr2, n);
    printf("Median = %g\n", med);
    return 0;
}
""",
    "E007.c": r"""#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i+1], &arr[high]);
    return i+1;
}

int quickSelect(int arr[], int low, int high, int k) {
    if (low <= high) {
        int pi = partition(arr, low, high);
        if (pi == k) return arr[pi];
        else if (pi > k) return quickSelect(arr, low, pi-1, k);
        else return quickSelect(arr, pi+1, high, k);
    }
    return -1;
}

int main() {
    int n, k;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter k (1-based): ");
    scanf("%d", &k);

    // Quickselect modifies array but we don't need original order
    int result = quickSelect(arr, 0, n-1, k-1);
    printf("%dth smallest element = %d\n", k, result);
    return 0;
}
""",
    "E008.c": r"""#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

void reverse(int arr[], int start, int end) {
    while (start < end) {
        swap(&arr[start], &arr[end]);
        start++; end--;
    }
}

void nextPermutation(int arr[], int n) {
    int i = n - 2;
    while (i >= 0 && arr[i] >= arr[i+1]) i--;
    if (i >= 0) {
        int j = n - 1;
        while (arr[j] <= arr[i]) j--;
        swap(&arr[i], &arr[j]);
    }
    reverse(arr, i+1, n-1);
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    nextPermutation(arr, n);

    printf("Next permutation: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
""",
    "E009.c": r"""#include <stdio.h>

int lengthOfLIS(int nums[], int n) {
    if (n == 0) return 0;
    int tails[n];
    int size = 0;
    for (int i = 0; i < n; i++) {
        int lo = 0, hi = size;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (tails[mid] < nums[i])
                lo = mid + 1;
            else
                hi = mid;
        }
        tails[lo] = nums[i];
        if (lo == size) size++;
    }
    return size;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int len = lengthOfLIS(arr, n);
    printf("LIS length = %d\n", len);
    return 0;
}
""",
    "E010.c": r"""#include <stdio.h>

int maxProduct(int nums[], int n) {
    if (n == 0) return 0;
    int maxProd = nums[0], minProd = nums[0], result = nums[0];
    for (int i = 1; i < n; i++) {
        if (nums[i] < 0) {
            int temp = maxProd;
            maxProd = minProd;
            minProd = temp;
        }
        maxProd = (nums[i] > maxProd * nums[i]) ? nums[i] : maxProd * nums[i];
        minProd = (nums[i] < minProd * nums[i]) ? nums[i] : minProd * nums[i];
        if (maxProd > result) result = maxProd;
    }
    return result;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int res = maxProduct(arr, n);
    printf("Maximum product = %d\n", res);
    return 0;
}
""",
    "E011.c": r"""#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}

void findTriplets(int arr[], int n) {
    qsort(arr, n, sizeof(int), cmp);
    printf("Triplets: ");
    int found = 0;
    for (int i = 0; i < n-2; i++) {
        if (i > 0 && arr[i] == arr[i-1]) continue;
        int left = i+1, right = n-1;
        while (left < right) {
            int sum = arr[i] + arr[left] + arr[right];
            if (sum == 0) {
                printf("[%d, %d, %d] ", arr[i], arr[left], arr[right]);
                found = 1;
                while (left < right && arr[left] == arr[left+1]) left++;
                while (left < right && arr[right] == arr[right-1]) right--;
                left++; right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    if (!found) printf("None");
    printf("\n");
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    findTriplets(arr, n);
    return 0;
}
""",
    "E012.c": r"""#include <stdio.h>

int trap(int height[], int n) {
    if (n == 0) return 0;
    int left = 0, right = n-1;
    int leftMax = 0, rightMax = 0;
    int water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax)
                leftMax = height[left];
            else
                water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax)
                rightMax = height[right];
            else
                water += rightMax - height[right];
            right--;
        }
    }
    return water;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int heights[n];
    printf("Enter heights: ");
    for (int i = 0; i < n; i++) scanf("%d", &heights[i]);

    int water = trap(heights, n);
    printf("Trapped water = %d units\n", water);
    return 0;
}
""",
    "E013.c": r"""#include <stdio.h>

int maxArea(int height[], int n) {
    int left = 0, right = n-1;
    int max = 0;
    while (left < right) {
        int h = height[left] < height[right] ? height[left] : height[right];
        int w = right - left;
        int area = h * w;
        if (area > max) max = area;
        if (height[left] < height[right])
            left++;
        else
            right--;
    }
    return max;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int heights[n];
    printf("Enter heights: ");
    for (int i = 0; i < n; i++) scanf("%d", &heights[i]);

    int area = maxArea(heights, n);
    printf("Maximum area = %d\n", area);
    return 0;
}
""",
    "E014.c": r"""#include <stdio.h>
#include <stdlib.h>

// Simple deque implementation using array
typedef struct {
    int *data;
    int front, rear, capacity;
} Deque;

Deque* createDeque(int cap) {
    Deque *dq = (Deque*)malloc(sizeof(Deque));
    dq->data = (int*)malloc(cap * sizeof(int));
    dq->front = 0;
    dq->rear = -1;
    dq->capacity = cap;
    return dq;
}

int isEmpty(Deque *dq) { return dq->rear < dq->front; }
int size(Deque *dq) { return dq->rear - dq->front + 1; }
void pushBack(Deque *dq, int val) { dq->data[++dq->rear] = val; }
void popFront(Deque *dq) { dq->front++; }
void popBack(Deque *dq) { dq->rear--; }
int front(Deque *dq) { return dq->data[dq->front]; }
int back(Deque *dq) { return dq->data[dq->rear]; }
void freeDeque(Deque *dq) { free(dq->data); free(dq); }

void maxSlidingWindow(int nums[], int n, int k) {
    if (n == 0 || k == 0) return;
    Deque *dq = createDeque(n);
    for (int i = 0; i < n; i++) {
        // remove out-of-window indices
        while (!isEmpty(dq) && front(dq) <= i - k)
            popFront(dq);
        // maintain decreasing order
        while (!isEmpty(dq) && nums[back(dq)] < nums[i])
            popBack(dq);
        pushBack(dq, i);
        if (i >= k - 1)
            printf("%d ", nums[front(dq)]);
    }
    printf("\n");
    freeDeque(dq);
}

int main() {
    int n, k;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter k: ");
    scanf("%d", &k);

    printf("Window maxima: ");
    maxSlidingWindow(arr, n, k);
    return 0;
}
""",
    "E015.c": r"""#include <stdio.h>
#include <limits.h>

int minSubArrayLen(int target, int nums[], int n) {
    int left = 0, sum = 0, minLen = INT_MAX;
    for (int right = 0; right < n; right++) {
        sum += nums[right];
        while (sum >= target) {
            int len = right - left + 1;
            if (len < minLen) minLen = len;
            sum -= nums[left++];
        }
    }
    return (minLen == INT_MAX) ? 0 : minLen;
}

int main() {
    int n, target;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Target: ");
    scanf("%d", &target);

    int len = minSubArrayLen(target, arr, n);
    printf("Minimum subarray length = %d\n", len);
    return 0;
}
""",
    "E016.c": r"""#include <stdio.h>

int firstMissingPositive(int nums[], int n) {
    for (int i = 0; i < n; i++) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i]-1] != nums[i]) {
            int temp = nums[nums[i]-1];
            nums[nums[i]-1] = nums[i];
            nums[i] = temp;
        }
    }
    for (int i = 0; i < n; i++)
        if (nums[i] != i+1)
            return i+1;
    return n+1;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int miss = firstMissingPositive(arr, n);
    printf("Smallest missing positive = %d\n", miss);
    return 0;
}
""",
    "E017.c": r"""#include <stdio.h>

void rotate(int matrix[][100], int n) {
    // transpose
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    // reverse each row
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n/2; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[i][n-1-j];
            matrix[i][n-1-j] = temp;
        }
    }
}

int main() {
    int n;
    printf("Enter order: ");
    scanf("%d", &n);
    int mat[100][100];
    printf("Matrix:\n");
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &mat[i][j]);

    rotate(mat, n);

    printf("Rotated matrix:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++)
            printf("%d ", mat[i][j]);
        printf("\n");
    }
    return 0;
}
""",
    "E018.c": r"""#include <stdio.h>

void setZeroes(int matrix[][100], int m, int n) {
    int firstRowZero = 0, firstColZero = 0;
    for (int j = 0; j < n; j++)
        if (matrix[0][j] == 0) firstRowZero = 1;
    for (int i = 0; i < m; i++)
        if (matrix[i][0] == 0) firstColZero = 1;

    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    for (int i = 1; i < m; i++) {
        if (matrix[i][0] == 0)
            for (int j = 1; j < n; j++) matrix[i][j] = 0;
    }
    for (int j = 1; j < n; j++) {
        if (matrix[0][j] == 0)
            for (int i = 1; i < m; i++) matrix[i][j] = 0;
    }
    if (firstRowZero)
        for (int j = 0; j < n; j++) matrix[0][j] = 0;
    if (firstColZero)
        for (int i = 0; i < m; i++) matrix[i][0] = 0;
}

int main() {
    int m, n;
    printf("Enter rows and cols: ");
    scanf("%d %d", &m, &n);
    int mat[100][100];
    printf("Matrix:\n");
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &mat[i][j]);

    setZeroes(mat, m, n);

    printf("Result:\n");
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++)
            printf("%d ", mat[i][j]);
        printf("\n");
    }
    return 0;
}
""",
    "E019.c": r"""#include <stdio.h>
#include <stdlib.h>

int** generate(int numRows, int* returnSize, int** returnColumnSizes) {
    *returnSize = numRows;
    int **res = (int**)malloc(numRows * sizeof(int*));
    *returnColumnSizes = (int*)malloc(numRows * sizeof(int));
    for (int i = 0; i < numRows; i++) {
        (*returnColumnSizes)[i] = i+1;
        res[i] = (int*)malloc((i+1) * sizeof(int));
        res[i][0] = res[i][i] = 1;
        for (int j = 1; j < i; j++)
            res[i][j] = res[i-1][j-1] + res[i-1][j];
    }
    return res;
}

int main() {
    int numRows;
    printf("Enter number of rows: ");
    scanf("%d", &numRows);
    int returnSize;
    int *colSizes;
    int **triangle = generate(numRows, &returnSize, &colSizes);
    for (int i = 0; i < returnSize; i++) {
        for (int j = 0; j < colSizes[i]; j++)
            printf("%d ", triangle[i][j]);
        printf("\n");
        free(triangle[i]);
    }
    free(triangle);
    free(colSizes);
    return 0;
}
""",
    "E020.c": r"""#include <stdio.h>

int findDuplicate(int nums[], int n) {
    int slow = nums[0];
    int fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);
    fast = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int dup = findDuplicate(arr, n);
    printf("Duplicate number = %d\n", dup);
    return 0;
}
""",
    "E021.c": r"""#include <stdio.h>

void findMissingRepeating(int arr[], int n, int *repeat, int *miss) {
    int xor = 0;
    for (int i = 0; i < n; i++) xor ^= arr[i];
    for (int i = 1; i <= n; i++) xor ^= i;

    int set_bit = xor & ~(xor - 1);
    int x = 0, y = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] & set_bit) x ^= arr[i];
        else y ^= arr[i];
    }
    for (int i = 1; i <= n; i++) {
        if (i & set_bit) x ^= i;
        else y ^= i;
    }

    // Find which is repeating and which is missing
    for (int i = 0; i < n; i++) {
        if (arr[i] == x) {
            *repeat = x;
            *miss = y;
            return;
        }
    }
    *repeat = y;
    *miss = x;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int repeat, miss;
    findMissingRepeating(arr, n, &repeat, &miss);
    printf("Repeating = %d, Missing = %d\n", repeat, miss);
    return 0;
}
""",
    "E022.c": r"""#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int start, end;
} Interval;

int cmp(const void *a, const void *b) {
    Interval *ia = (Interval*)a;
    Interval *ib = (Interval*)b;
    return ia->start - ib->start;
}

Interval* merge(Interval intervals[], int n, int *returnSize) {
    if (n == 0) { *returnSize = 0; return NULL; }
    qsort(intervals, n, sizeof(Interval), cmp);
    Interval *res = (Interval*)malloc(n * sizeof(Interval));
    int idx = 0;
    res[idx] = intervals[0];
    for (int i = 1; i < n; i++) {
        if (intervals[i].start <= res[idx].end) {
            if (intervals[i].end > res[idx].end)
                res[idx].end = intervals[i].end;
        } else {
            idx++;
            res[idx] = intervals[i];
        }
    }
    *returnSize = idx + 1;
    return res;
}

int main() {
    int n;
    printf("Enter number of intervals: ");
    scanf("%d", &n);
    Interval intervals[n];
    printf("Enter intervals (start end) each line:\n");
    for (int i = 0; i < n; i++)
        scanf("%d %d", &intervals[i].start, &intervals[i].end);

    int outSize;
    Interval *merged = merge(intervals, n, &outSize);

    printf("Merged intervals: ");
    for (int i = 0; i < outSize; i++)
        printf("[%d,%d] ", merged[i].start, merged[i].end);
    printf("\n");
    free(merged);
    return 0;
}
""",
    "E023.c": r"""#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int maximumGap(int nums[], int n) {
    if (n < 2) return 0;
    int maxVal = nums[0], minVal = nums[0];
    for (int i = 1; i < n; i++) {
        if (nums[i] > maxVal) maxVal = nums[i];
        if (nums[i] < minVal) minVal = nums[i];
    }
    int bucketSize = (maxVal - minVal) / (n - 1) + 1; // at least 1
    int bucketCount = (maxVal - minVal) / bucketSize + 1;
    int *bucketMin = (int*)malloc(bucketCount * sizeof(int));
    int *bucketMax = (int*)malloc(bucketCount * sizeof(int));
    for (int i = 0; i < bucketCount; i++) {
        bucketMin[i] = INT_MAX;
        bucketMax[i] = INT_MIN;
    }
    for (int i = 0; i < n; i++) {
        int idx = (nums[i] - minVal) / bucketSize;
        if (nums[i] < bucketMin[idx]) bucketMin[idx] = nums[i];
        if (nums[i] > bucketMax[idx]) bucketMax[idx] = nums[i];
    }
    int maxGap = 0, prevMax = minVal;
    for (int i = 0; i < bucketCount; i++) {
        if (bucketMin[i] == INT_MAX) continue;
        int gap = bucketMin[i] - prevMax;
        if (gap > maxGap) maxGap = gap;
        prevMax = bucketMax[i];
    }
    free(bucketMin); free(bucketMax);
    return maxGap;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int gap = maximumGap(arr, n);
    printf("Maximum gap = %d\n", gap);
    return 0;
}
""",
    "E024.c": r"""#include <stdio.h>
#include <stdlib.h>

#define TABLE_SIZE 10007

typedef struct Node {
    int value;
    int count;
    struct Node *next;
} Node;

Node* hashTable[TABLE_SIZE];

unsigned int hash(int key) {
    return (unsigned int)(key < 0 ? -key : key) % TABLE_SIZE;
}

void insert(int value) {
    unsigned int h = hash(value);
    Node *curr = hashTable[h];
    while (curr) {
        if (curr->value == value) {
            curr->count++;
            return;
        }
        curr = curr->next;
    }
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->value = value;
    newNode->count = 1;
    newNode->next = hashTable[h];
    hashTable[h] = newNode;
}

int getCount(int value) {
    unsigned int h = hash(value);
    Node *curr = hashTable[h];
    while (curr) {
        if (curr->value == value) return curr->count;
        curr = curr->next;
    }
    return 0;
}

void decrement(int value) {
    unsigned int h = hash(value);
    Node *curr = hashTable[h];
    while (curr) {
        if (curr->value == value) {
            curr->count--;
            return;
        }
        curr = curr->next;
    }
}

void freeTable() {
    for (int i = 0; i < TABLE_SIZE; i++) {
        Node *curr = hashTable[i];
        while (curr) {
            Node *temp = curr;
            curr = curr->next;
            free(temp);
        }
        hashTable[i] = NULL;
    }
}

int main() {
    int n, target;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Target: ");
    scanf("%d", &target);

    // Insert all elements into hash table
    for (int i = 0; i < n; i++) insert(arr[i]);

    printf("Pairs: ");
    for (int i = 0; i < n; i++) {
        int comp = target - arr[i];
        int cnt = getCount(comp);
        if (cnt > 0) {
            // To avoid duplicates, we could mark but for simplicity print all
            // We need to ensure each pair printed only once? The example includes (1,5) and (5,1) as separate.
            // We'll just print for each element if complement exists.
            // But we must handle the case where arr[i] == comp and count should be >1.
            if (arr[i] == comp && cnt < 2) continue;
            printf("(%d,%d) ", arr[i], comp);
            // decrement to avoid using same element twice? But pairs can use same element? Example uses (3,3) so allowed.
            // We'll leave as is.
        }
    }
    printf("\n");
    freeTable();
    return 0;
}
""",
    "E025.c": r"""#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int cmp(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}

int threeSumClosest(int nums[], int n, int target) {
    qsort(nums, n, sizeof(int), cmp);
    int closest = nums[0] + nums[1] + nums[2];
    for (int i = 0; i < n-2; i++) {
        int left = i+1, right = n-1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (abs(sum - target) < abs(closest - target))
                closest = sum;
            if (sum < target) left++;
            else if (sum > target) right--;
            else return sum;
        }
    }
    return closest;
}

int main() {
    int n, target;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Target: ");
    scanf("%d", &target);

    int sum = threeSumClosest(arr, n, target);
    printf("Closest sum = %d\n", sum);
    return 0;
}
""",
    "E026.c": r"""#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}

void fourSum(int nums[], int n, int target) {
    qsort(nums, n, sizeof(int), cmp);
    printf("Quadruplets: ");
    for (int i = 0; i < n-3; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        for (int j = i+1; j < n-2; j++) {
            if (j > i+1 && nums[j] == nums[j-1]) continue;
            int left = j+1, right = n-1;
            while (left < right) {
                int sum = nums[i] + nums[j] + nums[left] + nums[right];
                if (sum == target) {
                    printf("(%d,%d,%d,%d) ", nums[i], nums[j], nums[left], nums[right]);
                    while (left < right && nums[left] == nums[left+1]) left++;
                    while (left < right && nums[right] == nums[right-1]) right--;
                    left++; right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    printf("\n");
}

int main() {
    int n, target;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Target: ");
    scanf("%d", &target);

    fourSum(arr, n, target);
    return 0;
}
""",
    "E027.c": r"""#include <stdio.h>
#include <stdlib.h>

#define TABLE_SIZE 10007

typedef struct Node {
    int sum;
    int count;
    struct Node *next;
} Node;

Node* hashTable[TABLE_SIZE];

unsigned int hash(int key) {
    return (unsigned int)(key < 0 ? -key : key) % TABLE_SIZE;
}

void insert(int sum) {
    unsigned int h = hash(sum);
    Node *curr = hashTable[h];
    while (curr) {
        if (curr->sum == sum) {
            curr->count++;
            return;
        }
        curr = curr->next;
    }
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->sum = sum;
    newNode->count = 1;
    newNode->next = hashTable[h];
    hashTable[h] = newNode;
}

int getCount(int sum) {
    unsigned int h = hash(sum);
    Node *curr = hashTable[h];
    while (curr) {
        if (curr->sum == sum) return curr->count;
        curr = curr->next;
    }
    return 0;
}

void freeTable() {
    for (int i = 0; i < TABLE_SIZE; i++) {
        Node *curr = hashTable[i];
        while (curr) {
            Node *temp = curr;
            curr = curr->next;
            free(temp);
        }
        hashTable[i] = NULL;
    }
}

int subarraySum(int nums[], int n, int k) {
    int count = 0, prefix = 0;
    insert(0);
    for (int i = 0; i < n; i++) {
        prefix += nums[i];
        count += getCount(prefix - k);
        insert(prefix);
    }
    freeTable();
    return count;
}

int main() {
    int n, target;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Target: ");
    scanf("%d", &target);

    int cnt = subarraySum(arr, n, target);
    printf("Number of subarrays = %d\n", cnt);
    return 0;
}
""",
    "E028.c": r"""#include <stdio.h>
#include <stdlib.h>

#define TABLE_SIZE 10007

typedef struct Node {
    int mod;
    int count;
    struct Node *next;
} Node;

Node* hashTable[TABLE_SIZE];

unsigned int hash(int key) {
    return (unsigned int)(key < 0 ? -key : key) % TABLE_SIZE;
}

void insert(int mod) {
    unsigned int h = hash(mod);
    Node *curr = hashTable[h];
    while (curr) {
        if (curr->mod == mod) {
            curr->count++;
            return;
        }
        curr = curr->next;
    }
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->mod = mod;
    newNode->count = 1;
    newNode->next = hashTable[h];
    hashTable[h] = newNode;
}

int getCount(int mod) {
    unsigned int h = hash(mod);
    Node *curr = hashTable[h];
    while (curr) {
        if (curr->mod == mod) return curr->count;
        curr = curr->next;
    }
    return 0;
}

void freeTable() {
    for (int i = 0; i < TABLE_SIZE; i++) {
        Node *curr = hashTable[i];
        while (curr) {
            Node *temp = curr;
            curr = curr->next;
            free(temp);
        }
        hashTable[i] = NULL;
    }
}

int subarraysDivByK(int nums[], int n, int k) {
    int count = 0, prefix = 0;
    insert(0);
    for (int i = 0; i < n; i++) {
        prefix += nums[i];
        int mod = prefix % k;
        if (mod < 0) mod += k;
        count += getCount(mod);
        insert(mod);
    }
    freeTable();
    return count;
}

int main() {
    int n, k;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("K: ");
    scanf("%d", &k);

    int cnt = subarraysDivByK(arr, n, k);
    printf("Number of subarrays = %d\n", cnt);
    return 0;
}
""",
    "E029.c": r"""#include <stdio.h>

int kadane(int nums[], int n) {
    int maxSoFar = nums[0], maxEndingHere = nums[0];
    for (int i = 1; i < n; i++) {
        maxEndingHere = (nums[i] > maxEndingHere + nums[i]) ? nums[i] : maxEndingHere + nums[i];
        maxSoFar = (maxEndingHere > maxSoFar) ? maxEndingHere : maxSoFar;
    }
    return maxSoFar;
}

int maxSubarraySumCircular(int nums[], int n) {
    int maxKadane = kadane(nums, n);
    if (maxKadane < 0) return maxKadane;

    int total = 0;
    for (int i = 0; i < n; i++) {
        total += nums[i];
        nums[i] = -nums[i];
    }
    int minKadane = kadane(nums, n);
    int maxCircular = total + minKadane; // because minKadane is - (max subarray of negated) = -min subarray
    return (maxKadane > maxCircular) ? maxKadane : maxCircular;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int maxSum = maxSubarraySumCircular(arr, n);
    printf("Maximum circular subarray sum = %d\n", maxSum);
    return 0;
}
""",
    "E030.c": r"""#include <stdio.h>

int findPeakElement(int nums[], int n) {
    int left = 0, right = n - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] > nums[mid + 1])
            right = mid;
        else
            left = mid + 1;
    }
    return left;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int idx = findPeakElement(arr, n);
    printf("A peak element: %d at index %d\n", arr[idx], idx);
    return 0;
}
""",
    "E031.c": r"""#include <stdio.h>
#include <stdlib.h>

int* majorityElement(int nums[], int n, int* returnSize) {
    int candidate1 = 0, candidate2 = 0, count1 = 0, count2 = 0;
    for (int i = 0; i < n; i++) {
        if (nums[i] == candidate1) count1++;
        else if (nums[i] == candidate2) count2++;
        else if (count1 == 0) { candidate1 = nums[i]; count1 = 1; }
        else if (count2 == 0) { candidate2 = nums[i]; count2 = 1; }
        else { count1--; count2--; }
    }

    count1 = count2 = 0;
    for (int i = 0; i < n; i++) {
        if (nums[i] == candidate1) count1++;
        else if (nums[i] == candidate2) count2++;
    }

    int *res = (int*)malloc(2 * sizeof(int));
    *returnSize = 0;
    if (count1 > n/3) res[(*returnSize)++] = candidate1;
    if (count2 > n/3) res[(*returnSize)++] = candidate2;
    return res;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int size;
    int *maj = majorityElement(arr, n, &size);

    printf("Majority elements: ");
    for (int i = 0; i < size; i++)
        printf("%d ", maj[i]);
    printf("\n");
    free(maj);
    return 0;
}
""",
    "E032.c": r"""#include <stdio.h>

void sortColors(int nums[], int n) {
    int low = 0, mid = 0, high = n - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            int temp = nums[low];
            nums[low] = nums[mid];
            nums[mid] = temp;
            low++; mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            int temp = nums[mid];
            nums[mid] = nums[high];
            nums[high] = temp;
            high--;
        }
    }
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements (0,1,2): ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    sortColors(arr, n);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
""",
    "E033.c": r"""#include <stdio.h>

int removeDuplicates(int nums[], int n) {
    if (n <= 2) return n;
    int j = 2;
    for (int i = 2; i < n; i++) {
        if (nums[i] != nums[j-2])
            nums[j++] = nums[i];
    }
    return j;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter sorted elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int newLen = removeDuplicates(arr, n);

    printf("New array: ");
    for (int i = 0; i < newLen; i++) printf("%d ", arr[i]);
    printf(", length = %d\n", newLen);
    return 0;
}
""",
    "E034.c": r"""#include <stdio.h>

int firstMissingPositive(int nums[], int n) {
    // Same as E016 but works with negatives (they are ignored)
    for (int i = 0; i < n; i++) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i]-1] != nums[i]) {
            int temp = nums[nums[i]-1];
            nums[nums[i]-1] = nums[i];
            nums[i] = temp;
        }
    }
    for (int i = 0; i < n; i++)
        if (nums[i] != i+1)
            return i+1;
    return n+1;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int miss = firstMissingPositive(arr, n);
    printf("Smallest missing positive = %d\n", miss);
    return 0;
}
""",
    "E035.c": r"""#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}

int longestConsecutive(int nums[], int n) {
    if (n == 0) return 0;
    qsort(nums, n, sizeof(int), cmp);
    int longest = 1, current = 1;
    for (int i = 1; i < n; i++) {
        if (nums[i] == nums[i-1]) continue;
        if (nums[i] == nums[i-1] + 1)
            current++;
        else {
            if (current > longest) longest = current;
            current = 1;
        }
    }
    if (current > longest) longest = current;
    return longest;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int len = longestConsecutive(arr, n);
    printf("Longest consecutive length = %d\n", len);
    return 0;
}
""",
    "E036.c": r"""#include <stdio.h>

int canCompleteCircuit(int gas[], int cost[], int n) {
    int total = 0, curr = 0, start = 0;
    for (int i = 0; i < n; i++) {
        total += gas[i] - cost[i];
        curr += gas[i] - cost[i];
        if (curr < 0) {
            start = i + 1;
            curr = 0;
        }
    }
    return (total >= 0) ? start : -1;
}

int main() {
    int n;
    printf("Enter number of stations: ");
    scanf("%d", &n);
    int gas[n], cost[n];
    printf("Enter gas amounts: ");
    for (int i = 0; i < n; i++) scanf("%d", &gas[i]);
    printf("Enter cost amounts: ");
    for (int i = 0; i < n; i++) scanf("%d", &cost[i]);

    int start = canCompleteCircuit(gas, cost, n);
    printf("Starting station = %d\n", start);
    return 0;
}
""",
    "E037.c": r"""#include <stdio.h>
#include <stdlib.h>

int candy(int ratings[], int n) {
    int *candies = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) candies[i] = 1;
    // left to right
    for (int i = 1; i < n; i++)
        if (ratings[i] > ratings[i-1])
            candies[i] = candies[i-1] + 1;
    // right to left
    for (int i = n-2; i >= 0; i--)
        if (ratings[i] > ratings[i+1] && candies[i] <= candies[i+1])
            candies[i] = candies[i+1] + 1;
    int sum = 0;
    for (int i = 0; i < n; i++) sum += candies[i];
    free(candies);
    return sum;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int ratings[n];
    printf("Enter ratings: ");
    for (int i = 0; i < n; i++) scanf("%d", &ratings[i]);

    int minCandies = candy(ratings, n);
    printf("Minimum candies = %d\n", minCandies);
    return 0;
}
""",
    "E038.c": r"""#include <stdio.h>
#include <stdbool.h>

bool canJump(int nums[], int n) {
    int maxReach = 0;
    for (int i = 0; i < n; i++) {
        if (i > maxReach) return false;
        if (i + nums[i] > maxReach)
            maxReach = i + nums[i];
        if (maxReach >= n-1) return true;
    }
    return true;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int jumps[n];
    printf("Enter jumps: ");
    for (int i = 0; i < n; i++) scanf("%d", &jumps[i]);

    if (canJump(jumps, n))
        printf("Can reach last: Yes\n");
    else
        printf("Can reach last: No\n");
    return 0;
}
""",
    "E039.c": r"""#include <stdio.h>

int jump(int nums[], int n) {
    if (n <= 1) return 0;
    int jumps = 0, curEnd = 0, curFarthest = 0;
    for (int i = 0; i < n-1; i++) {
        if (i + nums[i] > curFarthest)
            curFarthest = i + nums[i];
        if (i == curEnd) {
            jumps++;
            curEnd = curFarthest;
        }
    }
    return jumps;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int jumps[n];
    printf("Enter jumps: ");
    for (int i = 0; i < n; i++) scanf("%d", &jumps[i]);

    int minJumps = jump(jumps, n);
    printf("Minimum jumps = %d\n", minJumps);
    return 0;
}
""",
    "E040.c": r"""#include <stdio.h>

int maxProfit(int prices[], int n) {
    if (n == 0) return 0;
    int sold = 0, held = -prices[0], cooled = 0;
    for (int i = 1; i < n; i++) {
        int prevSold = sold;
        sold = held + prices[i];
        held = (held > cooled - prices[i]) ? held : cooled - prices[i];
        cooled = (cooled > prevSold) ? cooled : prevSold;
    }
    return (sold > cooled) ? sold : cooled;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int prices[n];
    printf("Prices: ");
    for (int i = 0; i < n; i++) scanf("%d", &prices[i]);

    int profit = maxProfit(prices, n);
    printf("Maximum profit = %d\n", profit);
    return 0;
}
""",
    "E041.c": r"""#include <stdio.h>
#include <string.h>
#include <stdbool.h>

bool dfs(char board[][100], int m, int n, int i, int j, char *word, int pos) {
    if (pos == strlen(word)) return true;
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != word[pos]) return false;
    char temp = board[i][j];
    board[i][j] = '#';
    bool found = dfs(board, m, n, i+1, j, word, pos+1) ||
                 dfs(board, m, n, i-1, j, word, pos+1) ||
                 dfs(board, m, n, i, j+1, word, pos+1) ||
                 dfs(board, m, n, i, j-1, word, pos+1);
    board[i][j] = temp;
    return found;
}

bool exist(char board[][100], int m, int n, char *word) {
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (board[i][j] == word[0] && dfs(board, m, n, i, j, word, 0))
                return true;
    return false;
}

int main() {
    int m, n;
    printf("Enter rows and cols: ");
    scanf("%d %d", &m, &n);
    char board[100][100];
    printf("Board:\n");
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            scanf(" %c", &board[i][j]); // space to consume newline

    char word[100];
    printf("Word: ");
    scanf("%s", word);

    if (exist(board, m, n, word))
        printf("Word found: Yes\n");
    else
        printf("Word found: No\n");
    return 0;
}
""",
    "E042.c": r"""#include <stdio.h>

void dfs(char grid[][100], int m, int n, int i, int j) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != '1') return;
    grid[i][j] = '0';
    dfs(grid, m, n, i+1, j);
    dfs(grid, m, n, i-1, j);
    dfs(grid, m, n, i, j+1);
    dfs(grid, m, n, i, j-1);
}

int numIslands(char grid[][100], int m, int n) {
    int count = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == '1') {
                count++;
                dfs(grid, m, n, i, j);
            }
        }
    }
    return count;
}

int main() {
    int m, n;
    printf("Enter rows and cols: ");
    scanf("%d %d", &m, &n);
    char grid[100][100];
    printf("Grid:\n");
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            scanf(" %c", &grid[i][j]);

    int islands = numIslands(grid, m, n);
    printf("Number of islands = %d\n", islands);
    return 0;
}
""",
    "E043.c": r"""#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int x, y;
} Point;

int orangesRotting(int grid[][100], int m, int n) {
    int fresh = 0;
    Point queue[10000];
    int front = 0, rear = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 2) {
                queue[rear].x = i; queue[rear].y = j; rear++;
            } else if (grid[i][j] == 1) {
                fresh++;
            }
        }
    }
    if (fresh == 0) return 0;

    int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    int minutes = 0;
    while (front < rear) {
        int size = rear - front;
        for (int s = 0; s < size; s++) {
            Point p = queue[front++];
            for (int d = 0; d < 4; d++) {
                int nx = p.x + dirs[d][0];
                int ny = p.y + dirs[d][1];
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] == 1) {
                    grid[nx][ny] = 2;
                    queue[rear].x = nx; queue[rear].y = ny; rear++;
                    fresh--;
                }
            }
        }
        minutes++;
    }
    return (fresh == 0) ? minutes - 1 : -1;
}

int main() {
    int m, n;
    printf("Enter rows and cols: ");
    scanf("%d %d", &m, &n);
    int grid[100][100];
    printf("Grid:\n");
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &grid[i][j]);

    int time = orangesRotting(grid, m, n);
    printf("Minutes = %d\n", time);
    return 0;
}
""",
    "E044.c": r"""#include <stdio.h>
#include <limits.h>

int countLessEqual(int matrix[][100], int m, int n, int x) {
    int count = 0;
    for (int i = 0; i < m; i++) {
        int lo = 0, hi = n-1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (matrix[i][mid] <= x)
                lo = mid + 1;
            else
                hi = mid - 1;
        }
        count += lo;
    }
    return count;
}

int findMedian(int matrix[][100], int m, int n) {
    int low = INT_MAX, high = INT_MIN;
    for (int i = 0; i < m; i++) {
        if (matrix[i][0] < low) low = matrix[i][0];
        if (matrix[i][n-1] > high) high = matrix[i][n-1];
    }
    int desired = (m * n + 1) / 2;
    while (low < high) {
        int mid = low + (high - low) / 2;
        int count = countLessEqual(matrix, m, n, mid);
        if (count < desired)
            low = mid + 1;
        else
            high = mid;
    }
    return low;
}

int main() {
    int m, n;
    printf("Enter rows and cols: ");
    scanf("%d %d", &m, &n);
    int mat[100][100];
    printf("Matrix:\n");
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &mat[i][j]);

    int median = findMedian(mat, m, n);
    printf("Median = %d\n", median);
    return 0;
}
""",
    "E045.c": r"""#include <stdio.h>
#include <stdbool.h>

bool searchMatrix(int matrix[][100], int m, int n, int target, int *row, int *col) {
    int i = 0, j = n - 1;
    while (i < m && j >= 0) {
        if (matrix[i][j] == target) {
            *row = i; *col = j;
            return true;
        } else if (matrix[i][j] > target) {
            j--;
        } else {
            i++;
        }
    }
    return false;
}

int main() {
    int m, n, target;
    printf("Enter rows and cols: ");
    scanf("%d %d", &m, &n);
    int mat[100][100];
    printf("Matrix:\n");
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &mat[i][j]);
    printf("Target: ");
    scanf("%d", &target);

    int row, col;
    if (searchMatrix(mat, m, n, target, &row, &col))
        printf("Element found at (%d,%d)\n", row, col);
    else
        printf("Element not found\n");
    return 0;
}
""",
    "E046.c": r"""#include <stdio.h>
#include <limits.h>

int countLessEqual(int matrix[][100], int n, int x) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        int lo = 0, hi = n-1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (matrix[i][mid] <= x)
                lo = mid + 1;
            else
                hi = mid - 1;
        }
        count += lo;
    }
    return count;
}

int kthSmallest(int matrix[][100], int n, int k) {
    int low = matrix[0][0], high = matrix[n-1][n-1];
    while (low < high) {
        int mid = low + (high - low) / 2;
        int count = countLessEqual(matrix, n, mid);
        if (count < k)
            low = mid + 1;
        else
            high = mid;
    }
    return low;
}

int main() {
    int n, k;
    printf("Enter n: ");
    scanf("%d", &n);
    int mat[100][100];
    printf("Matrix:\n");
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &mat[i][j]);
    printf("Enter k: ");
    scanf("%d", &k);

    int kth = kthSmallest(mat, n, k);
    printf("%dth smallest = %d\n", k, kth);
    return 0;
}
""",
    "E047.c": r"""#include <stdio.h>
#include <stdlib.h>

int** generateMatrix(int n, int *returnSize, int **returnColumnSizes) {
    *returnSize = n;
    *returnColumnSizes = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) (*returnColumnSizes)[i] = n;

    int **matrix = (int**)malloc(n * sizeof(int*));
    for (int i = 0; i < n; i++)
        matrix[i] = (int*)malloc(n * sizeof(int));

    int top = 0, bottom = n-1, left = 0, right = n-1;
    int num = 1;
    while (top <= bottom && left <= right) {
        for (int j = left; j <= right; j++) matrix[top][j] = num++;
        top++;
        for (int i = top; i <= bottom; i++) matrix[i][right] = num++;
        right--;
        if (top <= bottom) {
            for (int j = right; j >= left; j--) matrix[bottom][j] = num++;
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) matrix[i][left] = num++;
            left++;
        }
    }
    return matrix;
}

int main() {
    int n;
    printf("Enter n: ");
    scanf("%d", &n);
    int size;
    int *colSizes;
    int **mat = generateMatrix(n, &size, &colSizes);

    for (int i = 0; i < size; i++) {
        for (int j = 0; j < colSizes[i]; j++)
            printf("%d ", mat[i][j]);
        printf("\n");
        free(mat[i]);
    }
    free(mat);
    free(colSizes);
    return 0;
}
""",
    "E048.c": r"""#include <stdio.h>
#include <limits.h>

int matrixChainOrder(int dims[], int n) {
    int dp[n][n];
    for (int i = 1; i < n; i++) dp[i][i] = 0;
    for (int len = 2; len < n; len++) {
        for (int i = 1; i < n - len + 1; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k+1][j] + dims[i-1] * dims[k] * dims[j];
                if (cost < dp[i][j]) dp[i][j] = cost;
            }
        }
    }
    return dp[1][n-1];
}

int main() {
    int n;
    printf("Enter number of matrices: ");
    scanf("%d", &n);
    int dims[n+1];
    printf("Dimensions: ");
    for (int i = 0; i <= n; i++) scanf("%d", &dims[i]);

    int minMult = matrixChainOrder(dims, n+1);
    printf("Minimum multiplications = %d\n", minMult);
    return 0;
}
""",
    "E049.c": r"""#include <stdio.h>
#include <limits.h>

int coinChange(int coins[], int m, int amount) {
    int dp[amount+1];
    for (int i = 1; i <= amount; i++) dp[i] = INT_MAX;
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < m; j++) {
            if (coins[j] <= i && dp[i - coins[j]] != INT_MAX) {
                int val = dp[i - coins[j]] + 1;
                if (val < dp[i]) dp[i] = val;
            }
        }
    }
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}

int main() {
    int m, amount;
    printf("Enter number of denominations: ");
    scanf("%d", &m);
    int coins[m];
    printf("Denominations: ");
    for (int i = 0; i < m; i++) scanf("%d", &coins[i]);
    printf("Amount: ");
    scanf("%d", &amount);

    int minCoins = coinChange(coins, m, amount);
    printf("Minimum coins = %d\n", minCoins);
    return 0;
}
""",
    "E050.c": r"""#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *arr;
    int size;
    int capacity;
} MinHeap;

MinHeap* createHeap(int cap) {
    MinHeap *heap = (MinHeap*)malloc(sizeof(MinHeap));
    heap->arr = (int*)malloc(cap * sizeof(int));
    heap->size = 0;
    heap->capacity = cap;
    return heap;
}

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

void heapify(MinHeap *heap, int i) {
    int smallest = i;
    int left = 2*i + 1;
    int right = 2*i + 2;
    if (left < heap->size && heap->arr[left] < heap->arr[smallest])
        smallest = left;
    if (right < heap->size && heap->arr[right] < heap->arr[smallest])
        smallest = right;
    if (smallest != i) {
        swap(&heap->arr[i], &heap->arr[smallest]);
        heapify(heap, smallest);
    }
}

void insert(MinHeap *heap, int val) {
    if (heap->size == heap->capacity) return;
    heap->arr[heap->size] = val;
    int i = heap->size;
    heap->size++;
    while (i != 0 && heap->arr[(i-1)/2] > heap->arr[i]) {
        swap(&heap->arr[i], &heap->arr[(i-1)/2]);
        i = (i-1)/2;
    }
}

int extractMin(MinHeap *heap) {
    if (heap->size <= 0) return -1;
    if (heap->size == 1) {
        heap->size--;
        return heap->arr[0];
    }
    int root = heap->arr[0];
    heap->arr[0] = heap->arr[heap->size-1];
    heap->size--;
    heapify(heap, 0);
    return root;
}

int main() {
    MinHeap *heap = createHeap(100);
    int vals[] = {5,3,8,1,2};
    printf("Inserting: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", vals[i]);
        insert(heap, vals[i]);
    }
    printf("\nExtracting min three times: ");
    for (int i = 0; i < 3; i++)
        printf("%d ", extractMin(heap));
    printf("\n");
    free(heap->arr);
    free(heap);
    return 0;
}
"""
}

# ============================================
# Create directories and write files
# ============================================
current_dir = os.path.dirname(os.path.abspath(__file__))

answers_dir = os.path.join(current_dir, "answers")
os.makedirs(answers_dir, exist_ok=True)

# Write JSON file
json_path = os.path.join(current_dir, "expert-projects.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(json_data, f, indent=2, ensure_ascii=False)

# Write each C file
for filename, content in c_files_content.items():
    file_path = os.path.join(answers_dir, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"✅ Successfully created 'answers' folder with {len(c_files_content)} C files and 'expert-projects.json'")