package com.dinorunner.toexhek;

import javax.swing.*;
import java.awt.*;

public class Player1Panel extends JPanel {
    private GameFrame frame;
    private GameData data;

    public Player1Panel(GameFrame frame, GameData data) {
        this.frame = frame;
        this.data = data;

        setLayout(new GridBagLayout());
        setBackground(Color.BLACK);

        GridBagConstraints c = new GridBagConstraints();
        c.insets = new Insets(20, 20, 20, 20);
        c.fill = GridBagConstraints.HORIZONTAL;

        // Title
        JLabel title = new JLabel("PLAYER 1: SET THE SECRET CODE");
        title.setFont(new Font("Impact", Font.BOLD, 48));
        title.setForeground(new Color(200, 0, 0));
        title.setHorizontalAlignment(SwingConstants.CENTER);
        c.gridx = 0;
        c.gridy = 0;
        c.gridwidth = 2;
        add(title, c);

        // Label for input
        JLabel label = new JLabel("Secret 4-digit Number:");
        label.setFont(new Font("Arial", Font.PLAIN, 24));
        label.setForeground(Color.WHITE);
        c.gridy = 1;
        c.gridwidth = 1;
        c.gridx = 0;
        add(label, c);

        // Password field
        JPasswordField field = new JPasswordField(12);
        field.setFont(new Font("Arial", Font.BOLD, 28));
        field.setBackground(new Color(30, 30, 30));
        field.setForeground(Color.WHITE);
        field.setCaretColor(Color.WHITE);
        field.setBorder(new RoundedBorder(10));
        c.gridx = 1;
        add(field, c);

        // Submit button
        RoundedButton btn = new RoundedButton("SUBMIT SECRET");
        btn.setFont(new Font("Arial Black", Font.BOLD, 28));
        btn.setBackground(new Color(40, 40, 40));
        btn.setForeground(Color.WHITE);
        btn.setBorder(new RoundedBorder(10));
        c.gridx = 0;
        c.gridy = 2;
        c.gridwidth = 2;
        add(btn, c);

        // Action listener
        btn.addActionListener(e -> {
            char[] password = field.getPassword();
            String s = new String(password);

            if (!s.matches("\\d{4}")) {
                JOptionPane.showMessageDialog(
                        this,
                        "Enter exactly 4 digits!",
                        "Invalid Input",
                        JOptionPane.ERROR_MESSAGE
                );
                return;
            }

            int secret = Integer.parseInt(s);
            data.setSecretNumber(secret);
            int gameId = History.createGame(secret);
            data.setGameId(gameId);
            data.clearCurrentGuesses();
            frame.showScreen("Player2");
        });
    }
}