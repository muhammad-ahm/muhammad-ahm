package com.dinorunner.toexhek;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.util.ArrayList;

public class EndPanel extends JPanel {

    private GameFrame frame;
    private GameData data;
    private JTextArea resultArea;
    private JLabel resultLabel;

    public EndPanel(GameFrame frame, GameData data) {
        this.frame = frame;
        this.data = data;

        setLayout(new GridBagLayout());
        setBackground(Color.BLACK);

        GridBagConstraints c = new GridBagConstraints();
        c.insets = new Insets(20, 20, 20, 20);
        c.fill = GridBagConstraints.HORIZONTAL;

        resultLabel = new JLabel();
        resultLabel.setFont(new Font("Impact", Font.BOLD, 52));
        resultLabel.setHorizontalAlignment(SwingConstants.CENTER);
        resultLabel.setForeground(Color.WHITE); // will be updated in updateResultLabel()
        c.gridx = 0; c.gridy = 0; c.gridwidth = GridBagConstraints.REMAINDER;
        add(resultLabel, c);

        JLabel label = new JLabel("Sort guesses by distance (Worst first):");
        label.setFont(new Font("Arial", Font.PLAIN, 22));
        label.setForeground(Color.WHITE);
        label.setHorizontalAlignment(SwingConstants.CENTER);
        c.gridy = 1; c.gridwidth = GridBagConstraints.REMAINDER;
        add(label, c);

        String[] algos = {"Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort", "Quick Sort"};
        JComboBox<String> combo = new JComboBox<>(algos);
        combo.setFont(new Font("Arial", Font.PLAIN, 20));
        combo.setBackground(new Color(40, 40, 40));
        combo.setForeground(Color.WHITE);
        combo.setBorder(new RoundedBorder(10));
        c.gridy = 2; c.gridwidth = GridBagConstraints.REMAINDER;
        c.fill = GridBagConstraints.NONE;
        c.anchor = GridBagConstraints.CENTER;
        add(combo, c);

        RoundedButton sortBtn = new RoundedButton("Sort & Show Time");
        sortBtn.setFont(new Font("Arial Black", Font.BOLD, 24));
        sortBtn.setBackground(new Color(40, 40, 40));
        sortBtn.setForeground(Color.WHITE);
        sortBtn.setBorder(new RoundedBorder(10));
        c.gridy = 3; c.gridwidth = GridBagConstraints.REMAINDER;
        c.fill = GridBagConstraints.NONE;
        c.anchor = GridBagConstraints.CENTER;
        add(sortBtn, c);

        resultArea = new JTextArea(16, 50);
        resultArea.setEditable(false);
        resultArea.setBackground(Color.BLACK);
        resultArea.setForeground(Color.GREEN);
        resultArea.setFont(new Font("Monospaced", Font.PLAIN, 16));
        resultArea.setCaretColor(Color.GREEN);
        JScrollPane scroll = new JScrollPane(resultArea);
        scroll.setBorder(new RoundedBorder(10));
        c.gridy = 4; c.gridwidth = GridBagConstraints.REMAINDER;
        c.fill = GridBagConstraints.BOTH; c.weightx = 1.0; c.weighty = 1.0;
        add(scroll, c);

        RoundedButton newBtn = new RoundedButton("New Game");
        newBtn.setFont(new Font("Arial Black", Font.BOLD, 24));
        newBtn.setBackground(new Color(40, 40, 40));
        newBtn.setForeground(Color.WHITE);
        newBtn.setBorder(new RoundedBorder(10));
        c.gridy = 5; c.gridwidth = GridBagConstraints.REMAINDER;
        c.fill = GridBagConstraints.NONE; c.weighty = 0;
        c.anchor = GridBagConstraints.CENTER;
        add(newBtn, c);

        RoundedButton clearBtn = new RoundedButton("Clear All History");
        clearBtn.setFont(new Font("Arial Black", Font.BOLD, 24));
        clearBtn.setBackground(new Color(120, 0, 0));
        clearBtn.setForeground(Color.WHITE);
        clearBtn.setBorder(new RoundedBorder(10));
        c.gridy = 6; c.gridwidth = GridBagConstraints.REMAINDER;
        c.anchor = GridBagConstraints.CENTER;
        add(clearBtn, c);

        addComponentListener(new ComponentAdapter() {
            @Override
            public void componentShown(ComponentEvent e) {
                updateResultLabel();
            }
        });

        sortBtn.addActionListener(e -> {
            try {
                ArrayList<Integer> guesses = data.getGuessesCopy();
                ArrayList<Integer> distances = data.getDistancesCopy();

                String algo = (String) combo.getSelectedItem();
                long start = System.nanoTime();

                Sorter.sortDescending(guesses, distances, algo);

                long timeUs = (System.nanoTime() - start) / 1_000;

                History.saveSorted(data.getGameId(), algo, timeUs, guesses, distances);

                resultArea.setText("\"" + algo + "\"\n");
                resultArea.append("Time: " + timeUs + " μs (microseconds)\n\n");

                for (int i = 0; i < guesses.size(); i++) {
                    int g = guesses.get(i);
                    int d = distances.get(i);
                    String fb = g == data.getSecretNumber() ? "Correct! Brilliant!!"
                            : d <= 50 ? "Near of it!! Come Closer 😉"
                            : d <= 100 ? "High! or Low! But Near!!"
                            : d <= 150 ? "Not Too Far!!"
                            : "Far Enough!! 🤔";
                    resultArea.append(String.format("Guess: %04d | Distance: %04d | %s%n", g, d, fb));
                }
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Sorting failed: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        newBtn.addActionListener(e -> frame.newGame());

        clearBtn.addActionListener(e -> {
            if (JOptionPane.showConfirmDialog(this, "Delete all history?", "Confirm", JOptionPane.YES_NO_OPTION) == JOptionPane.YES_OPTION) {
                History.clearHistory();
                JOptionPane.showMessageDialog(this, "History cleared!");
            }
        });
    }

    private void updateResultLabel() {
        boolean won = data.guessCount() > 0 &&
                data.getGuessesCopy().get(data.guessCount() - 1) == data.getSecretNumber();
        resultLabel.setText(won ? "PLAYER 2 WINS!" : "PLAYER 2 LOSES! Secret: " + data.getSecretNumber());
        resultLabel.setForeground(won ? Color.GREEN : new Color(200, 0, 0));
    }

    public void resetUI() {
        resultArea.setText("");
    }
}