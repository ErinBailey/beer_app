# Express CRUD with Albums

## Approach

XP practices are derived from values. In particular, there are two development practices which are related:

  1. Test-first Programming (TDD)
  1. Incremental Design

In this problem set you will focus on the two programming practices outlined above; TDD and incremental design. _Before you continue reading this description_, can you list which of the 5 values (there may be more than one for each) are used for these practices?

If you would like to read about this (on your own time) please read Chapters 6 and 7 in [_Extreme Programming Explained: Embrace Change_](http://www.amazon.com/Extreme-Programming-Explained-Embrace-Edition/dp/0321278658) by [Kent Beck](https://en.wikipedia.org/wiki/Kent_Beck). We will do our best to learn the Values, Principles and Practices of XP through experience, but additional reading around theory never hurts.

This may look familiar:

![](wireframes/album-root-path.png)

Since you are writing the tests _before_ the implementation, how does your overall approach change? Do you inspect the wireframes any differently? Do you use the information on the wireframes differently?

#### One way to do it

One way to start down the path of TDD is in plain English. The template to work with, for acceptance tests, is [Given/When/Then](http://martinfowler.com/bliki/GivenWhenThen.html). For example,

Open up a blank text file and with your pair write a sentences like: "**Given** a user is on the home page, **When** a user clicks on the 'Let me see right now' link, **Then** they see the albums index view". Start by just getting it down in a stream of conscious way as you discover features. Once you have a reasonable list to start from, devise a plan of attack around themes that arise from your document.

#### A reminder

![Red, Green, Refactor](http://hanwax.github.io/assets/tdd_flow.png)

_Image provided by:_ [http://hanwax.github.io](http://hanwax.github.io)

Your modus operandi is ["Red, Green, Refactor"](http://www.santeon.com/insight-blog/video-and-article/33-insight-blog/video-and-article/229-test-driven-development-red-green-refactor#.VwYg2RIrKEI). _Before continuing or starting to code_, can you list out the steps you and your pair will follow as you use TDD? As you implement tests (and code), follow the steps you have outlined until they become second nature. Until that point, rigorously refer to the steps and police each other on it.

## Wireframes

Again you are free to use whatever libraries you would like so long as Express is the base framework used.

For this exercise, we are building a universal library of music albums. In this case, imagine that the library itself is crowd sourced, so we allow users to create new albums, delete albums, etc.

These wireframes give a sketch of how the application should work. _Hint:_ Pay attention to the URLs.

![](wireframes/album-root-path.png)

![](wireframes/album-index.png)

![](wireframes/album-new.png)

![](wireframes/album-show.png)

![](wireframes/album-edit.png)

## Getting started

1. Use the `express .` command to create an empty skeleton in this directory.
1. Run `npm install` to import dependencies.
1. Run `npm install --save-dev nodemon mocha chai supertest jasmine protractor` to add test dependencies.
1. Run `npm install --save monk` to read from the database.
1. Replace the `script` section of `package.json` with the following:
    ```
  "scripts": {
    "start": "node ./bin/www",
    "tdd": "nodemon --watch ./ --exec 'mocha test/unit' --delay 1 ./bin/www",
    "test": "npm run test:wmu && npm run test:unit && npm run test:integration && npm run test:acceptance",
    "test:acceptance": "NODE_ENV=test protractor test/acceptance/config.js",
    "test:integration": "NODE_ENV=test mocha test/integration --recursive",
    "test:unit": "NODE_ENV=test mocha test/unit/ --recursive",
    "test:wmu": "webdriver-manager update"
  },
	```
	This provides the following commnds:
    1. `npm test` will run all tests: unit tests first, then integration tests, then acceptance tests.
    2. `npm run tdd` will monitor the project directory and run the unit tests every time a file is updated. (type `rs` in the command line to restart nodemon - may need to restart to see certain changes)
    2. `npm run test:unit` to run the _only_ the unit tests.
    2. `npm run test:integration` to run the _only_ the integration tests.
    3. `npm run test:acceptance` to run the _only_ the acceptance tests.
1. Create `/test/unit/placholder_test.js` and leave it blank. You can delete this file once you have another unit test.
2. Create `/test/integration/placholder_test.js` and leave it blank. You can delete this file once you have another integration test.
1. Create `/test/acceptance/config.js` (from [Protractor tutorial](http://www.protractortest.org/#/tutorial)):

    ```
    'use strict'
    module.exports.config = {
      specs: ['./**/*_test.js'],
      framework: 'jasmine',
      mochaOpts: {
        reporter: 'spec',
        slow: 3000,
        enableTimeouts: false
      },
      capabilities: {
        'browserName': 'chrome'
      },
      directConnect: true
    }

    ```

1. Create `test/acceptance/album_test.js` (from [Protractor tutorial](http://www.protractortest.org/#/tutorial)):

    ```
    'use strict'

    const path = require('path')
    const http = require('http')
    const app = require(path.resolve('app'))

    describe('Express CRUD', () => {
      beforeAll(() => {
        const server = http.createServer(app)
        server.listen(0)
        browser.baseUrl = 'http://localhost:' + server.address().port
        browser.ignoreSynchronization = true
      })

      describe('Given I visit /users', () => {
        it('Then I see the express default', () => {
          browser.get('/users')
          expect(element(by.tagName('body')).getText()).toEqual('respond with a resource')
        })
      })
    })
    ```
1. run `npm test` from the command line. If all tests pass the project is setup correctly.
1. Commit your changes to `git` (we will go into `git` in more detail later):
	```
    git add .
    git commit -m 'Project setup complete'
    ```
    Consider commiting your changes after each refactor step.

## Problems

1. Complete the CRUD application from the provided wireframes using TDD. For acceptance tests use [Protractor](https://angular.github.io/protractor/#/) with [Jasmine](https://jasmine.github.io/). For unit tests use [Mocha](https://mochajs.org/) with [Chai](http://chaijs.com/). You can ignore integration tests for now - we will cover integration testing Express apps later.
1. Use Git to commit your new application and push it to a remote repository (either your fork of this problem set or a new repository).
1. [stretch] In Agile software development, it is important to understand who the users of a system are. As we will see later on, a way to do this is to define a set of personas who are basically the users of our system (aka humans). For this exercise we have two personas:
  1. _Gary the Guest_ - Gary is a music fan who has never visited the "OMG Albums!" application before.
  1. _Mary the Music Lover_ - Registered user of the "OMG Albums!" application, she loves music and regularly uses the album catalogue.

  An [Agile User Story](http://searchsoftwarequality.techtarget.com/definition/user-story) outlines for developers what behaviors the users of a given system would like to have. We will go over this in depth, for now the goal is to gain exposure to the language of stories. Implement the following user stories:

  1. As Gary, I would like to be able to Sign Up by clicking a sign up link on the home page, so that I can use the "OMG Albums!" application to store my favorite albums.

    _Acceptance Criteria_:
    1. Given that I am Gary on the home page, when I click "Sign Up", then I am taken to `/sign-up` and provided a form to register with my email and a password. _Note:_ For this story, do not worry about email or password validations.

  1. As Mary, I would like to select albums on the index view (`/albums`) to be favorites by clicking on a star (or other icon) next to the name, so that I can easily toggle and identify which albums I like.

    _Acceptance Criteria_:
    1. Given I am Mary visiting `/albums`, when I click on the icon next to the name of an album, then the album is recorded as a favorite in the database and the icon changes to indicate that the album is a favorite. _Note:_ The page should not refresh.
    1. Given I am Mary visiting `/albums`, when I click on the icon next to the name of an album that is already a favorite album, then the album is removed as a favorite in the database. _Note:_ The page should not refresh.

  1. As Mary, I would like to have a page showing my favorite albums, so that I can keep track of music I enjoyed listening to.

    _Acceptance Criteria_:
    1. Given that I am Mary visiting `/albums`, when I click on the "Favorites" link, then I am taken to `/favorites` and shown a listing of my favorite albums.

1. [epic stretch] Now that you have implemented user registration and authentication, what kind of features would we expect to add? Although there are many answers, we will focus on a common problem; authorization. For this part of the exercise, use the provided written description and write your own user stories:

  1. When Gary attempts to visit any path that includes `/albums` (e.g. `/albums/new`), they are redirected to `/` and told to login before visiting that path. Are there any other paths for which this should be the case?

__Hint__: We are using Jasmine for the acceptance tests rather than Mocha because all of the protractor documentation uses Jasmine.
You might also consider reviewing the [protractor API](http://www.protractortest.org/#/api) page before starting.

## Reflection

As always, stop a few minutes before the end of the day and, working with your pair, answer the following questions:

1. What is the relationship between acceptance criteria and acceptance testing?
1. How many times did you have to open the application in the browser to verify that something actually worked but didn't in your test?
1. Of the sentences you may have begun with, how many ended up in your final documentation? (the output of the test run)
1. What is the connection between Test Driven Development and Error Driven Development?
1. Give each other two pieces of praise based on your work together for the day. Examples of this are things like "you did an excellent job catching syntax errors while I was driving, it made me feel like you were highly engaged in solving the problem with me." or "you did a great job communicating what you were thinking and checking in with me to see if we agreed before we moved forward."
