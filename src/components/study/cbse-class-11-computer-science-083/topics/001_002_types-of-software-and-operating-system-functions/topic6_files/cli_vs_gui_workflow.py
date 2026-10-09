"""
CBSE Class 11 Computer Science (083) - Unit 1 Computer Systems and Organisation
Module: Types of Software, OS Architecture & Language Processors
File: cli_vs_gui_workflow.py
Topic 6: User Interfaces in Operating Systems - CLI vs GUI Paradigms

Demonstrates:
1. Command Line Interface (CLI / CUI) text-based parsing and automation scripts
2. Graphical User Interface (GUI) event-driven WIMP (Windows, Icons, Menus, Pointer) model
3. Resource overhead (RAM / GPU memory) and execution latency comparison
"""

import time

class UserInterfaceBenchmark:
    """Simulates performance and memory differences between CLI and GUI environments."""
    
    @staticmethod
    def simulate_cli_batch_task(file_count: int):
        print(f"\n--- [1. COMMAND LINE INTERFACE (CLI) BATCH WORKFLOW] ---")
        print(f"[*] Command: `mkdir backup && cp *.py backup/` across {file_count} files...")
        start_time = time.time()
        # Fast shell kernel execution with minimal memory footprint
        time.sleep(0.02)
        elapsed = (time.time() - start_time) * 1000
        print(f"[+] CLI Task completed in {elapsed:.2f} ms.")
        print("    Resource Consumption: ~4 MB RAM, 0% GPU VRAM, headless text-only pipeline.")

    @staticmethod
    def simulate_gui_window_rendering(window_count: int):
        print(f"\n--- [2. GRAPHICAL USER INTERFACE (GUI) WIMP MODEL] ---")
        print(f"[*] Initializing {window_count} window frames, rendering icons, alpha transparency, and mouse event listeners...")
        start_time = time.time()
        # Rendering graphics, compositing layers, allocating framebuffers
        time.sleep(0.12)
        elapsed = (time.time() - start_time) * 1000
        print(f"[+] GUI Window manager rendered in {elapsed:.2f} ms.")
        print(f"    Resource Consumption: ~450 MB RAM, 128 MB GPU Framebuffer VRAM.")


def main():
    print("=================================================================")
    print("  CBSE CLASS 11 CS (083) - CLI VS GUI PARADIGM BENCHMARK        ")
    print("=================================================================\n")

    # 1. CLI Batch Execution
    UserInterfaceBenchmark.simulate_cli_batch_task(file_count=500)

    # 2. GUI Window Rendering
    UserInterfaceBenchmark.simulate_gui_window_rendering(window_count=5)

if __name__ == "__main__":
    main()
