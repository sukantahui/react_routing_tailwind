#!/bin/bash
# echo_formatting.sh - Advanced formatting with colors and escapes

echo "=== Formatting Output ==="

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[0;37m'
NC='\033[0m' # No Color

echo -e "${RED}1. Red text${NC}"
echo -e "${GREEN}2. Green text${NC}"
echo -e "${YELLOW}3. Yellow text${NC}"
echo -e "${BLUE}4. Blue text${NC}"
echo -e "${PURPLE}5. Purple text${NC}"
echo -e "${CYAN}6. Cyan text${NC}"
echo -e "${WHITE}7. White text${NC}"

echo -e "\n8. Bold text:"
echo -e "\033[1mBold text\033[0m"

echo -e "\n9. Underlined:"
echo -e "\033[4mUnderlined text\033[0m"

echo -e "\n10. Blinking (not all terminals):"
echo -e "\033[5mBlinking text\033[0m"

echo -e "\n11. Background colors:"
echo -e "\033[41mRed background\033[0m"
echo -e "\033[42mGreen background\033[0m"
echo -e "\033[44mBlue background\033[0m"

echo -e "\n12. Combining styles:"
echo -e "\033[1;31;44mBold Red on Blue\033[0m"

echo -e "\n13. Progress bar simulation:"
for i in {1..20}; do
    echo -ne "\r["
    for ((j=1; j<=i; j++)); do echo -ne "#"; done
    for ((j=i; j<20; j++)); do echo -ne " "; done
    echo -ne "] $((i*5))%"
    sleep 0.1
done
echo -e "\nFinished!"