import {AllureRuntime} from "allure-cucumberjs";

const {CucumberJSAllureFormatter} = require("allure-cucumberjs");

export default class Reporter extends CucumberJSAllureFormatter {
    constructor(options: any) {
        super(
            options,
            new AllureRuntime({resultsDir: "allure-results"}),
            {
                labels: [{
                    pattern: [/@feature:(.*)/],
                    name: 'feature'
                }],
                links: [{
                    pattern: [/@issue=(.*)/],
                    type: 'issue',
                    urlTemplate: 'http://localhost:8080/issue/%s'
                }]
            }
        );
    }
} 