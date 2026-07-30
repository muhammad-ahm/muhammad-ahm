package com.dinorunner.toexhek;

import java.util.ArrayList;

public class BubbleSort {
    public static void BubbleSort(ArrayList<Integer> g, ArrayList<Integer> d) {
        int n = d.size();
        for (int i = 0; i < n-1; i++)
            for (int j = 0; j < n-i-1; j++)
                if (d.get(j) < d.get(j+1)) { Sorter.swap(g, d, j, j+1); }
    }
}
