package com.dinorunner.toexhek;

import java.util.ArrayList;

public class InsertionSort {
    public static void InsertionSort(ArrayList<Integer> g, ArrayList<Integer> d) {
        for (int i = 1; i < d.size(); i++) {
            int keyD = d.get(i);
            int keyG = g.get(i);
            int j = i - 1;
            while (j >= 0 && d.get(j) < keyD) {
                d.set(j+1, d.get(j));
                g.set(j+1, g.get(j));
                j--;
            }
            d.set(j+1, keyD);
            g.set(j+1, keyG);
        }
    }
}