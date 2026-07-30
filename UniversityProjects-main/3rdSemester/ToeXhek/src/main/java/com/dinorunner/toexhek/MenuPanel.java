package com.dinorunner.toexhek;

import javax.swing.*;
import java.awt.*;

public class MenuPanel extends JPanel {
    private GameFrame frame;

    public MenuPanel(GameFrame frame) {
        this.frame = frame;
        setBackground(Color.BLACK);
        setLayout(new GridBagLayout());

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridwidth = GridBagConstraints.REMAINDER;
        gbc.insets = new Insets(40, 0, 40, 0);

        // Big GTA-style title
        JLabel title = new JLabel("TOEXHEK");
        title.setFont(new Font("Impact", Font.BOLD, 140));
        title.setForeground(new Color(200, 0, 0));  // Dark red
        title.setHorizontalAlignment(SwingConstants.CENTER);
        add(title, gbc);

        // Subtitle
        JLabel subtitle = new JLabel("DSA Sorting Adventure");
        subtitle.setFont(new Font("Arial", Font.ITALIC, 40));
        subtitle.setForeground(Color.WHITE);
        subtitle.setHorizontalAlignment(SwingConstants.CENTER);
        add(subtitle, gbc);

        // Start button (uses your existing RoundedButton)
        RoundedButton startButton = new RoundedButton("START GAME");
        startButton.setFont(new Font("Arial Black", Font.BOLD, 50));
        startButton.setBackground(new Color(40, 40, 40));
        startButton.setForeground(Color.WHITE);
        startButton.addActionListener(e -> frame.showScreen("INTRO"));
        add(startButton, gbc);

        // Exit button
        RoundedButton exitButton = new RoundedButton("EXIT");
        exitButton.setFont(new Font("Arial Black", Font.BOLD, 50));
        exitButton.setBackground(new Color(120, 0, 0));
        exitButton.setForeground(Color.WHITE);
        exitButton.addActionListener(e -> System.exit(0));
        add(exitButton, gbc);
    }
}