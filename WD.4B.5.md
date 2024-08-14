After getting into **the flow** with our Collaborative Flowchart Tool, it is time to groove! 

Imagine this: as you're crafting code, your favorite tunes are playing in the background, setting the rhythm for your coding session. 

In this part, you'll combine the accumulated React knowledge, skills, and patterns to create a music player application. Let's rock this project! 🚀🎶

## Project description

Create a user-friendly music player interface where users can browse a list of songs, favorite them, play them, pause them, skip tracks, and control the volume. Additionally, users should be able to see the currently playing song and its duration.

## Requirements

### Application Feature Requirements

* **Display List of Songs:** The application should display a list of songs fetched from a predefined dataset or API. Each song should show its title, artist, art cover, song duration and indication if it's currently being played (separately from the currently played song information).
* **Play/Pause Functionality:** Users should be able to play or pause a song by clicking a play/pause button. When a song is playing, the button should display a pause icon; when paused, it should display a play icon.
* **Skip Tracks:** Users can skip to the next or previous song in the playlist using dedicated skip buttons.
* **Display Current Song Information:** The application should show the current song's title, artist, and duration. Additionally, a progress bar should indicate the song's current position within its duration.
* **Volume Control:** Users should be able to adjust the music player's volume using a volume slider. The volume level should be reflected in real time as the slider is adjusted.
* **Favouriting**: Users can favorite songs and see which ones they have favored. Favorites do not need to persist between full-page reloads.

### Technical Requirements

* Must use React with TypeScript. Prefer using Vite with the `react-ts` template.
* You may use a combination of React state and `Zustand` for app state management. Ultimately, how the state is managed is up to you.
* You may use a UI/CSS framework and 3rd-party libraries if they do not solve the application feature requirements.
* Rely on the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) and [HTML Audio](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement) web technologies and [Hower.js](https://howlerjs.com/), if needed. However, no React 3rd-party sound libraries should be used.
* Use ONLY royalty-free music without copyright from [pixabay](https://pixabay.com/music/search/no%20copyright%20music/) or a similar source.
* Must use [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to fetch the song data (title, artist, etc) from the API (API can be faked or local).
* Code should be fully typed with TypeScript (no implicit `any` types) and contain no type-checking escape hatches (`@ts-ignore`, `@ts-expect-error`, etc.)
* Code should be well structured; components, modules, hooks, and utility functions should be colocated appropriately.
* The application will be viewed in production mode (`npm run build` and `npm run preview`). Ensure that your application works in the production mode.

## Bonus Challenges (Optional)

If you have fulfilled the requirements and are looking for an extra challenge, you may choose to work on the following additional functionality:
* Implement a search feature to allow users to search for specific songs.
- Add functionality to create playlists and manage them.
- Implement a responsive design to ensure the application works well on different screen sizes.
- Add keyboard shortcuts for controlling the music player (e.g., spacebar to play/pause, arrow keys to skip tracks).
- Persist favorites, playlists, or other data between full page reloads (`localStorage`, server API, etc.)
- Synchronize player state between browser tabs (hint: use something like [shared-zustand](https://github.com/Tom-Julux/shared-zustand)).

## Hints

* Only focus on the bonus challenges if you are confident that the main requirements have been fulfilled and are happy with the code quality.
* External API for song fetching is not required, so do not spend time searching for a viable API. You can use local data and return a promise to simulate async API calls.
* Try to optimize code only if there's an objective reason.
* Look for inspiration on Soundcloud, Mixcloud, and Spotify regarding the UI.

## Reviewer Role

Present your application as if you are presenting it to a potential user who may want to use the app: showcase functionality, discuss ease-of-use, etc. Then, go through the technical aspects of the application if you are communicating with a senior developer, focusing on your program structure and the challenges you encountered.

During a project review, you may get asked questions that test your understanding of covered topics.

**Sample questions for a reviewer to ask (a reviewer is encouraged and expected to think of more, however!)**:
- When is global state management needed? What are the benefits and tradeoffs?
- Could this value or type be inferred by TypeScript instead of explicitly typing it? Why?
- Where does your application fetch data?
- When does this `useEffect` re-run? Is it possible for it to cause an infinite loop?
- Could we have used a Higher Order Component anywhere in this application?

## Project Evaluation Criteria

* **Music Player functionality:** The application works according to the requirements. (⚖️ Weight: 1)
* **User experience:** The application is interactive, intuitive, and easy to use. (⚖️ Weight: 1)
* **State management:** Appropriate state management solution is chosen and implemented (combination of `useState`, `useReducer`, and 3rd-party state management library usage). (⚖️ Weight: 1)
* **Advanced React usage:** React is used beyond the naive, simplistic approaches, e.g., custom Hooks are created and used where needed, React design patterns are used, no deep prop drilling is used, etc. Performance optimizations are not part of this evaluation. (⚖️ Weight: 2)
* **TypeScript usage**: Code is thoroughly typed with TypeScript; there's no implicit `any` usage; types are consistent and flexible; React types are used correctly. (⚖️ Weight: 1)
* **Knowledge:** General understanding of sprint topics and React fundamentals. (⚖️ Weight: 2)

## Submission

Read an in-depth guide about reviews here: https://turingcollege.atlassian.net/wiki/spaces/DLG/pages/537395951/Peer+expert+reviews+corrections.

**Estimate average time to complete: 25 hours**
