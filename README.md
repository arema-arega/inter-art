# interART
## CodeOp - First Student APP

- name: InterART

### Demo idea video:

https://youtu.be/5Nw31b64smo



- "For music and Audio enthusiast"

## APP component
### App is the parent component of all the pages:
- AudioUploadPage
- - renders AudioUpload component
- AudioVisualizerPage
- - renders AudioVisualizer components
- InfoListPage
- - renders InfoSong & InfoList components
- ChordsVisualizerPage
- - renders ChordKeyCreator & ChordSuffixCreator components
- StartPage (that hasn't been used)

### Handles:
#### The changes of the Screensize coming from the ScreenSize component and sends the props:

- currentScreenSize (to Logo Component and to AudioVisualizer component)

- currentScreenWidth (to AudioVisualizer component)

- The the changes of the audio input coming from the AudioUpload component and extracts the information to be sent as prop:

- - audio (Passed to the AudioVisualizerPage as {audiolink} and sent again as a prop to the Audiovisualizer component)

- - info (Passed to the InforListPageused as {info} and sent again as a prop to the infolist component and the songlist component)


### Structure:
constants (UseState & Eventhandelers)
return:
- Logo component
- header (links)
- main (rutes)




## APP CSS
### App CSS filehandles all the customization of the app except: 
- the buttons:because they have their own css file:button.css
- the Typo family that is included on the main HTML, index.html file:
 @import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;200;300;400;500;600&display=swap');    



## AUDIOUPLOAD page
Renders: AudioUpload component

### Objectives that need implementation:
#### More ways to input the sound:
- Live sound (through sound card prefered ex: band playing, djs, mic)
- links from 3rd parties // taking into account that on the app there is a html element creation for the sound const audioLink = audio && URL.createObjectURL(audio) that doesn't need to be used in this case.
- Allowing more file types to be inputed like wav, flac,  midi, etc

### Functions:
- handles the upload and obtains the data from an audiofile object, that will be passed to the app parent component that then will send it to:
- AudioVisualizer => that may passed in the future to the Chord VisualizerInfoListPage (Song List) / the DataBase Music (table songs)


## AudioUpload Component

AudioUpload

### Objectives that need implementation:
#### More ways to input the sound:
- Live sound (through sound card prefered ex: band playing, djs, mic)
- links from 3rd parties // taking into account that on the app there is a html element creation for the sound const audioLink = audio && URL.createObjectURL(audio) that doesn't need to be used in this case
- Allowing more file types to be inputed like wav, flac,  midi, etc

### Functions:
- handles the upload and obtains the data from an audiofile object, that will be passed to the app parent component that then will send it to:
- AudioVisualizer => that may passed in the future to the Chord VisualizerInfoListPage (Song List) / the DataBase Music (table songs)



## Audio Visualizer page
Renders the AudioVisualizer component

### Objectives that need implementation:
- The fast fourier it's not been recognized within the UseEffect on the Audiovisalizer component So the frequency analyzer  and the canvas render are affected
- The stop function it's not working its got do with the audio content creation within the useeffect
- Live Frequency
- BPM analyzer
- Root note
- To connect the obtained data to the chord creation component so the user will be able to receive chord suggestions.

### Functions:
#### The user uploads an audio on the AudioVisualizer component to obtain the data from it:
- Each capture Frequency is transformed into notes and saved in the data array to be shown after
- Sound bits that are rendered into colors inside the canvas with a draw function, while it's being played live.
- The user can select the frequency and the canvas size of the visualizer




## AudioVisualizer component

AudioVisualizer

### Objectives that need implementation:
- The fast fourier is not been recognized within the UseEffect on the Audiovisalizer component So the frequency analyzer  and the canvas render are affected

- The stop function it's not working it's got do with the audio content creation within the useeffect

- Live Frequency
- BPM analyzer
- Root note
- To connect the obtained data to the chord creation component so the user will be able to receive chord suggestions.

### Functions:

- The user uploads an audio on the AudioVisualizer component to obtain the data from it:
- Each captured Frequency is transformed into notes and saved in the data array to be shown after
- Sound bits that are rendered into colors inside the canvas with a draw function, while it's been played live.
- The user can select the frequency and the canvas size of the visualizer



## Infolist page

### Infolist page renders renders:

- Songlist Component
- InfoList Component

### Objectives that need implementation:
#### The post on the SongList component it's been triggered even after using a condition:
 
- if (!info) {console.log("No song info provided");               
- return; // Exit the function if info is null };

#### and also within the UseEffect, so this need to be solved

### Functions:

- The user can see and delete the info from the list made out of the uploaded audio {info}that have been sent automatically by the Songlist Componentto the table songs located inside the database music:

#### Default info on the table songs:

- id: 1
- name: Maria - Dana Hill
- size:  20


- on the InfoList Component the user can see the {info} of the audio that it's been played



## SongList component

-  the SongList Component is rendered on the InfoList Page

### Objectives that need implementation:

#### The post on the SongList component it's been triggered even after using a condition 

- if (!info) {console.log("No song info provided");                
- return; // Exit the function if info is null };

#### and also within the UseEffect, so this need to be solved

### Functions:
- The user can see and delete the info from the list made out of the uploaded audio {info}that have been sent automatically by the Songlist Componentto the table songs located inside the database music:

#### Default info on the table songs:

- id: 1
- name: Maria - Dana Hill
- size:  20


## infoList component

- The InfoList Component is rendered on the InfoListPage allowing the user to see the {info} of the audio that it's been played.

### ChordVsualizer pageChordVisualizer page renders: 
- KeyCreator for Selecting the Key of ChordC, D , Eb...etc
- ChordSuffixCreator for Selecting the type of Chordmenor, mayor...etc
- Both combined (KeyCreator & ChordSuffixCreator) create the Actual Chordthat should be used for rendering the:
- GuitarChords to show a guitar chart with the selected chord position


### Objectives that need implementation:
- To be able to select the root note and suffix of the chord to see it on the guitar chart above.
- To give the possibility to the user to move the position of the notes on the guitar chartand obtain the name of the chord
- To play a chord and to obtain its name and possible positions on a guitar chart from the audio input.


## KeyCreator component

- KeyCreator component is renderedon the ChordsVisualizerPage for Selecting the Key of ChordC, D , Eb...etc

- https://github.com/tombatossals/react-chords


### For using the database:
- https://github.com/tombatossals/chords-db#chords-db1- 
- git clone https://github.com/tombatossals/chords-db.git2
- cd chords-db




## ChordSuffixCreator component

- ChordSuffixCreator component is renderedon the ChordsVisualizerPage for Selecting the type of Chordminor, mayor...etc


## StartPageStart Page:
### Objectives that need implementation:
- This page was made as the initial point for the user to navigatethe idea was that the user sees the Big Logo presses on it and the journey within the app starts

- On the LOGO component: const handleLogoClick = () => {navigate("/audio-upload"); 

- Navigate to the AudioUpload page when the logo is clicked};

- The conditional rendering on the app component has not been implemented for this to happen.


## Logo Component
### the Logo component is rendered on the app componentso it appears on all the other pages.
- When the Logo Image is clicked the user is taken to the AudioUpload Page: const handleLogoClick = () => {navigate("/audio-upload");};

- The logo uses the library: https://nextui.org/docs/components/image  (it's the only component using it on the app)

- The Logo component uses the currentScreenSize prop sent from the app parent component


### Objectives that need implementation:  
- To put a max and min condition on the rendering of the logo on the percentage value: 
- const percentage = Math.min(currentScreenSize / 12, 50);

## ScreenSize component
### The ScreenSize component is used as a prop that the app parent sends to:
- AudioVisualizer component
- the Logo component


## Button component
### Button: This Component is used through all the app componentsit is using a CSS file 
"./button.css" with the different customizations

## Button CSS component
### Button Customization: 
- This Component is used through all the app componentsit Customizes the button 

