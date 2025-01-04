# IS3440 IT Quality Assurance Group Assignment

## Introduction
This project is part of our IS3440 IT Quality Assurance module. The assignment involves *test automation* for both *UI* and *API testing*. The goal is to implement and 
demonstrate effective test automation strategies using modern tools and methodologies.
## Group Members

| Index Number | Name                        | GitHub Username     |
|--------------|-----------------------------|---------------------|
| 204070X      | Hasintha M.K                | Kavindu-Hasintha    |
| 204138N      | Nikeshala J.L.H.            | HarindiNikeshala    |
| 205101E      | Sewwandi K.M.D.I            | Dilini-Imesha       |
| 204134A      | Navod K.K.V                 | vinukanavod         |
| 204083N      | Jayarathne P.A.T.P          | TharakaJayz         |
| 205049B      | Kanuja.Y                    | kaanuja             |


## Tools and Frameworks
- *Cucumber*: Used for Behavior-Driven Development (BDD) to write human-readable test scenarios.
- *Playwright*: A modern test automation framework for reliable, fast, and scalable UI testing.

## Project Details
- *UI Testing*: The testing was performed on [Sauce Demo](https://www.saucedemo.com/).

## Features
- *BDD Approach*: We wrote Gherkin scenarios for clear and understandable test cases.
- *Page Object Model (POM)*: Organized UI test scripts for maintainability and scalability.
- *CI/CD Integration*: Used for automated test runs.

## How to Run
1. Clone the repository.
2. Open the project in your preferred IDE:
   - Recommended IDEs:
     - IntelliJ IDEA (for Java-based automation)
     - Visual Studio Code (for Playwright and Cucumber feature files)
3. Install dependencies:
   
   bash
   yarn install
   yarn test
   
4. Execute the tests.
      - UI tests :
        bash
        npx cucumber-js features/ui_tests