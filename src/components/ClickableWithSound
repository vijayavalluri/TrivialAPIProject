import { Howl} from 'howler'; // Import howler library for audio playback

const ClickableWithSound = () => {
  // Create a new Howl instance with the path to your audio file
  const sound = new Howl({
    src: ['./assets/optionClick-sound.mp3'], // Update this with your audio file path
    volume: 0.5 // Adjust the volume (0.0 to 1.0)
  });

  // Function to handle click event and play the sound
  const handleClick = () => {
    sound.play(Howl, false);
  };

  return (
 
      <li class='optionsClicked' onClick={handleClick}> {options} </li>
    
  );
};


export default ClickableWithSound;