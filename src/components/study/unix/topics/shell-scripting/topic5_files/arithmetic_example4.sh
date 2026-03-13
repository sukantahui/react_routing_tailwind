#!/bin/bash
# Complete Calculator Script

echo "=== Professional Arithmetic Calculator ==="
echo ""

# Function to show usage
show_usage() {
    cat << EOF
Usage: $0 [OPTIONS] [VALUES]

A professional arithmetic calculator supporting multiple methods.

Options:
  -m METHOD    Arithmetic method: paren, let, expr, dollar (default: paren)
  -o OPERATION Operation: add, sub, mul, div, mod, pow, avg, perc
  -p PRECISION Decimal precision for floating point (default: 2)
  -v           Verbose output
  -h           Show this help

Examples:
  $0 -m paren -o add 10 20 30
  $0 -o mul 5 6
  $0 -o perc 25 80

Supported methods:
  paren    : (( )) - Fastest, bash only
  let      : let command - Good for assignments
  expr     : expr command - POSIX portable
  dollar   : \$(( )) - Expression substitution
EOF
}

# Function for floating point calculations
float_calc() {
    local expression="$1"
    local scale="${2:-2}"
    
    # Use bc for floating point
    result=$(echo "scale=$scale; $expression" | bc 2>/dev/null)
    
    if [ $? -ne 0 ]; then
        echo "Error in calculation" >&2
        return 1
    fi
    
    echo "$result"
}

# Function using (( ))
calculate_paren() {
    local operation="$1"
    shift
    local numbers=("$@")
    
    case $operation in
        add)
            local sum=0
            for num in "${numbers[@]}"; do
                (( sum += num ))
            done
            echo "$sum"
            ;;
        sub)
            local result=${numbers[0]}
            for (( i=1; i<${#numbers[@]}; i++ )); do
                (( result -= numbers[i] ))
            done
            echo "$result"
            ;;
        mul)
            local product=1
            for num in "${numbers[@]}"; do
                (( product *= num ))
            done
            echo "$product"
            ;;
        div)
            if [ ${#numbers[@]} -ne 2 ]; then
                echo "Error: Division requires exactly 2 numbers" >&2
                return 1
            fi
            if [ ${numbers[1]} -eq 0 ]; then
                echo "Error: Division by zero" >&2
                return 1
            fi
            (( result = numbers[0] / numbers[1] ))
            echo "$result"
            ;;
        mod)
            if [ ${#numbers[@]} -ne 2 ]; then
                echo "Error: Modulus requires exactly 2 numbers" >&2
                return 1
            fi
            (( result = numbers[0] % numbers[1] ))
            echo "$result"
            ;;
        pow)
            if [ ${#numbers[@]} -ne 2 ]; then
                echo "Error: Power requires exactly 2 numbers" >&2
                return 1
            fi
            (( result = numbers[0] ** numbers[1] ))
            echo "$result"
            ;;
        *)
            echo "Unknown operation: $operation" >&2
            return 1
            ;;
    esac
}

# Function using let
calculate_let() {
    local operation="$1"
    shift
    local numbers=("$@")
    
    case $operation in
        add)
            local sum=0
            for num in "${numbers[@]}"; do
                let "sum += num"
            done
            echo "$sum"
            ;;
        sub)
            local result=${numbers[0]}
            for (( i=1; i<${#numbers[@]}; i++ )); do
                let "result -= numbers[i]"
            done
            echo "$result"
            ;;
        mul)
            local product=1
            for num in "${numbers[@]}"; do
                let "product *= num"
            done
            echo "$product"
            ;;
        div|mod|pow)
            if [ ${#numbers[@]} -ne 2 ]; then
                echo "Error: $operation requires exactly 2 numbers" >&2
                return 1
            fi
            
            if [ "$operation" = "div" ] && [ ${numbers[1]} -eq 0 ]; then
                echo "Error: Division by zero" >&2
                return 1
            fi
            
            local op_symbol
            case $operation in
                div) op_symbol="/" ;;
                mod) op_symbol="%" ;;
                pow) op_symbol="**" ;;
            esac
            
            let "result = numbers[0] $op_symbol numbers[1]"
            echo "$result"
            ;;
        *)
            echo "Unknown operation: $operation" >&2
            return 1
            ;;
    esac
}

