# interART
## CodeOp - First Student APP
![Local Image](https://github.com/arema-arega/inter-art/blob/newbranch/client/public/images%20of%20the%20process/10%20-Logo.png?raw=true)



### Demo idea video:

```html
<iframe width="560" height="315" src="https://youtu.be/5Nw31b64smo" frameborder="0" allowfullscreen></iframe>
````

https://youtu.be/5Nw31b64smo



#### "Interactive Tool For Music and Audio enthusiasts"
##### This phase of the App aims to:
- Analyze the audio input of the user.
- Visualize real time frequencies and notes.
- Show a list of the audio uploads kept inside the database and the current audio.
- Visualize the selected chords and a guitar chart (the selected chord should appear on the guitar chart example)

##### Future phases:
- Integrating sound visualization components for interactive uses
- Adding an integration with Images manipulation
- user login



## Workstation
- Visual Studio Code editor https://code.visualstudio.com/


## Backend
- MySQL https://www.mysql.com/
- Postman https://www.postman.com/
- Node.js https://nodejs.org/en/about


## Frontend
- React https://react.dev/
- CSS https://developer.mozilla.org/en-US/docs/Web/CS


## Apis
- Web Audio Api https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- Tones https://github.com/bit101/tones


## libraries
- React Router https://reactrouter.com/en/main/start/tutorial
- react-chords https://github.com/tombatossals/react-chords
- nextUI https://nextui.org/docs/components/image
- clsx https://www.npmjs.com/package/clsx



![Local Image](https://github.com/arema-arega/inter-art/blob/newbranch/client/public/images%20of%20the%20process/14-menu.png?raw=true)


## APP component
### App is the parent component of all the pages:
- AudioUploadPage
- - renders AudioUpload component
- AudioVisualizerPage
- - renders AudioVisualizer components
- InfoListPage
- - renders InfoSong & InfoList components
- ChordsVisualizerPage
- - renders GuitarChords, ChordKeyCreator & ChordSuffixCreator components
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
### App CSS file handles all the customization of the app except: 
- the buttons:because they have their own css file:button.css
- the Typo family that is included on the main HTML, index.html file:
 @import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;200;300;400;500;600&display=swap');    


![Local Image](https://github.com/arema-arega/inter-art/blob/newbranch/client/public/images%20of%20the%20process/15-%20Audio%20Upload%20Page.png?raw=true)


## AudioUpload page
Renders: AudioUpload component

### Objectives that need implementation:
#### More ways to input the sound:
- Live sound (through sound card prefered ex: band playing, djs, mic)
- links from 3rd parties // taking into account that on the app there is a html element creation for the sound const audioLink = audio && URL.createObjectURL(audio) that doesn't need to be used in this case.
- Allowing more file types to be inputed like wav, flac,  midi, etc

### Functions:
- handles the upload and obtains the data from an audiofile object, that will be passed to the app parent component that then will send it to:
- AudioVisualizer => that may passed in the future to the Chord VisualizerInfoListPage (Song List) / the DataBase Music (table songs)


![Local Image](https://github.com/arema-arega/inter-art/blob/newbranch/client/public/images%20of%20the%20process/16-%20Uploading.png?raw=true)


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

![Local Image](https://github.com/arema-arega/inter-art/blob/newbranch/client/public/images%20of%20the%20process/18-%20Audio%20Visualizer%20page%20The%20Fast%20Fourier%20no%20funciona.png?raw=true)

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

![Local Image](https://github.com/arema-arega/inter-art/blob/newbranch/client/public/images%20of%20the%20process/5-Analizing%20-%20Agosto%202%20-%20Fast%20Furier%20Funcionaba.png?raw=true)

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

![Local Image](https://github.com/arema-arega/inter-art/blob/newbranch/client/public/images%20of%20the%20process/19-%20Song%20List%20Page.png?raw=true)
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

- The user can see and delete the info from the list made out of the uploaded audio {info}that have been sent automatically by the Songlist Component to the table songs located inside the database music:

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

![Local Image](https://github.com/arema-arega/inter-art/blob/main/client/public/images%20of%20the%20process/20%20-%20Guitar%20Chord%20Visualizer.png?raw=true)


## GuitarChords 
- GuitarChords component is rendered on the ChordsVisualizerPage to show a guitar chart with the selected chord position.

### Objetives that need implementation:

- The component is receiving the chord from
@tombatossals/react-chords/lib/Chord' (Installation of the library: npm install @tombatossals/react-chords)
- The idea will be to use this library for chord-matching(using for example filter()) to render the chord generated by the selected (key) KeyCreator & (suffix) ChordSuffixCreator

- For that the GuitarChords should receive the props sended by the parent: 
- - ChordsVisualizerPage
- - - (GuitarChords selectedKeyValue= {(selectedKeyValue)} selectedSuffix={(selectedSuffix)})
- - using them: 
- - - const GuitarChords = (selectedKeyValue, selectedSuffix)
- - to match their values with react-chords library to render the actual Chord that has been selected on the ChordsVisualizerPage.

![Local Image](https://github.com/arema-arega/inter-art/blob/main/client/public/images%20of%20the%20process/21%20-%20Chord%20Visulizer.png?raw=true)

## KeyCreator component

- KeyCreator component is renderedon the ChordsVisualizerPage for Selecting the Key of ChordC, D , Eb...etc

- https://github.com/tombatossals/react-chords


### For using the database:
- https://github.com/tombatossals/chords-db#chords-db1- 
- git clone https://github.com/tombatossals/chords-db.git2
- cd chords-db


![Local Image](https://github.com/arema-arega/inter-art/blob/main/client/public/images%20of%20the%20process/22%20-%20Chord%20Key%20Visualizer.png?raw=true)
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
- Button: This Component is used through all the app components. Using a CSS file "./button.css" with the different customizations

## Button CSS component
### Button Customization: 
- This Component is used through all the app components it's used to customizes all the buttons. 

## Errors
![Local Image](https://github.com/arema-arega/inter-art/blob/main/client/public/images%20of%20the%20process/7-Errrores.png?raw=true)

## Draft
![Local Image](https://github.com/arema-arega/inter-art/blob/main/client/public/images%20of%20the%20process/9-Dise%C3%B1o%20primario.png?raw=true)
