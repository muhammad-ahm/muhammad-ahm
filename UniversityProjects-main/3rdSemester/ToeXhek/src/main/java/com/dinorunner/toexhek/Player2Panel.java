package com.dinorunner.toexhek;

import javax.swing.*;
import java.awt.*;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Player2Panel extends JPanel {

    private GameFrame frame;
    private GameData data;
    private JTextArea historyArea;
    private JLabel attemptsLabel;
    private JTextField guessField;

    private static final int MAX_ATTEMPTS = 10;

    public Player2Panel(GameFrame frame, GameData data) {
        this.frame = frame;
        this.data = data;

        setLayout(new GridBagLayout());
        setBackground(Color.BLACK);

        GridBagConstraints c = new GridBagConstraints();
        c.insets = new Insets(20, 20, 20, 20);
        c.fill = GridBagConstraints.HORIZONTAL;

        // Title
        JLabel title = new JLabel("PLAYER 2: CRACK THE CODE");
        title.setFont(new Font("Impact", Font.BOLD, 52));
        title.setForeground(new Color(200, 0, 0));
        title.setHorizontalAlignment(SwingConstants.CENTER);
        c.gridx = 0; c.gridy = 0; c.gridwidth = GridBagConstraints.REMAINDER;
        add(title, c);

        // Attempts left
        attemptsLabel = new JLabel("Attempts left: " + MAX_ATTEMPTS);
        attemptsLabel.setFont(new Font("Arial Black", Font.BOLD, 28));
        attemptsLabel.setForeground(Color.CYAN);
        attemptsLabel.setHorizontalAlignment(SwingConstants.CENTER);
        c.gridy = 1; c.gridwidth = GridBagConstraints.REMAINDER;
        add(attemptsLabel, c);

        // Guess input label
        JLabel guessLabel = new JLabel("Your Guess:");
        guessLabel.setFont(new Font("Arial", Font.PLAIN, 24));
        guessLabel.setForeground(Color.WHITE);
        c.gridy = 2; c.gridwidth = 1;
        c.anchor = GridBagConstraints.EAST;
        add(guessLabel, c);

        // Guess field
        guessField = new JTextField(12);
        guessField.setFont(new Font("Arial", Font.BOLD, 28));
        guessField.setBackground(new Color(30, 30, 30));
        guessField.setForeground(Color.WHITE);
        guessField.setCaretColor(Color.WHITE);
        guessField.setBorder(new RoundedBorder(10));
        c.gridx = 1; c.anchor = GridBagConstraints.WEST;
        add(guessField, c);

        // History area
        historyArea = new JTextArea(14, 50);
        historyArea.setEditable(false);
        historyArea.setBackground(Color.BLACK);
        historyArea.setForeground(Color.CYAN);
        historyArea.setFont(new Font("Monospaced", Font.PLAIN, 18));
        historyArea.setCaretColor(Color.CYAN);
        JScrollPane scroll = new JScrollPane(historyArea);
        scroll.setBorder(new RoundedBorder(10));
        c.gridx = 0; c.gridy = 3; c.gridwidth = GridBagConstraints.REMAINDER;
        c.fill = GridBagConstraints.BOTH; c.weightx = 1.0; c.weighty = 1.0;
        add(scroll, c);

        // Submit button
        RoundedButton submitBtn = new RoundedButton("SUBMIT GUESS");
        submitBtn.setFont(new Font("Arial Black", Font.BOLD, 28));
        submitBtn.setBackground(new Color(40, 40, 40));
        submitBtn.setForeground(Color.WHITE);
        submitBtn.setBorder(new RoundedBorder(10));
        c.gridy = 4; c.fill = GridBagConstraints.NONE; c.weighty = 0;
        c.anchor = GridBagConstraints.CENTER;
        add(submitBtn, c);

        // Submit button action listener (fully working)
        submitBtn.addActionListener(e -> {
            String input = guessField.getText().trim();

            if (!input.matches("\\d{4}")) {
                JOptionPane.showMessageDialog(this, "Enter exactly 4 digits!", "Invalid Input", JOptionPane.ERROR_MESSAGE);
                return;
            }

            int guess = Integer.parseInt(input);

            if (data.isDuplicate(guess)) {
                JOptionPane.showMessageDialog(this, "You already guessed this number!", "Duplicate", JOptionPane.WARNING_MESSAGE);
                return;
            }

            int distance = Math.abs(guess - data.getSecretNumber());
            String feedback = guess == data.getSecretNumber()
                    ? "Correct! Brilliant!!"
                    : distance <= 50 ? "Near of it!! Come Closer 😉"
                    : distance <= 100 ? "High! or Low! But Near!!"
                    : distance <= 250 ? "Not Too Far!!"
                    : "Far Enough!! 🤔";

            String timestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
            String line = String.format("%04d | Distance: %04d | %s | %s", guess, distance, feedback, timestamp);

            data.addGuess(guess, distance, line);
            History.saveGuess(data.getGameId(), guess, distance, feedback);

            // Append to history
            historyArea.append("Guess: " + String.format("%04d", guess) + " → " + feedback + "\n");

            // Update attempts
            int left = MAX_ATTEMPTS - data.guessCount();
            attemptsLabel.setText("Attempts left: " + Math.max(0, left));

            // Check win/lose
            boolean won = (guess == data.getSecretNumber());
            if (won || left <= 0) {
                History.endGame(data.getGameId(), won);
                frame.showScreen("End");
            }

            // Clear field and request focus
            guessField.setText("");
            guessField.requestFocus();
        });
    }

    public void resetUI() {
        historyArea.setText("");
        attemptsLabel.setText("Attempts left: " + MAX_ATTEMPTS);
        guessField.setText("");
    }
}