public class MyClass {
    public static void main(String args[]) {
        for(int j = 1; j <= 5; j++){
          for(int i = j; i <= 5 * j; i += j){
              System.out.print(i + " ");
          }
          System.out.println();
        }
    }
}