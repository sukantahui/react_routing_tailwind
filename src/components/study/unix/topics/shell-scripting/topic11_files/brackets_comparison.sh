# topic11_files/brackets_comparison.sh
#!/bin/bash
# [ ] vs [[ ]] comparison

echo "=== [ ] (test) vs [[ ]] (bash extended) ==="

name="file.txt"
pattern="*.txt"
empty=""
spaced="hello world"

echo -e "\n1. Variable expansion (spaces):"
echo "   With [ ]:"
if [ $spaced = "hello world" ]; then
    echo "   [ ]: Strings are equal"
else
    echo "   [ ]: ERROR - needs quotes!"
fi

if [ "$spaced" = "hello world" ]; then
    echo "   [ ] with quotes: Strings are equal"
fi

echo "   With [[ ]]:"
if [[ $spaced = "hello world" ]]; then
    echo "   [[ ]]: Strings are equal (auto-quoting)"
fi

echo -e "\n2. Pattern matching:"
echo "   With [ ]:"
if [ "$name" = "*.txt" ]; then
    echo "   [ ]: Matches literally"
else
    echo "   [ ]: No match (literal comparison)"
fi

echo "   With [[ ]]:"
if [[ $name == *.txt ]]; then
    echo "   [[ ]]: Pattern matches!"
fi

echo -e "\n3. Regex matching ([[ ]] only):"
email="user@example.com"
if [[ $email =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
    echo "   [[ ]]: Valid email format"
fi

echo -e "\n4. Logical operators:"
x=10
y=20
echo "   With [ ]:"
if [ $x -lt 15 -a $y -gt 15 ]; then
    echo "   [ ]: Both conditions true with -a"
fi

if [ $x -lt 15 ] && [ $y -gt 15 ]; then
    echo "   [ ]: Both conditions true with &&"
fi

echo "   With [[ ]]:"
if [[ $x -lt 15 && $y -gt 15 ]]; then
    echo "   [[ ]]: Both conditions true with &&"
fi

echo -e "\n5. String comparison operators:"
str1="apple"
str2="banana"
echo "   With [[ ]]:"
if [[ $str1 < $str2 ]]; then
    echo "   [[ ]]: $str1 comes before $str2"
fi

echo -e "\n6. No word splitting in [[ ]]:"
files="file1 file2 file3"
if [[ $files == "file1 file2 file3" ]]; then
    echo "   [[ ]]: No word splitting issues"
fi

echo -e "\n7. Parentheses in conditions:"
num=15
if [[ $num -gt 10 && ($num -lt 20 || $num -eq 15) ]]; then
    echo "   [[ ]]: Complex logic works"
fi

echo -e "\n=== Recommendations ==="
echo "1. Use [ ] for POSIX compatibility"
echo "2. Use [[ ]] for bash scripts (better features)"
echo "3. Always quote variables in [ ]"
echo "4. [[ ]] handles empty variables better"