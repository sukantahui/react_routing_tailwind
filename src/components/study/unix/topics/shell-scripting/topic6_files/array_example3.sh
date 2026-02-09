#!/bin/bash
# Array Operations Examples

echo "=== Common Array Operations ==="
echo ""

# 1. Creating arrays from different sources
echo "1. Creating arrays from different sources:"

# From string
echo "  From string:"
string="apple,banana,cherry,date"
IFS=',' read -ra fruits_from_string <<< "$string"
echo "    String: $string"
echo "    Array: ${fruits_from_string[@]}"
echo ""

# From command output
echo "  From command output (ls):"
files_array=($(ls -1 | head -5))
echo "    First 5 files: ${files_array[@]}"
echo ""

# From file lines
echo "  From file lines:"
cat > /tmp/test_array.txt << EOF
Line 1
Line 2
Line 3
Line 4
EOF
mapfile -t lines_array < /tmp/test_array.txt
echo "    Lines from file: ${#lines_array[@]} lines"
echo "    First line: ${lines_array[0]}"
echo ""

# 2. Array concatenation
echo "2. Array concatenation:"
array1=("A" "B" "C")
array2=("D" "E" "F")
array3=("${array1[@]}" "${array2[@]}")
echo "  array1: ${array1[@]}"
echo "  array2: ${array2[@]}"
echo "  Concatenated: ${array3[@]}"
echo ""

# 3. Array slicing
echo "3. Array slicing:"
numbers=(0 1 2 3 4 5 6 7 8 9)
echo "  Original: ${numbers[@]}"
echo "  Slice 2-5: ${numbers[@]:2:4}"
echo "  Slice from 5 to end: ${numbers[@]:5}"
echo "  Last 3 elements: ${numbers[@]: -3}"
echo ""

# 4. Searching in arrays
echo "4. Searching in arrays:"
search_array=("apple" "banana" "cherry" "date" "elderberry")
search_for="cherry"

echo "  Array: ${search_array[@]}"
echo "  Searching for: '$search_for'"

# Method 1: Using regex
if [[ " ${search_array[@]} " =~ " ${search_for} " ]]; then
    echo "  Found using regex"
fi

# Method 2: Loop and check
found=false
for element in "${search_array[@]}"; do
    if [[ "$element" == "$search_for" ]]; then
        found=true
        break
    fi
done
[[ $found == true ]] && echo "  Found using loop" || echo "  Not found"
echo ""

# 5. Removing duplicates
echo "5. Removing duplicates:"
duplicate_array=("apple" "banana" "apple" "cherry" "banana" "date")
echo "  With duplicates: ${duplicate_array[@]}"

declare -A seen
unique_array=()
for element in "${duplicate_array[@]}"; do
    if [[ ! -v seen["$element"] ]]; then
        unique_array+=("$element")
        seen["$element"]=1
    fi
done
echo "  Without duplicates: ${unique_array[@]}"
echo ""

# 6. Sorting arrays
echo "6. Sorting arrays:"
unsorted=("zebra" "apple" "mango" "banana" "cherry")
echo "  Unsorted: ${unsorted[@]}"

# Ascending sort
sorted_asc=($(printf "%s\n" "${unsorted[@]}" | sort))
echo "  Ascending: ${sorted_asc[@]}"

# Descending sort
sorted_desc=($(printf "%s\n" "${unsorted[@]}" | sort -r))
echo "  Descending: ${sorted_desc[@]}"
echo ""

# 7. Reversing arrays
echo "7. Reversing arrays:"
original=("A" "B" "C" "D" "E")
echo "  Original: ${original[@]}"

