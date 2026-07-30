# Simple CPU Simulator in Logisim

## Overview

This project is a **Simple 8-bit CPU Simulator** built using **Logisim**.  
It implements a basic **von Neumann architecture** with a **4-bit address bus** and shared memory for instructions and data.

The CPU simulates the full instruction cycle:
- Fetch
- Decode
- Execute
- Memory access

The design is modular and uses custom sub-circuits to clearly demonstrate core computer architecture concepts.

---

## Architecture Summary

- **Data Bus:** 8-bit  
- **Address Bus:** 4-bit (supports 16 memory locations)  
- **Memory Model:** von Neumann (instructions and data share the same memory)

---

## Main Components

### Memory
- **RAM:** 16 × 8-bit  
- 4-bit address input  
- Separate input and output buses  
- Controlled using read/write signals  

### Registers
- **Instruction Register (IR)**
- **General Register 1 (GR1)**
- **General Register 2 (GR2)**
- **Memory Address Register (MAR)**
- **Memory Buffer Register (MBR)**
- **Output Register**

### ALU
Supports the following operations:
- ADD
- SUB
- AND
- OR  
Includes **carry-out** support.

### Control Unit
Split into two parts:
- **CU1:** Main control signals  
- **CU2:** Additional control signals  

Control is based on:
- **Opcode bits:** OPC0 – OPC3  
- **Step Counter:** SC0 – SC2  

This provides a **microcode-style execution sequence**.

### Display Units
- **7-segment displays** for register values  
- **LEDs** to visualize the data bus  

### Clock
- Manual clock
- Simulated clock  
Allows **step-by-step instruction execution**.

---

## Supported Operations

- Arithmetic operations (ADD, SUB)
- Logical operations (AND, OR)
- Load and Store instructions
- Control flow using opcode decoding and step counter sequencing

---

## Learning Outcomes

This project demonstrates:
- CPU datapath design
- Instruction fetch-execute cycle
- Bus control and signal gating
- Register transfer logic
- Basic ALU design
- Control unit sequencing

---

## Tools Used

- **Logisim**

---

## Notes

This CPU is designed for **educational purposes** to understand how a simple processor works internally.  
It is not optimized for performance or real-world use.
