exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./e2e/**/*.spec.js'],
  onPrepare: () => {
    require('protractor-uisref-locator')(protractor);
    require('dotenv').config({
      path: 'protractor.env',
    });
  },
  suites: {
    survey: 'e2e/engagement/survey/**/*.spec.js',
    resultsConfiguration:
      'e2e/performance/configuration/configuration-general/**/*.spec.js',
    categoryEvaluation:
      'e2e/performance/configuration/category-evaluation/**/*.spec.js',
    evaluationDesign:
      'e2e/performance/configuration/evaluation-design/**/*.spec.js',
    evaluationCompetence: 'e2e/performance/evaluation/*.spec.js',
  },
};
