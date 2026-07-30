package com.dinorunner.toexhek;

import javax.swing.*;
import java.awt.*;

public class GameFrame extends JFrame {
    private CardLayout cardLayout = new CardLayout();
    private JPanel mainPanel = new JPanel(cardLayout);
    private GameData data = new GameData();
    private Player2Panel player2Panel;
    private EndPanel endPanel;

    public GameFrame() {
        setTitle("ToeXhek - Try Your Luck");
        setSize(1200, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        // Add this line in GameFrame constructor
        try {
            setIconImage(new ImageIcon(getClass().getResource("/icon.png")).getImage());
        } catch (Exception e) {
            // If icon not found, continue without it
        }
        setLocationRelativeTo(null);

        mainPanel.add(new Player1Panel(this, data), "Player1");
        player2Panel = new Player2Panel(this, data);
        mainPanel.add(player2Panel, "Player2");
        endPanel = new EndPanel(this, data);
        mainPanel.add(endPanel, "End");

        mainPanel.add(new MenuPanel(this), "MENU");
        mainPanel.add(new IntroPanel(this), "INTRO");

        add(mainPanel);
        cardLayout.show(mainPanel, "MENU");
        History.loadHistory(data);
    }

    public void showScreen(String name) {
        cardLayout.show(mainPanel, name);
    }

    public void newGame() {
        data.resetAll();
        player2Panel.resetUI();
        endPanel.resetUI();
        showScreen("MENU");
    }
}