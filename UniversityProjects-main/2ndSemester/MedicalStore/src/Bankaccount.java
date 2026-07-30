public class Bankaccount {
    private String accountNumber;
    private double balance;

    public Bankaccount(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public void deposit(double amount){
        if(amount>0){
            balance+=amount;
            System.out.println("Deposited" + amount);
        }
        else {
            System.out.println("Error");
        }
    }

    public void studentAccount(Student student){
        student.getStudentID();
        student.getName();

    }

    public void withdraw(double amount){
        if(amount>0 && amount<=balance){
            balance-=amount;
            System.out.println("Withdrawn " + amount);
        }
        else {
            System.out.println("Insufficient balance");
        }
    }

    public void display(){
        System.out.println("Account number" +accountNumber);
        System.out.println("Balance" +balance);

    }
}
