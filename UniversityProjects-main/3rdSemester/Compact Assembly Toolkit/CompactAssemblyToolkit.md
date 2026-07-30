# FINAL PROJECT PROPOSAL  
# COMPACT ASSEMBLY TOOLKIT  
### A Multi-Module Demonstration of Assembly Language Concepts

---

## 👥 Group Members
- Muhammad Ahmed (2412115)
- Muhammad Huzaifa Imran (2412118)
- Sandeep Kumar (2412128)

---

# 1. Objective / Motivation

The primary objective of this project is to design and develop a **modular, multi-feature Assembly Language Toolkit** that demonstrates fundamental concepts of low-level programming, CPU operations, memory manipulation, input/output handling, and direct system interaction.

### Motivation

This project was chosen to:

1. Understand how Assembly Language interacts directly with hardware  
2. Strengthen foundational knowledge of registers, interrupts, memory, and instruction execution  
3. Explore practical CPU-level tasks through focused modules  
4. Gain hands-on experience with system-level programming (embedded systems, OS concepts, computer architecture)  
5. Build a comprehensive project that demonstrates multiple assembly techniques rather than a single-function application  

This toolkit-based approach allows structured exploration of core concepts and presents a complete integrated system instead of isolated code snippets.

---

# 2. Project Idea

The project develops a **Compact Assembly Toolkit** consisting of five independent but interconnected modules.

The toolkit follows a **menu-driven architecture** where each module is launched from a central main controller program.

---

## 🏗 Project Architecture

- `main_menu.asm` → Main controller program  
- 5 independent modules called using `CALL`  
- Each module demonstrates a unique assembly concept  
- Control returns to the main menu after execution  

---

# MODULE 1: Keyboard Input Demonstration

## Purpose
To demonstrate how assembly interacts directly with the keyboard using BIOS interrupts.

## Functionality
- Detects key presses at a low level  
- Identifies alphabetic, numeric, function, and special keys  
- Displays how key input is processed by the system  

## Concepts Demonstrated
- BIOS keyboard interrupts  
- Register usage for input handling  
- Scan codes and ASCII interpretation  
- Backend handling of key presses at assembly level  

---

# MODULE 2: Smart Calculator

## Purpose
To perform arithmetic operations using low-level instructions and user input.

## Functionality
- Supports operations:  
  `+` `-` `*` `/` `^` `%`  
- Includes 10 common constant values  
- Modeled after a basic system calculator  
- Stores results in memory until "CA" (Clear All) is pressed  

## Concepts Demonstrated
- Arithmetic instructions  
- Floating-point handling  
- Memory storage of results  
- User input processing  
- Register-based calculations  

---

# MODULE 3: Graphics Effect Renderer

## Purpose
To demonstrate low-level video memory manipulation.

## Functionality
- Switches from text mode to VGA graphics mode  
- Draws pixels directly to VGA memory  
- Creates visual effects:
  - Color fills  
  - Gradients  
  - Flashing boxes  
- Restores normal text mode after execution  

## Concepts Demonstrated
- BIOS video interrupts  
- VGA mode switching  
- Direct video memory access  
- Pixel plotting using memory offsets  
- Register control of display settings  

---

# MODULE 4: CPU Simulator (Software-Based)

## Purpose
To simulate the working of a simple CPU and instruction cycle.

## Functionality
- Simulated registers:
  - ACC (Accumulator)
  - R1
  - PC (Program Counter)
- Stores instructions in memory  
- Supports operations:
  - LOAD
  - ADD
  - SUB
  - STORE
  - JUMP
- Displays instruction cycle steps:
  - Fetch
  - Decode
  - Execute  

## Concepts Demonstrated
- Instruction cycle simulation  
- Memory indexing  
- Flow control  
- Jump operations  
- Basic CPU architecture modeling  

---

# MODULE 5: Self-Modifying Code Demonstration

## Purpose
To demonstrate runtime modification of assembly instructions.

## Functionality
- Reads instruction from memory  
- Modifies opcode dynamically  
- Executes modified instruction  
- Displays before-and-after results  

## Concepts Demonstrated
- Code and data in shared memory space  
- Binary-level instruction modification  
- Dynamic execution flow  
- Advanced low-level programming concepts  

---

# 3. Integration of Modules

All five modules are integrated using a **menu-driven main program**.

The system:

1. Displays a text-based menu  
2. Accepts user selection  
3. Calls the selected module  
4. Returns control to the main menu after completion  

This ensures modular structure and clean execution flow.

---

# 4. Conclusion

The **Compact Assembly Toolkit** is a structured and comprehensive demonstration of assembly language programming.

It integrates:

- Keyboard input handling  
- Arithmetic computation  
- Graphics rendering  
- CPU instruction simulation  
- Self-modifying code  

By combining all five modules into a single system, the project demonstrates practical interaction with hardware, memory, and system resources at a low level.

This project fulfills course requirements while providing deeper understanding of computer organization and system-level programming through real implementation.

Its modular design, concept coverage, and practical demonstrations make it a strong and technically rich final project.

---

## 🔧 Technologies & Concepts Used

- x86 Assembly Language  
- BIOS Interrupts  
- VGA Memory Manipulation  
- Register-Level Programming  
- Low-Level Memory Control  
- Instruction Cycle Simulation  

---

## 📌 Project Type

Educational System-Level Programming Toolkit  
Menu-Driven Multi-Module Assembly Application  

---
