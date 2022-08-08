import { boardPlaceSize } from '../const/const';
import PlaceMap from './PlaceMap';
import { STATUS } from '../const/const'
import { Place } from './Place';

export class Gomoku {
  turnToggle: boolean;
  turnOrderText: HTMLDivElement;
  resetButton: HTMLDivElement;
  buttonHiddenToggle: HTMLDivElement;
  hiddenPlaceToggle: boolean;
  placeMap = new PlaceMap(boardPlaceSize, boardPlaceSize, this);

  constructor () {

    // reset button
    this.resetButton = document.createElement('div')
    this.resetButton.classList.add('reset')
    this.resetButton.setAttribute('id', 'reset-button')
    this.resetButton.innerText = "Reset Game"

    this.buttonHiddenToggle = document.createElement('div')

    //Changing the turn order for the player
    this.turnOrderText = document.createElement('div');
    this.turnOrderText.classList.add('turnOrder')
    this.turnOrderText.innerText = "Current player: Black";
    this.turnOrderText.setAttribute('id', 'turn-order');
    this.turnOrderText.setAttribute('margin-left', 'auto');
    this.turnOrderText.setAttribute('margin-right', 'auto');
    this.turnOrderText.setAttribute('text-align', 'right');
    this.turnOrderText.setAttribute('float', 'right');
    
    this.hiddenPlaceToggle = false;    
    this.turnToggle = true;

    this.resetButton.addEventListener('click', () => {
      this.placeMap.rows.map((row) => row.places.map((place) => place.resetStatus()))
      this.placeMap.selectedPlaces.splice(0)
      this.turnOrderText.innerText = "Current player: Black"
      this.turnToggle = false
      this.placeMap.resetDrawCounter();
    });

    this.buttonHiddenToggle.addEventListener('click', () => {
      this.hiddenPlaceToggle = !this.hiddenPlaceToggle
      if (this.hiddenPlaceToggle){ 
        this.buttonHiddenToggle.style.color = '#32a852'
      }
      else{ 
        this.buttonHiddenToggle.style.color = '#fff'
      }
    })
  }

  handleClick(winConditionMet: boolean, place: Place) {

    if (!winConditionMet){
      
      if (place.status === STATUS.BLACK || place.status === STATUS.WHITE) { 
        return
      }

      place.element.classList.remove(place.status.toLowerCase())
  
      
      if (this.turnToggle){
        place.status = place.status === STATUS.AVAILABLE || STATUS.WHITE ? STATUS.BLACK : STATUS.AVAILABLE;
        place.element.style.setProperty('background-color', '#000');
        this.updateTurnOrderText("Current player: White");
      } else {
        place.status = place.status === STATUS.AVAILABLE || STATUS.BLACK ? STATUS.WHITE : STATUS.AVAILABLE;
        place.element.style.setProperty('background-color', '#fff');
        this.updateTurnOrderText("Current player: Black");
      }

      this.turnToggle = !this.turnToggle

      if (place.determineIfWon(place.placeMap, STATUS.WHITE.toLowerCase())){
        this.updateTurnOrderText("White Won");
        place.winConditionMet = true
      } else if (place.determineIfWon(place.placeMap, STATUS.BLACK.toLowerCase())){
        this.updateTurnOrderText("Black Won");
        place.winConditionMet = true
      }
      place.element.classList.add(place.status.toLowerCase())
    }
  }

  renderBoard() {
    document.getElementById('gomoku')?.append(this.placeMap.element);
    document.getElementById('gomoku')?.append(this.turnOrderText);
    document.getElementById('gomoku')?.append(this.resetButton);
  }

  updateTurnOrderText(inputText: string) {
    this.turnOrderText.innerText = inputText;
  }
}
