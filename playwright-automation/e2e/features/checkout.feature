Feature: Checkout Functionality

  Scenario: Complete the checkout workflow successfully
    Given I am logged in as a standard user with a product in the cart for checkout
    When I proceed to checkout with valid information
    Then I should see the order completion message

  Scenario: Attempt checkout with missing information
    Given I am logged in as a standard user with a product in the cart for checkout
    When I proceed to checkout without providing required information
    Then I should see error messages for missing fields

  Scenario: Verify checkout summary contains correct product details
    Given I am logged in as a standard user with a product in the cart for checkout
    When I proceed to checkout and reach the summary page
    Then the summary should display the correct product name and price

  Scenario: Verify removing a product from the checkout overview page
    Given I am logged in as a standard user with a product in the cart for checkout
    When I proceed to checkout and remove a product from the overview page
    Then the product should no longer be listed in the summary
