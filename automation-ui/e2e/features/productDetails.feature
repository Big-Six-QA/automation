Feature: Product Details Page Functionality
  As a user,
  I want to view product details
  So that I can see specific information about each product.

  Background:
    Given I am logged in as a standard user for productDetails

  Scenario: Verify product details page displays correct product information
    When I open the product details page for the first product
    Then the product name, description, and price should match the inventory page

  Scenario: Verify "Back to Products" button navigates to inventory page
    When I open the product details page for the first product
    And I click the "Back to Products" button
    Then I should be redirected to the inventory page in productDetails

  Scenario: Verify "Add to Cart" button on product details page
    When I open the product details page for the first product
    And I click the "Add to Cart" button
    Then the cart badge should display 1 item for productDetails

  Scenario: Verify navigation to cart from product details page
    When I open the product details page for the first product
    And I click the "Add to Cart" button
    And I click the cart icon
    Then I should be redirected to the cart page
    And the product should be visible in the cart
