Feature: Inventory Page Functionality

  Scenario: Verify sorting products by price (Low to High)
    Given I am logged in as a standard user for inventory
    When I sort products by "Price (Low to High)"
    Then the products should be displayed in ascending order of price

  Scenario: Verify sorting products by name (A to Z)
    Given I am logged in as a standard user for inventory
    When I sort products by "Name (A to Z)"
    Then the products should be displayed in alphabetical order

  Scenario: Verify sorting products by name (Z to A)
    Given I am logged in as a standard user for inventory
    When I sort products by "Name (Z to A)"
    Then the products should be displayed in reverse alphabetical order

  Scenario: Test product prices match between inventory and details page
    Given I am logged in as a standard user for inventory
    When I check the price and name of the first product
    And I navigate to the product's details page
    Then the price and name on the details page should match those on the inventory page
