package com.dinorunner.toexhek;

import javax.swing.*;

public class ToeXhek {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            GameFrame frame = new GameFrame();
            frame.setVisible(true);
        });
    }
}
