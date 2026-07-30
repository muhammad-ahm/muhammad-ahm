package com.dinorunner.toexhek;

import java.sql.*;
import java.util.ArrayList;

public class History {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/ToeXhek?useSSL=false";
    private static final String USER = "root";
    private static final String PASS = "huma./15";

    public static void loadHistory(GameData data) {
        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS)) {
            Statement stmt = conn.createStatement();
            stmt.execute("CREATE TABLE IF NOT EXISTS Games (" +
                    "game_id INT AUTO_INCREMENT PRIMARY KEY, " +
                    "secret_number INT, " +
                    "won BOOLEAN, " +
                    "start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, " +
                    "end_time TIMESTAMP" +
                    ")");
            stmt.execute("CREATE TABLE IF NOT EXISTS Guesses (" +
                    "guess_id INT AUTO_INCREMENT PRIMARY KEY, " +
                    "game_id INT, " +
                    "guess INT, " +
                    "distance INT, " +
                    "feedback VARCHAR(255), " +
                    "timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                    ")");
            stmt.execute("CREATE TABLE IF NOT EXISTS SortedLists (" +
                    "sort_id INT AUTO_INCREMENT PRIMARY KEY, " +
                    "game_id INT, " +
                    "algo VARCHAR(50), " +
                    "time_us BIGINT, " +
                    "sorted_guesses VARCHAR(1000), " +
                    "sorted_distances VARCHAR(1000)" +
                    ")");
        } catch (SQLException e) {
            System.out.println("DB init failed: " + e.getMessage());
        }
    }

    public static int createGame(int secret) {
        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS)) {
            PreparedStatement ps = conn.prepareStatement(
                    "INSERT INTO Games (secret_number) VALUES (?)",
                    Statement.RETURN_GENERATED_KEYS
            );
            ps.setInt(1, secret);
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                return rs.getInt(1);
            }
        } catch (SQLException e) {
            System.out.println("Create game failed: " + e.getMessage());
        }
        return -1;
    }

    public static void saveGuess(int gameId, int guess, int distance, String feedback) {
        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS)) {
            PreparedStatement ps = conn.prepareStatement(
                    "INSERT INTO Guesses (game_id, guess, distance, feedback) VALUES (?, ?, ?, ?)"
            );
            ps.setInt(1, gameId);
            ps.setInt(2, guess);
            ps.setInt(3, distance);
            ps.setString(4, feedback);
            ps.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Save guess failed: " + e.getMessage());
        }
    }

    public static void endGame(int gameId, boolean won) {
        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS)) {
            PreparedStatement ps = conn.prepareStatement(
                    "UPDATE Games SET won = ?, end_time = CURRENT_TIMESTAMP WHERE game_id = ?"
            );
            ps.setBoolean(1, won);
            ps.setInt(2, gameId);
            ps.executeUpdate();
        } catch (SQLException e) {
            System.out.println("End game failed: " + e.getMessage());
        }
    }

    public static void saveSorted(int gameId, String algo, long timeUs, ArrayList<Integer> sg, ArrayList<Integer> sd) {
        String sGuesses = sg.toString().replaceAll("[\\[\\] ]", "");
        String sDistances = sd.toString().replaceAll("[\\[\\] ]", "");
        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS)) {
            PreparedStatement ps = conn.prepareStatement(
                    "INSERT INTO SortedLists (game_id, algo, time_us, sorted_guesses, sorted_distances) VALUES (?, ?, ?, ?, ?)"
            );
            ps.setInt(1, gameId);
            ps.setString(2, algo);
            ps.setLong(3, timeUs);
            ps.setString(4, sGuesses);
            ps.setString(5, sDistances);
            ps.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Save sorted failed: " + e.getMessage());
        }
    }

    public static void clearHistory() {
        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS)) {
            Statement stmt = conn.createStatement();
            stmt.execute("DELETE FROM SortedLists");
            stmt.execute("DELETE FROM Guesses");
            stmt.execute("DELETE FROM Games");
        } catch (SQLException e) {
            System.out.println("Clear history failed: " + e.getMessage());
        }
    }
}