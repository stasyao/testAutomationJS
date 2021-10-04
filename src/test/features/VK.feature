@automated
Feature: UI and API testing VK social network

  Scenario: Login and make some actions on the wall
    Given The user opens the VK main page
      When Enters his login and password
        And Goes to 'My page'
        And Creates a random post
        And Edits the created post and uploads an image
        And Adds a comment to the post
        And Likes the post
        And Deletes the created post
      Then The post is deleted
