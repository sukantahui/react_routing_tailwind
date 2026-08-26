/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 9: Dynamic Method Dispatch (DMD): How JVM Decides Which Method to Run
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

public class DynamicMethodDispatchMechanicsDemo {

    public static class CloudVM {
        public void boot() {
            System.out.println("  [BASE VM] Booting generic virtual machine instance...");
        }
    }

    public static class LinuxUbuntuVM extends CloudVM {
        @Override
        public void boot() {
            System.out.println("  [UBUNTU VM] Loading Linux Kernel 6.8 & systemd init on Barrackpore Cloud!");
        }
    }

    public static class WindowsServerVM extends CloudVM {
        @Override
        public void boot() {
            System.out.println("  [WINDOWS VM] Initializing Windows Server 2025 core kernel & services!");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: DYNAMIC METHOD DISPATCH (DMD) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        CloudVM vm; // Superclass reference variable

        System.out.println(">>> 1. Binding 'vm' reference to LinuxUbuntuVM object on Heap:");
        vm = new LinuxUbuntuVM();
        vm.boot(); // JVM looks up vtable of LinuxUbuntuVM -> calls Linux boot()

        System.out.println("\n>>> 2. Rebinding 'vm' reference to WindowsServerVM object on Heap:");
        vm = new WindowsServerVM();
        vm.boot(); // JVM looks up vtable of WindowsServerVM -> calls Windows boot()

        System.out.println("\n==========================================================================");
    }
}