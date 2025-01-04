Feature: Login functionality

  Scenario: Valid login
    Given I am on the login page
    When I enter valid username and password
    And I click the login button
    Then I should be redirected to the inventory page after login

  Scenario: Invalid login
    Given I am on the login page
    When I enter invalid username and password
    And I click the login button
    Then I should see an error message saying "Epic sadface: Username and password do not match any user in this service"

  Scenario: Locked-out user login
    Given I am on the login page
    When I enter locked-out username and password
    And I click the login button
    Then I should see an error message saying "Epic sadface: Sorry, this user has been locked out."

  Scenario: Verify error messages for invalid credentials
    Given I am on the login page
    When I click the login button without entering any credentials
    Then I should see an error message saying "Epic sadface: Username is required"

    When I enter a valid username but no password
    And I click the login button
    Then I should see an error message saying "Epic sadface: Password is required"
