# ToeXhek - DSA Sorting Adventure Game

**ToeXhek** is a fun two-player number guessing game built in Java with Swing GUI.  
After the game, your guesses are sorted using five classic sorting algorithms — and you can compare their execution times!

## Gameplay

- **Player 1** sets a secret **4-digit number** (0000–9999)
- **Player 2** has **10 attempts** to guess it
- Feedback after each guess based on absolute difference (distance):
  - Exact match → **Correct! Brilliant!!**
  - Very close → **Near of it!! Come Closer 😉**
  - Moderately close → **High! or Low! But Near!!**
  - Far → **Far Enough!! 🤔**
- No duplicate guesses allowed

At the end:
- See win/loss result + secret number (if lost)
- Sort guesses by **distance** (farthest → closest)
- Compare real sorting times (in microseconds) for:
  - Bubble Sort
  - Insertion Sort
  - Selection Sort
  - Merge Sort
  - Quick Sort

## Features

- GTA-style dark theme with rounded buttons
- Intro sequence
- Persistent game history in **MySQL**
- Option to clear all history
- Clean CardLayout-based UI

## Technologies

- **Java 17+**
- **Swing** (GUI)
- **MySQL** + JDBC
- **Maven**
- **JUnit 5** (testing)

## Prerequisites

- Java JDK 17 or higher
- Maven (wrapper included)
- MySQL Server 8.0+ running locally (port 3306)

## Setup

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd ToeXhek

   com.dinorunner.toexhek
├── ToeXhek.java              # Main entry
├── GameFrame.java            # Screen manager (CardLayout)
├── panels/
│   ├── MenuPanel.java
│   ├── IntroPanel.java
│   ├── Player1Panel.java
│   ├── Player2Panel.java
│   └── EndPanel.java
├── GameData.java
├── History.java              # Database operations
├── sorting/
│   ├── BubbleSort.java
│   ├── InsertionSort.java
│   ├── SelectionSort.java
│   ├── MergeSort.java
│   ├── QuickSort.java
│   └── Sorter.java
└── ui/
    ├── RoundedButton.java
    └── RoundedBorder.java
