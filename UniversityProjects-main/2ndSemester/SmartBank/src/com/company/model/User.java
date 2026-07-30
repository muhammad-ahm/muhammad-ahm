package model;

import com.company.exception.InvalidAgeException;
import com.company.exception.WeakPasswordException;

public class User {
    private String name;
    private String password;
    private int age;
    private com.company.model.BankAccount account;

    public User(String name, String password, int age) throws WeakPasswordException, InvalidAgeException {
        if (password.length() < 6) {
            throw new WeakPasswordException("Password must be at least 6 characters long");
        }
        if (age < 18) {
            throw new InvalidAgeException("User must be at least 18 years old");
        }
        this.name = name;
        this.password = password;
        this.age = age;
        this.account = new com.company.model.BankAccount();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) throws WeakPasswordException {
        if (password.length() < 6) {
            throw new WeakPasswordException("Password must be at least 6 characters long");
        }
        this.password = password;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) throws InvalidAgeException {
        if (age < 18) {
            throw new InvalidAgeException("User must be at least 18 years old");
        }
        this.age = age;
    }

    public com.company.model.BankAccount getAccount() {
        return account;
    }
}
