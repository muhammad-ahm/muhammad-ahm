public class Agent {
    private int id;
    private String name;
    private double totalSales;
    private double commisionRate;

    public Agent(int id, String name, double totalSales, double commisionRate) {
        this.id = id;
        this.name = name;
        this.totalSales = totalSales;
        this.commisionRate = commisionRate;
    }

    public double recordSale(Transaction t){
        return 0;
    }

    public void calculateCommission(){

    }

    public void displaySalesReport(){

    }
}
