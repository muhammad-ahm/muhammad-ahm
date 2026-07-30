public class Snake extends Reptile {
    boolean isVenomous;

    public Snake(boolean isVegetarian, String food, boolean hasScales, boolean isVenomous) {
        super(isVegetarian, food, hasScales);
        this.isVenomous = isVenomous;
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Venomous"+isVenomous);
    }
    public void analyzeSnake(){
        if(isVenomous && hasScales)
    }
}
