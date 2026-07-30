package com.dinorunner.toexhek;

import java.util.ArrayList;

public class Sorter {
    public static void sortDescending(ArrayList<Integer> guesses, ArrayList<Integer> distances, String algo) {
        if ("Bubble Sort".equals(algo)) BubbleSort.BubbleSort(guesses, distances);
        else if ("Insertion Sort".equals(algo)) InsertionSort.InsertionSort(guesses, distances);
        else if ("Selection Sort".equals(algo)) SelectionSort.SelectionSort(guesses, distances);
        else if ("Merge Sort".equals(algo)) MergeSort.MergeSort(guesses, distances, 0, distances.size() - 1);
        else if ("Quick Sort".equals(algo)) QuickSort.QuickSort(guesses, distances);
    }

    public static void swap(ArrayList<Integer> g, ArrayList<Integer> d, int i, int j) {
        int tempD = d.get(i); d.set(i, d.get(j)); d.set(j, tempD);
        int tempG = g.get(i); g.set(i, g.get(j)); g.set(j, tempG);
    }
}