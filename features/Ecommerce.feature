Feature: Ecommerce validations

 
 @Regression
  Scenario: Placing the order
    Given a login to Ecommerce application with "gagmhn08@gmail.com" and "Gusney10"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter Valid details and Place the order
    Then Verify order is present in the OrderHistory