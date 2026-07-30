public class Animal {
    boolean isVegetarian;
    String food;

    public Animal(boolean isVegetarian, String food){
        this.isVegetarian=isVegetarian;
        this.food=food;
    }

    public void displayInfo(){
        System.out.println("Vegetarian" +isVegetarian);
        System.out.println("Food" + food);
    }
}
