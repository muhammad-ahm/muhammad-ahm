public class Medicine {
//    a name, a price per unit, a current quantity in stock, and a minimum quantity
    String name;
    double pricePerUnit;
    int currentQuantity;
    int minimumQuantity;

    public Medicine(String name, double pricePerUnit, int currentQuantity, int minimumQuantity) {
        this.name = name;
        this.pricePerUnit = pricePerUnit;
        this.currentQuantity = currentQuantity;
        this.minimumQuantity = minimumQuantity;
    }

    public void updateQuantity(int newQuantity){
        currentQuantity = newQuantity;
        if (currentQuantity < minimumQuantity){
            System.out.println("Warning the current stock is not Available.");
        }
    }

    public double calculateTotal(){
        return pricePerUnit * currentQuantity;
    }

    public void display(){
        System.out.println("Medicine Name: " + name);
        System.out.println("Medicine Price: " + pricePerUnit);
        System.out.println("Medicine Quantity: " + currentQuantity);
        System.out.println("Medicine Minimum Quantity: " + minimumQuantity);
        System.out.println("Total: $" + calculateTotal());
    }
}
