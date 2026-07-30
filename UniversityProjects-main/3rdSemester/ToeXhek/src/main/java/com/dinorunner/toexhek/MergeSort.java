package com.dinorunner.toexhek;

import java.util.ArrayList;

public class MergeSort {
    public static void MergeSort(ArrayList<Integer> g, ArrayList<Integer> d, int l, int r) {
        if (l < r) {
            int m = (l + r) / 2;
            MergeSort(g, d, l, m);
            MergeSort(g, d, m+1, r);
            merge(g, d, l, m, r);
        }
    }

    private static void merge(ArrayList<Integer> g, ArrayList<Integer> d, int l, int m, int r) {
        ArrayList<Integer> tempG = new ArrayList<>();
        ArrayList<Integer> tempD = new ArrayList<>();
        int i = l, j = m+1;
        while (i <= m && j <= r) {
            if (d.get(i) >= d.get(j)) {
                tempD.add(d.get(i));
                tempG.add(g.get(i++));
            } else {
                tempD.add(d.get(j));
                tempG.add(g.get(j++));
            }
        }
        while (i <= m) { tempD.add(d.get(i)); tempG.add(g.get(i++)); }
        while (j <= r) { tempD.add(d.get(j)); tempG.add(g.get(j++)); }
        for (int k = 0; k < tempD.size(); k++) {
            d.set(l + k, tempD.get(k));
            g.set(l + k, tempG.get(k));
        }
    }
}