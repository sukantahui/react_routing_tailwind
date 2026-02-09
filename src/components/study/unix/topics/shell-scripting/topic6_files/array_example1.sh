#!/bin/bash
# Indexed Array Examples

echo "=== Indexed Arrays (Numbered Indices) ==="
echo ""

# 1. Creating indexed arrays
echo "1. Different ways to create indexed arrays:"

# Method 1: Direct assignment
fruits=("Apple" "Banana" "Cherry" "Date")
echo "  Method 1: fruits=(\"Apple\" \"Banana\" \"Cherry\" \"Date\")"
echo "  Result: ${fruits[@]}"
echo ""

# Method 2: Piecemeal assignment
colors[0]="Red"
colors[1]="Green"
colors[2]="Blue"
echo "  Method 2: colors[0]=\"Red\"; colors[1]=\"Green\"; colors[2]=\"Blue\""
echo "  Result: ${colors[@]}"
echo ""

# Method 3: Using declare (explicit but optional for indexed)
declare -a numbers=(10 20 30 40 50)
echo "  Method 3: declare -a numbers=(10 20 30 40 50)"
echo "  Result: ${numbers[@]}"
echo ""

# 2. Accessing array elements
echo "2. Accessing array elements:"
echo "  fruits array: ${fruits[@]}"
echo "  First element (index 0): ${fruits[0]}"
echo "  Second element (index 1): ${fruits[1]}"
echo "  Last element: ${fruits[-1]}"
echo "  Second to last: ${fruits[-2]}"
echo ""

# 3. Array length and indices
echo "3. Array length and indices:"
echo "  Number of elements in fruits: ${#fruits[@]}"
echo "  Indices in fruits: ${!fruits[@]}"
echo "  Length of first element: ${#fruits[0]} (Apple has ${#fruits[0]} characters)"
echo ""

# 4. Slicing arrays
echo "4. Array slicing (bash 4.0+):"
echo "  Elements 1-2: ${fruits[@]:1:2}"
echo "  All elements from index 2: ${fruits[@]:2}"
echo "  Last 2 elements: ${fruits[@]: -2}"
echo ""

# 5. Modifying arrays
echo "5. Modifying arrays:"

# Append elements
fruits+=("Elderberry" "Fig")
echo "  After append: ${fruits[@]}"

# Insert at specific index (bash 4.3+)
fruits=("${fruits[@]:0:2}" "Apricot" "${fruits[@]:2}")
echo "  After inserting at index 2: ${fruits[@]}"

# Remove element (unset)
unset 'fruits[1]'
echo "  After removing index 1: ${fruits[@]}"
echo "  Note: Index 1 is now empty, indices: ${!fruits[@]}"
echo ""

# 6. Looping through arrays
echo "6. Different ways to loop through arrays:"

echo "  Method 1: Standard for loop"
for fruit in "${fruits[@]}"; do
    echo "    - $fruit"
done
echo ""

echo "  Method 2: C-style for loop with indices"
for ((i=0; i<${#fruits[@]}; i++)); do
    echo "    Index $i: ${fruits[i]}"
done
echo ""

echo "  Method 3: Loop with indices only"
for index in "${!fruits[@]}"; do
    echo "    Index $index: ${fruits[index]}"
done
echo ""

# 7. Reading command output into array
echo "7. Reading command output into array:"
files=(*.sh)
echo "  Shell files in current directory: ${#files[@]} files"
echo "  First 3 files: ${files[@]:0:3}"
echo ""

# 8. Multi-dimensional arrays (simulated)
echo "8. Simulating multi-dimensional arrays:"
matrix[0]="1 2 3"
matrix[1]="4 5 6"
matrix[2]="7 8 9"

echo "  Matrix representation:"
for row in "${matrix[@]}"; do
    echo "    $row"
done
echo "  Element at [1,2] (row 1, col 2):"
row=(${matrix[1]})
echo "    ${row[1]}"
echo ""

# 9. Copying and comparing arrays
echo "9. Copying arrays:"
fruits_copy=("${fruits[@]}")
echo "  Original: ${fruits[@]}"
echo "  Copy: ${fruits_copy[@]}"
echo "  Are they the same? $( [[ "${fruits[*]}" == "${fruits_copy[*]}" ]] && echo "Yes" || echo "No" )"
echo ""

# 10. Sorting arrays
echo "10. Sorting arrays:"
sorted_fruits=($(printf "%s\n" "${fruits[@]}" | sort))
echo "  Original: ${fruits[@]}"
echo "  Sorted: ${sorted_fruits[@]}"
echo ""

# 11. Searching in arrays
echo "11. Searching in arrays:"
search_for="Fig"
if [[ " ${fruits[@]} " =~ " ${search_for} " ]]; then
    echo "  '$search_for' found in fruits array"
else
    echo "  '$search_for' not found"
fi
echo ""

# 12. Common pitfalls
echo "12. Common pitfalls with indexed arrays:"
echo "  Pitfall 1: Forgetting arrays start at 0"
echo "    fruits[1] is the SECOND element, not first"
echo ""
echo "  Pitfall 2: Sparse arrays after unset"
sparse=("a" "b" "c" "d")
unset 'sparse[1]'
echo "    After unset sparse[1]: ${sparse[@]}"
echo "    Indices: ${!sparse[@]} (note the gap)"
echo ""
echo "  Pitfall 3: Word splitting without quotes"
echo "    Always use: \"\${array[@]}\" not \${array[@]}"
echo ""

echo "=== When to Use Indexed Arrays ==="
echo "• When order matters (processing files in order)"
echo "• When you need to preserve sequence"
echo "• For lists where position has meaning"
echo "• When reading line-by-line from files/commands"