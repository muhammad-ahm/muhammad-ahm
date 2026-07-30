package com.dinorunner.toexhek;

import javax.swing.*;
import java.awt.*;

public class IntroPanel extends JPanel {
    private GameFrame frame;

    public IntroPanel(GameFrame frame) {
        this.frame = frame;
        setBackground(Color.BLACK);
        setLayout(new BorderLayout());

        JLabel introText = new JLabel("Welcome to ToeXhek...", SwingConstants.CENTER);
        introText.setFont(new Font("Serif", Font.BOLD, 60));
        introText.setForeground(Color.WHITE);
        add(introText, BorderLayout.CENTER);

        String[] messages = {
                "Welcome to ToeXhek...",
                "Player 1 sets the secret 4-digit number...",
                "Player 2 has 10 attempts to guess...",
                "Get hot/cold feedback on each guess...",
                "At the end, compare sorting algorithms...",
                "Good luck!"
        };

        final int[] step = {0};
        Timer timer = new Timer(3200, e -> {
            if (step[0] < messages.length) {
                introText.setText(messages[step[0]]);
                step[0]++;
            } else {
                ((Timer) e.getSource()).stop();
                frame.showScreen("Player1");  // Start the actual game
            }
        });
        timer.start();
    }
}