reversed=()
for ((i=${#original[@]}-1; i>=0; i--)); do
    reversed+=("${original[i]}")
done
echo "  Reversed: ${reversed[@]}"
echo ""

# 8. Array comparison
echo "8. Array comparison:"
array_a=("A" "B" "C")
array_b=("A" "B" "C")
array_c=("A" "B" "D")

echo "  array_a: ${array_a[@]}"
echo "  array_b: ${array_b[@]}"
echo "  array_c: ${array_c[@]}"

# Compare as strings
if [[ "${array_a[*]}" == "${array_b[*]}" ]]; then
    echo "  array_a equals array_b"
else
    echo "  array_a not equal to array_b"
fi

if [[ "${array_a[*]}" == "${array_c[*]}" ]]; then
    echo "  array_a equals array_c"
else
    echo "  array_a not equal to array_c"
fi
echo ""

# 9. Array intersection
echo "9. Array intersection:"
array1=("A" "B" "C" "D" "E")
array2=("C" "D" "E" "F" "G")

declare -A count
intersection=()

# Count occurrences in first array
for element in "${array1[@]}"; do
    count["$element"]=1
done

# Check second array
for element in "${array2[@]}"; do
    if [[ ${count["$element"]} -eq 1 ]]; then
        intersection+=("$element")
        count["$element"]=2
    fi
done

echo "  Array1: ${array1[@]}"
echo "  Array2: ${array2[@]}"
echo "  Intersection: ${intersection[@]}"
echo ""

# 10. Array union
echo "10. Array union:"
declare -A union_map
union=()

for element in "${array1[@]}" "${array2[@]}"; do
    if [[ ! -v union_map["$element"] ]]; then
        union+=("$element")
        union_map["$element"]=1
    fi
done

echo "  Array1: ${array1[@]}"
echo "  Array2: ${array2[@]}"
echo "  Union: ${union[@]}"
echo ""

# 11. Array difference
echo "11. Array difference (elements in array1 but not in array2):"
declare -A array2_map
difference=()

# Create map of array2
for element in "${array2[@]}"; do
    array2_map["$element"]=1
done

# Check array1 against map
for element in "${array1[@]}"; do
    if [[ ! -v array2_map["$element"] ]]; then
        difference+=("$element")
    fi
done

echo "  Array1: ${array1[@]}"
echo "  Array2: ${array2[@]}"
echo "  Difference (A - B): ${difference[@]}"
echo ""

# 12. Transforming arrays
echo "12. Transforming arrays:"
numbers=(1 2 3 4 5)
echo "  Original numbers: ${numbers[@]}"

# Square each number
squares=()
for num in "${numbers[@]}"; do
    squares+=($((num * num)))
done
echo "  Squares: ${squares[@]}"

# Convert to uppercase
words=("apple" "banana" "cherry")
uppercase_words=()
for word in "${words[@]}"; do
    uppercase_words+=("${word^^}")
done
echo "  Uppercase: ${uppercase_words[@]}"
echo ""

# 13. Filtering arrays
echo "13. Filtering arrays:"
mixed_numbers=(1 2 3 4 5 6 7 8 9 10)
even_numbers=()

for num in "${mixed_numbers[@]}"; do
    if (( num % 2 == 0 )); then
        even_numbers+=("$num")
    fi
done

echo "  All numbers: ${mixed_numbers[@]}"
echo "  Even numbers only: ${even_numbers[@]}"
echo ""

# 14. Chunking arrays
echo "14. Chunking arrays (split into smaller arrays):"
big_array=(1 2 3 4 5 6 7 8 9 10 11 12)
chunk_size=3
chunks=()

for ((i=0; i<${#big_array[@]}; i+=chunk_size)); do
    chunks+=("${big_array[@]:i:chunk_size}")
done

echo "  Big array: ${big_array[@]}"
echo "  Chunk size: $chunk_size"
echo "  Chunks:"
for ((i=0; i<${#chunks[@]}; i++)); do
    echo "    Chunk $((i+1)): ${chunks[i]}"
done
echo ""

# 15. Joining arrays
echo "15. Joining arrays into strings:"
array_to_join=("apple" "banana" "cherry")

# Join with comma
joined_comma=$(IFS=,; echo "${array_to_join[*]}")
echo "  Joined with comma: $joined_comma"

# Join with newline
joined_newline=$(printf "%s\n" "${array_to_join[@]}")
echo "  Joined with newline:"
echo "$joined_newline"

# Join with custom separator
function join_by {
    local IFS="$1"
    shift
    echo "$*"
}
joined_custom=$(join_by ' - ' "${array_to_join[@]}")
echo "  Joined with ' - ': $joined_custom"
echo ""

echo "=== Array Operations Summary ==="
echo "• Use mapfile for reading files into arrays"
echo "• Use parameter expansion for slicing: \${array[@]:start:length}"
echo "• Use associative arrays for efficient lookups and counting"
echo "• Always quote array expansions: \"\${array[@]}\""
echo "• Consider performance for large arrays (use external tools)"