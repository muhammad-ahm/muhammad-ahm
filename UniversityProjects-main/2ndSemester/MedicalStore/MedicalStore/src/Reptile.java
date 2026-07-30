public class Reptile extends Animal {
    boolean hasScales;

    public Reptile(boolean isVegetarian, String food, boolean hasScales) {
        super(isVegetarian, food);
        this.hasScales = hasScales;
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Has scales" +hasScales);
    }
}
