package com.dinorunner.toexhek;

import java.util.ArrayList;

public class GameData {
    private int secretNumber = 0;
    private int gameId = -1;
    private ArrayList<Integer> currentGuesses = new ArrayList<>();
    private ArrayList<Integer> currentDistances = new ArrayList<>();
    private ArrayList<String> historyLines = new ArrayList<>();

    public void setSecretNumber(int num) { secretNumber = num; }
    public int getSecretNumber() { return secretNumber; }

    public void setGameId(int id) { gameId = id; }
    public int getGameId() { return gameId; }

    public void addGuess(int guess, int distance, String hist) {
        currentGuesses.add(guess);
        currentDistances.add(distance);
        historyLines.add(hist);
    }

    public boolean isDuplicate(int guess) {
        return currentGuesses.contains(guess);
    }

    public ArrayList<Integer> getGuessesCopy() { return new ArrayList<>(currentGuesses); }
    public ArrayList<Integer> getDistancesCopy() { return new ArrayList<>(currentDistances); }

    public void clearCurrentGuesses() {
        currentGuesses.clear();
        currentDistances.clear();
        historyLines.clear();
    }

    public ArrayList<String> getHistoryLines() { return historyLines; }
    public void setHistoryLines(ArrayList<String> lines) { this.historyLines = lines; }
    public int guessCount() { return currentGuesses.size(); }

    public void resetAll() {
        secretNumber = 0;
        gameId = -1;
        clearCurrentGuesses();
    }
}