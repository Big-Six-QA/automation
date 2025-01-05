Feature: Sidebar Menu Functionality

  Scenario: Logout functionality
    Given I am logged in as a standard user
    When I open the sidebar menu
    And I click the "Logout" button
    Then I should be redirected to the login page

  Scenario: Verify "Reset App State" functionality
    Given I am logged in as a standard user
    When I add a product to the cart for menu
    And I open the sidebar menu
    And I click the "Reset App State" button
    Then the cart should be reset

  Scenario: Verify sidebar menu opens and closes properly
    Given I am logged in as a standard user
    When I open the sidebar menu
    Then the sidebar menu should be visible
    When I close the sidebar menu
    Then the sidebar menu should not be visible

  Scenario: Verify navigation to "All Items" from sidebar menu
    Given I am logged in as a standard user
    When I open the sidebar menu
    And I click on "All Items"
    Then I should be redirected to the inventory page
