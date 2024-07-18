Feature: Ecommerce validations

  @Validation
  Scenario: Placing the order
    Given a login to Ecommerce2 application with "gagmhn08@gmail.com" and "Gusney10"
    Then Verify Error message is displayed