# Function using expr
calculate_expr() {
    local operation="$1"
    shift
    local numbers=("$@")
    
    case $operation in
        add)
            local result=${numbers[0]}
            for (( i=1; i<${#numbers[@]}; i++ )); do
                result=$(expr $result + ${numbers[i]})
            done
            echo "$result"
            ;;
        sub)
            local result=${numbers[0]}
            for (( i=1; i<${#numbers[@]}; i++ )); do
                result=$(expr $result - ${numbers[i]})
            done
            echo "$result"
            ;;
        mul)
            local result=${numbers[0]}
            for (( i=1; i<${#numbers[@]}; i++ )); do
                result=$(expr $result \* ${numbers[i]})
            done
            echo "$result"
            ;;
        div|mod)
            if [ ${#numbers[@]} -ne 2 ]; then
                echo "Error: $operation requires exactly 2 numbers" >&2
                return 1
            fi
            
            if [ "$operation" = "div" ] && [ ${numbers[1]} -eq 0 ]; then
                echo "Error: Division by zero" >&2
                return 1
            fi
            
            local op_symbol
            case $operation in
                div) op_symbol="/" ;;
                mod) op_symbol="%" ;;
            esac
            
            result=$(expr ${numbers[0]} $op_symbol ${numbers[1]})
            echo "$result"
            ;;
        *)
            echo "expr doesn't support $operation" >&2
            return 1
            ;;
    esac
}

# Function using $(( ))
calculate_dollar() {
    local operation="$1"
    shift
    local numbers=("$@")
    
    case $operation in
        add)
            local sum=0
            for num in "${numbers[@]}"; do
                sum=$((sum + num))
            done
            echo "$sum"
            ;;
        sub)
            local result=${numbers[0]}
            for (( i=1; i<${#numbers[@]}; i++ )); do
                result=$((result - numbers[i]))
            done
            echo "$result"
            ;;
        mul)
            local product=1
            for num in "${numbers[@]}"; do
                product=$((product * num))
            done
            echo "$product"
            ;;
        div|mod|pow)
            if [ ${#numbers[@]} -ne 2 ]; then
                echo "Error: $operation requires exactly 2 numbers" >&2
                return 1
            fi
            
            if [ "$operation" = "div" ] && [ ${numbers[1]} -eq 0 ]; then
                echo "Error: Division by zero" >&2
                return 1
            fi
            
            local expression
            case $operation in
                div) expression="${numbers[0]} / ${numbers[1]}" ;;
                mod) expression="${numbers[0]} % ${numbers[1]}" ;;
                pow) expression="${numbers[0]} ** ${numbers[1]}" ;;
            esac
            
            result=$((expression))
            echo "$result"
            ;;
        *)
            echo "Unknown operation: $operation" >&2
            return 1
            ;;
    esac
}

# Function for special operations
calculate_special() {
    local operation="$1"
    local method="$2"
    shift 2
    local numbers=("$@")
    
    case $operation in
        avg)
            # Calculate sum first
            local sum
            case $method in
                paren) sum=$(calculate_paren add "${numbers[@]}") ;;
                let) sum=$(calculate_let add "${numbers[@]}") ;;
                expr) sum=$(calculate_expr add "${numbers[@]}") ;;
                dollar) sum=$(calculate_dollar add "${numbers[@]}") ;;
            esac
            
            # Then divide by count
            local count=${#numbers[@]}
            case $method in
                paren|let|dollar)
                    local avg=$((sum / count))
                    echo "$avg"
                    ;;
                expr)
                    local avg=$(expr $sum / $count)
                    echo "$avg"
                    ;;
            esac
            ;;
            
        perc)
            if [ ${#numbers[@]} -ne 2 ]; then
                echo "Error: Percentage requires exactly 2 numbers" >&2
                return 1
            fi
            
            # percentage = (value * 100) / total
            local value=${numbers[0]}
            local total=${numbers[1]}
            
            if [ $total -eq 0 ]; then
                echo "Error: Total cannot be zero" >&2
                return 1
            fi
            
            # Use floating point for percentage
            local percentage=$(float_calc "($value * 100) / $total" "$precision")
            echo "${percentage}%"
            ;;
            
        *)
            echo "Unknown special operation: $operation" >&2
            return 1
            ;;
    esac
}

