package com.dinorunner.toexhek;

import javax.swing.*;
import java.awt.*;

class RoundedButton extends JButton {

    private int radius = 10;

    RoundedButton(String text) {
        super(text);
        setFocusPainted(false);
        setContentAreaFilled(false);
        setOpaque(false);
        setFont(new Font("SansSerif", Font.BOLD, 18));
    }

    protected void paintComponent(Graphics g) {
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);

        g2.setColor(getBackground() != null ? getBackground() : new Color(50, 150, 255));
        g2.fillRoundRect(0, 0, getWidth(), getHeight(), radius, radius);

        super.paintComponent(g);
        g2.dispose();
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }

    public Insets getInsets() {
        return new Insets(8, 16, 8, 16);
    }
}