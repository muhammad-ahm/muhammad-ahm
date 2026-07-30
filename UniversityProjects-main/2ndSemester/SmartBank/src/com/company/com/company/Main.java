package com.company;

import com.company.exception.InsufficientBalanceException;
import com.company.exception.InvalidAgeException;
import com.company.exception.WeakPasswordException;
import com.company.model.User;
import model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    private static List<User> users = new ArrayList<>();
    private static User loggedInUser = null;
    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        while (true) {
            System.out.println("\n1. Create User  2. Login  3. Deposit  4. Withdraw  5. Balance  6. Exit");
            System.out.print("Choice: ");
            String input = sc.nextLine();
            if (input.equals("6")) {
                System.out.println("Goodbye!");
                break;
            }
            try {
                int choice = Integer.parseInt(input);
                switch (choice) {
                    case 1 -> createUser();
                    case 2 -> login();
                    case 3 -> deposit();
                    case 4 -> withdraw();
                    case 5 -> viewBalance();
                    default -> System.out.println("Choose 1-6");
                }
            } catch (NumberFormatException e) {
                System.out.println("Enter a number");
            }
        }
        sc.close();
    }

    private static void createUser() {
        try {
            System.out.print("Name: ");
            String name = sc.nextLine();
            if (name.trim().isEmpty()) {
                System.out.println("Name cannot be empty");
                return;
            }
            
            System.out.print("Password: ");
            String password = sc.nextLine();
            
            System.out.print("Age: ");
            int age = Integer.parseInt(sc.nextLine());
            
            model.User newUser = new model.User(name, password, age);
            users.add(newUser);
            System.out.println("User created successfully!");
            
        } catch (NumberFormatException e) {
            System.out.println("Invalid age format");
        } catch (WeakPasswordException e) {
            System.out.println("Password Error: " + e.getMessage());
        } catch (InvalidAgeException e) {
            System.out.println("Age Error: " + e.getMessage());
        }
    }

    private static void login() {
        if (loggedInUser != null) {
            System.out.println("Already logged in as " + loggedInUser.getName());
            return;
        }
        
        System.out.print("Name: ");
        String name = sc.nextLine();
        System.out.print("Password: ");
        String password = sc.nextLine();
        
        for (User user : users) {
            if (user.getName().equals(name) && user.getPassword().equals(password)) {
                loggedInUser = user;
                System.out.println("Logged in successfully!");
                return;
            }
        }
        System.out.println("Invalid credentials");
    }

    private static void deposit() {
        if (!isLoggedIn()) return;
        try {
            System.out.print("Amount: ");
            double amount = Double.parseDouble(sc.nextLine());
            loggedInUser.getAccount().deposit(amount);
            System.out.println("Deposited successfully! New balance: " + loggedInUser.getAccount().getBalance());
        } catch (NumberFormatException e) {
            System.out.println("Invalid amount format");
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    private static void withdraw() {
        if (!isLoggedIn()) return;
        try {
            System.out.print("Amount: ");
            double amount = Double.parseDouble(sc.nextLine());
            loggedInUser.getAccount().withdraw(amount);
            System.out.println("Withdrawn successfully! New balance: " + loggedInUser.getAccount().getBalance());
        } catch (NumberFormatException e) {
            System.out.println("Invalid amount format");
        } catch (InsufficientBalanceException e) {
            System.out.println("Error: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    private static void viewBalance() {
        if (!isLoggedIn()) return;
        System.out.println("Current balance: " + loggedInUser.getAccount().getBalance());
    }

    private static boolean isLoggedIn() {
        if (loggedInUser == null) {
            System.out.println("Please log in first");
            return false;
        }
        return true;
    }
}