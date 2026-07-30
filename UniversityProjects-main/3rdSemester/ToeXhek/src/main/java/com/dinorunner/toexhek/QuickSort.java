package com.dinorunner.toexhek;

import java.util.ArrayList;

public class QuickSort {
    public static void QuickSort(ArrayList<Integer> g, ArrayList<Integer> d){
        quickSort(g, d, 0, d.size() - 1);
    }

    private static void quickSort(ArrayList<Integer> g, ArrayList<Integer> d, int low, int high) {
        if (low < high) {
            int pi = partition(g, d, low, high);
            quickSort(g, d, low, pi - 1);
            quickSort(g, d, pi + 1, high);
        }
    }

    private static int partition(ArrayList<Integer> g, ArrayList<Integer> d, int low, int high) {
        int pivot = d.get(high);
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (d.get(j) >= pivot) {
                i++;
                Sorter.swap(g, d, i, j);
            }
        }
        Sorter.swap(g, d, i + 1, high);
        return i + 1;
    }
}