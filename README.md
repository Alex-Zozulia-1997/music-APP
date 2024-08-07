# Neffex Music Player

This is an app, where you can listen to my 10 pics of neffex songs. The following fuctionality is present:

1. Adding to the list of Favourites
2. Play/Pause, listen to a spec moment in the song, Loop one song, Loops through all songs by defaul, Volume Control.

Download the code, then "run npm i"

then you can run "npm run dev"

## Issues & Disclaimer:

1. SVG does not show in the preview mode - that reffers to the song's progress bar.
2. Sometimes there are bugs with the duration, but I cannot replicate them.
3. Potential design falure. Instead of having one <audio> element and change it's SRC dynamically, I opted to have a separate audioRef for each song, which made it easy to have Play/Pause triggered by interacting with the song element, but as the controls pannel grew - It would have been easier to have thaat audio element in the controls pannel.
