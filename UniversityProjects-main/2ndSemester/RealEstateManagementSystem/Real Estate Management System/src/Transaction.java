import java.sql.Date;

public class Transaction {
    private int transactionID;
    private Property property;
    private String transactionType;
    private double price;
    private Agent agent;
    private Date date;

    public Transaction(int transactionID, Property property, String transactionType, double price, Agent agent, Date date) {
        this.transactionID = transactionID;
        this.property = property;
        this.setTransactionType(transactionType);
        this.price = price;
        this.agent = agent;
        this.date = date;
    }

    public int getTransactionID() {
        return transactionID;
    }

    public void setTransactionID(int transactionID) {
        this.transactionID = transactionID;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
//        if (transactionType.equals( "Sale") || transactionType.equals("Purchase")){
            this.transactionType = transactionType;
//        }
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Agent getAgent() {
        return agent;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public static double executeTransaction(){
        if (transactionType.equalsIgnoreCase("Sale")){
            property.setSellingPrice(price);
            Inventory.removeProperty();

        }
        return 0;
    }

    public void calculateProfit(){
//        if (){
//            price = property.getSellingPrice() - property.getPurchasePrice();
//        }
    }
}
