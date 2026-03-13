#!/bin/bash
# Nested case statements for multi-level menu
main_menu() {
    echo "=== Naihati Database Management ==="
    echo "1. User Management"
    echo "2. Database Operations"
    echo "3. Backup & Recovery"
    echo "4. Exit"
    read -p "Select main category: " main_choice
    
    case "$main_choice" in
        1)
            echo "=== User Management ==="
            echo "1. Add user"
            echo "2. Delete user"
            echo "3. List users"
            echo "4. Back to main"
            read -p "Select option: " user_choice
            
            case "$user_choice" in
                1)
                    read -p "Enter username: " username
                    echo "Adding user: $username"
                    # Add user logic
                    ;;
                2)
                    read -p "Enter username to delete: " username
                    echo "Deleting user: $username"
                    # Delete user logic
                    ;;
                3)
                    echo "Listing all users..."
                    # List users logic
                    ;;
                4)
                    main_menu
                    ;;
                *)
                    echo "Invalid user management option"
                    ;;
            esac
            ;;
        2)
            echo "=== Database Operations ==="
            echo "1. Create database"
            echo "2. Drop database"
            echo "3. List databases"
            read -p "Select option: " db_choice
            
            case "$db_choice" in
                1)
                    read -p "Enter database name: " dbname
                    echo "Creating database: $dbname"
                    ;;
                2)
                    read -p "Enter database name to drop: " dbname
                    echo "Dropping database: $dbname"
                    ;;
                3)
                    echo "Listing databases..."
                    ;;
                *)
                    echo "Invalid database option"
                    ;;
            esac
            ;;
        3)
            echo "=== Backup & Recovery ==="
            echo "1. Create backup"
            echo "2. Restore from backup"
            echo "3. Schedule backup"
            read -p "Select option: " backup_choice
            # Backup case logic would go here
            ;;
        4)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo "Invalid main menu option"
            main_menu
            ;;
    esac
}

# Start the menu system
main_menu