# Main execution
main() {
    # Default values
    local method="paren"
    local operation="add"
    local precision=2
    local verbose=false
    
    # Parse options
    while getopts "m:o:p:vh" opt; do
        case $opt in
            m) method="$OPTARG" ;;
            o) operation="$OPTARG" ;;
            p) precision="$OPTARG" ;;
            v) verbose=true ;;
            h) show_usage; return 0 ;;
            *) show_usage; return 1 ;;
        esac
    done
    
    shift $((OPTIND - 1))
    
    # Check if we have numbers
    if [ $# -eq 0 ]; then
        echo "Error: No numbers provided" >&2
        show_usage
        return 1
    fi
    
    local numbers=("$@")
    
    # Validate method
    case $method in
        paren|let|expr|dollar) ;;
        *)
            echo "Error: Unknown method '$method'" >&2
            show_usage
            return 1
            ;;
    esac
    
    # Show verbose info
    if $verbose; then
        echo "Method: $method"
        echo "Operation: $operation"
        echo "Numbers: ${numbers[@]}"
        echo "Count: ${#numbers[@]}"
        echo ""
    fi
    
    # Perform calculation
    local result
    local start_time end_time duration
    
    # Special operations
    if [[ "$operation" == "avg" || "$operation" == "perc" ]]; then
        start_time=$(date +%s%N)
        result=$(calculate_special "$operation" "$method" "${numbers[@]}")
        end_time=$(date +%s%N)
    else
        # Regular operations
        start_time=$(date +%s%N)
        case $method in
            paren) result=$(calculate_paren "$operation" "${numbers[@]}") ;;
            let) result=$(calculate_let "$operation" "${numbers[@]}") ;;
            expr) result=$(calculate_expr "$operation" "${numbers[@]}") ;;
            dollar) result=$(calculate_dollar "$operation" "${numbers[@]}") ;;
        esac
        end_time=$(date +%s%N)
    fi
    
    duration=$(( (end_time - start_time) / 1000 ))  # microseconds
    
    # Check if calculation was successful
    if [ $? -ne 0 ]; then
        return 1
    fi
    
    # Display result
    echo ""
    echo "=== CALCULATION RESULT ==="
    echo "Method: $method"
    echo "Operation: $operation"
    echo "Input: ${numbers[@]}"
    echo "Result: $result"
    echo "Time: ${duration} microseconds"
    echo ""
    
    # Show equivalent in other methods
    if $verbose; then
        echo "=== EQUIVALENT IN OTHER METHODS ==="
        
        for alt_method in paren let expr dollar; do
            if [ "$alt_method" != "$method" ]; then
                case $alt_method in
                    paren)
                        if [[ "$operation" == "avg" || "$operation" == "perc" ]]; then
                            alt_result=$(calculate_special "$operation" "$alt_method" "${numbers[@]}" 2>/dev/null)
                        else
                            alt_result=$(calculate_paren "$operation" "${numbers[@]}" 2>/dev/null)
                        fi
                        ;;
                    let)
                        if [[ "$operation" == "avg" || "$operation" == "perc" ]]; then
                            alt_result=$(calculate_special "$operation" "$alt_method" "${numbers[@]}" 2>/dev/null)
                        else
                            alt_result=$(calculate_let "$operation" "${numbers[@]}" 2>/dev/null)
                        fi
                        ;;
                    expr)
                        if [[ "$operation" == "avg" || "$operation" == "perc" ]]; then
                            alt_result=$(calculate_special "$operation" "$alt_method" "${numbers[@]}" 2>/dev/null)
                        else
                            alt_result=$(calculate_expr "$operation" "${numbers[@]}" 2>/dev/null)
                        fi
                        ;;
                    dollar)
                        if [[ "$operation" == "avg" || "$operation" == "perc" ]]; then
                            alt_result=$(calculate_special "$operation" "$alt_method" "${numbers[@]}" 2>/dev/null)
                        else
                            alt_result=$(calculate_dollar "$operation" "${numbers[@]}" 2>/dev/null)
                        fi
                        ;;
                esac
                
                if [ $? -eq 0 ]; then
                    echo "  $alt_method: $alt_result"
                else
                    echo "  $alt_method: Not supported"
                fi
            fi
        done
    fi
    
    echo ""
    echo "=== TIPS ==="
    case $method in
        paren) echo "• (( )) is fastest but bash-specific" ;;
        let) echo "• let is good for complex assignments" ;;
        expr) echo "• expr is portable but slower" ;;
        dollar) echo "• \$(( )) is good for inline calculations" ;;
    esac
}

# Run main function
main "$@"