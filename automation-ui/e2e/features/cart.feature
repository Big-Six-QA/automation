Feature: Cart Functionality

  Scenario: Add product to cart
    Given I am logged in as a standard user for cart
    When I add a product to the cart
    Then the cart badge should display 1 item

  Scenario: Remove product from cart
    Given I am logged in as a standard user for cart with a product in the cart
    When I remove the product from the cart
    Then the cart badge should no longer be visible

  Scenario: Cart badge count increases on adding multiple products
    Given I am logged in as a standard user for cart
    When I add multiple products to the cart
    Then the cart badge should display the correct count

  Scenario: Cart persists when navigating back to inventory
    Given I am logged in as a standard user for cart with a product in the cart
    When I navigate back to the inventory page
    Then the cart badge should still display 1 item