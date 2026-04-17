// GameCharacterSystem.java
// RPG character system with unique attack behaviors

import java.util.Random;

// Abstract character class
abstract class GameCharacter {
    protected String name;
    protected int health;
    protected int mana;
    protected int level;
    protected Random random = new Random();
    
    public GameCharacter(String name, int level) {
        this.name = name;
        this.level = level;
        this.health = 100 + level * 10;
        this.mana = 50 + level * 5;
    }
    
    // Concrete methods - shared behavior
    public void takeDamage(int damage) {
        health -= damage;
        if (health < 0) health = 0;
        System.out.println(name + " took " + damage + " damage! Health: " + health);
    }
    
    public void heal(int amount) {
        health += amount;
        System.out.println(name + " healed " + amount + " HP! Health: " + health);
    }
    
    public boolean isAlive() {
        return health > 0;
    }
    
    // Template method - defines the turn structure
    public final void takeTurn(GameCharacter target) {
        System.out.println("\n--- " + name + "'s turn ---");
        if (mana >= getSpecialCost()) {
            specialAbility(target);
            mana -= getSpecialCost();
        } else {
            attack(target);
        }
        regenerateMana();
    }
    
    // Abstract methods
    public abstract void attack(GameCharacter target);
    public abstract void specialAbility(GameCharacter target);
    protected abstract int getSpecialCost();
    protected abstract void regenerateMana();
    
    // Concrete display method
    public void displayStats() {
        System.out.println(name + " [Level " + level + "]");
        System.out.println("  HP: " + health + "/" + (100 + level * 10));
        System.out.println("  MP: " + mana + "/" + (50 + level * 5));
    }
}

// Warrior class
class Warrior extends GameCharacter {
    private int rage = 0;
    
    public Warrior(String name, int level) {
        super(name, level);
    }
    
    @Override
    public void attack(GameCharacter target) {
        int damage = 15 + level * 2;
        System.out.println(name + " swings a sword! Deals " + damage + " damage.");
        target.takeDamage(damage);
        rage += 5;
    }
    
    @Override
    public void specialAbility(GameCharacter target) {
        int damage = 30 + level * 3;
        System.out.println(name + " uses BERSERKER SLAM! Deals " + damage + " damage.");
        target.takeDamage(damage);
        rage = 0;
    }
    
    @Override
    protected int getSpecialCost() {
        return 20;
    }
    
    @Override
    protected void regenerateMana() {
        mana += 5;
        if (mana > 50 + level * 5) mana = 50 + level * 5;
    }
}

// Mage class
class Mage extends GameCharacter {
    public Mage(String name, int level) {
        super(name, level);
    }
    
    @Override
    public void attack(GameCharacter target) {
        int damage = 8 + level;
        System.out.println(name + " casts Magic Missile! Deals " + damage + " damage.");
        target.takeDamage(damage);
    }
    
    @Override
    public void specialAbility(GameCharacter target) {
        int damage = 40 + level * 4;
        System.out.println(name + " casts FIREBALL! Deals " + damage + " damage.");
        target.takeDamage(damage);
    }
    
    @Override
    protected int getSpecialCost() {
        return 30;
    }
    
    @Override
    protected void regenerateMana() {
        mana += 10;
        if (mana > 50 + level * 5) mana = 50 + level * 5;
    }
}

// Archer class
class Archer extends GameCharacter {
    private int arrows = 20;
    
    public Archer(String name, int level) {
        super(name, level);
    }
    
    @Override
    public void attack(GameCharacter target) {
        if (arrows > 0) {
            int damage = 12 + level * 2;
            System.out.println(name + " shoots an arrow! Deals " + damage + " damage.");
            target.takeDamage(damage);
            arrows--;
        } else {
            System.out.println(name + " has no arrows! Uses dagger for 5 damage.");
            target.takeDamage(5);
        }
    }
    
    @Override
    public void specialAbility(GameCharacter target) {
        int damage = 25 + level * 2;
        System.out.println(name + " uses MULTI-SHOT! Deals " + damage + " damage.");
        target.takeDamage(damage);
        arrows = Math.min(arrows + 10, 30);
    }
    
    @Override
    protected int getSpecialCost() {
        return 15;
    }
    
    @Override
    protected void regenerateMana() {
        mana += 3;
        if (mana > 50 + level * 5) mana = 50 + level * 5;
    }
}

public class GameCharacterSystem {
    public static void main(String[] args) {
        System.out.println("=== RPG BATTLE SIMULATION ===\n");
        
        GameCharacter warrior = new Warrior("Conan", 5);
        GameCharacter mage = new Mage("Merlin", 5);
        GameCharacter archer = new Archer("Legolas", 5);
        
        warrior.displayStats();
        mage.displayStats();
        archer.displayStats();
        
        System.out.println("\n=== BATTLE BEGINS ===");
        
        // Simulate a few turns
        warrior.takeTurn(mage);
        mage.takeTurn(warrior);
        archer.takeTurn(mage);
        mage.takeTurn(archer);
        warrior.takeTurn(archer);
        
        System.out.println("\n=== FINAL STATS ===");
        warrior.displayStats();
        mage.displayStats();
        archer.displayStats();
    }
}