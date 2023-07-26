Feature: Google Login
  In order to login by google account
  As a user
  I want to login with my google account

  Scenario: Log in with an unregistered account 
    Given I go to the shozemi website
    When I click on Google login button
    And I input "<emailValue>" and "<passwordValue>" in the form login
    Then Verify "<messageValue>" message is displayed in the page
  Examples:
  |emailValue               |passwordValue|messageValue|
  |duyenduyentest2@gmail.com|Tt1234567 |アカウントが登録されていません。|

  Scenario: Log in with an unregistered account 
    Given I go to the shozemi website
    When I click on Google login button
    And I input "<emailValue>" and "<passwordValue>" in the form login
    Then Verify "<messageValue>" message is displayed in the page
  Examples:
  |emailValue               |passwordValue    |messageValue|
  |duyenduyentest1@gmail.com|@Tt1234567890 | 権限が付与されません。|

  Scenario: Login Success
    Given I go to the shozemi website
    When I click on Google login button
    And I input "<emailValue>" and "<passwordValue>" in the form login
    Then Verify successful login to the system
  Examples:
  |emailValue               |passwordValue|
  |testshz6@gmail.com       |@Tt1234567 | 
