# Highspot Coding Exercise
This is an implementation of the [Highspot Coding Exercise](https://engage.highspot.com/viewer/60a598f36a3b110e630aa8f8?iid=5e176b33b7b739132a2aec0e&source=email.untracked).

This implementation was done using react, starting from the create-react-app template, with some of the extraneous code and dependencies removed from starting project. No new dependencies were added to the base project, though I instinctively wanted to use `axios` instead of the native `fetch` (more on this in [Trade-offs, Considerations and Follow-ups](#trade-offs,-considerations-and-follow-ups)).

## Requirements
* Show results in a card grid format with the image prominently displayed.
* Each card displays: Image, Name, Text, Set Name, and Type. Additional fields are optional.
* Display a loading indicator when communicating with the API.
* Use a responsive design that accommodates, at minimum, desktop and mobile.
* Initially, fetch and display the first 20 results returned by the API.
* As the user scrolls down the page, load and append additional cards using “infinite scroll.”
* Retrieve additional pages of results as-needed but do not load more than 20 cards with each request.
* Allow the user to search for cards by Name.
* Use modern open-source web technologies to implement your solution (React, ~~Backbone~~, ~~Angular~~, ~~Vue~~, ~~Underscore~~, etc.).
* Provide instructions for prerequisites, installation, and application setup and build in a README file.

## Running locally
* `npm install` - Installs dependencies
* `npm run start` - Runs the client

## Questions/Comments
* What do we do when there are no more results?
* Should we try to remember the "page" we're on when a user refreshes and browses back and try to backfill the data?

## Tradeoffs, Considerations and Follow-ups
* Numerous third-party libraries exist that implement "infinite scrolling", such as [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component#readme), which is very popular and is actively being maintained and appears to have a very permissive license agreement (MIT). Typically, in a normal work scenario, I would lean towards investigating whether this library would meet our needs, rather than re-implementing, as a public library like this would have a significant amount of community testing. I should also note that I did not refer to any of these existing projects to complete this project.

* This implementation plays it fast and loose - there is no type safety which I would prefer to have for the properties being passed between components (at a minimal using the `prop-types` library, though a bigger part of me wonders why I didn't just do this in TypeScript.) Ultimately, I decided not to add the `prop-types` dependency as a self-imposed part of the exercise.

* A little explanation on my implementation of the service using a `searchQuery` object in the `esoLegendsService` (instead of just taking a string): when I was looking at the API documentation and manually experimenting with the API I was searching using multiple fields and my initial thought was that I would, at least, write my code to be flexible enough to support multiple search fields at once. While I've only implemented search by name, it would be fairly trivial to extend the model I started with to allow for multiple search fields (at least from the service layer).

* About `axios` over `fetch`: historically, `fetch` has been more verbose or has not easily supported functionality, like adding request and response interceptors, but all I would have gotten in this project was automatic json parsing of the response object, so I opted to not add an extra dependency to save a single line of code, despite the future-proofing that `axios` would have provided in my mind.

## Known Issues
* No behavior was specified for reaching the "end" of the results - normally I'd want to check with the product team (design, ux and PM) to verify what behavior we want to implement when we run out of results but for now I'm just hiding the "loader" so we don't make more round trips when we know there's no more data.
* I did not realize, until my "final" sanity check over the project, that the API returned a `totalCount` value indicating the number of cards matching the search query. My "end of list" code makes an extra round trip (basically it tries to fetch the last page + 1 to get an empty result set to know it's done). Ideally I would have implemented this to be more deterministic about how many pages there are, rather than this brute force approach.
* Refreshing while not at the top of the page attempts to preserve the browsers vertical position which causes the page to "force load" the first two pages since the "loader" entity is immediately visible if the user is already at the bottom of the page. My hacky fix (denoted with a comment calling out the hack) is to force the user to scroll to the top of the page before the unload. Scrolling to the top of the page on initial load was inconsistent - sometimes it wouldn't scroll up all the way. In either case, this is probably not the ideal behavior and I would want to work with the product team to determine a better solution.
