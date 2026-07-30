package com.dinorunner.toexhek;

import java.util.ArrayList;

public class SelectionSort {
    public static void SelectionSort(ArrayList<Integer> g, ArrayList<Integer> d) {
        for (int i = 0; i < d.size()-1; i++) {
            int max = i;
            for (int j = i+1; j < d.size(); j++)
                if (d.get(j) > d.get(max)) max = j;
            Sorter.swap(g, d, i, max);
        }
    }
}