import { Gomoku } from './Gomoku';
import { STATUS, boardPlaceSize } from "../const/const";
import PlaceMap from './PlaceMap'

export class Place {
  placeId: number;
  status: STATUS;
  element: HTMLDivElement;
  winConditionMet: boolean;
  placeMap: PlaceMap;
  gomoku: Gomoku;

  constructor(placeId: number, placeMap: PlaceMap, gomoku: Gomoku) {

    this.placeId = placeId;
    this.winConditionMet = false;
    this.status = STATUS.AVAILABLE;
    this.element = document.createElement('div');
    this.element.classList.add('place');
    this.element.classList.add(this.status.toLowerCase());
    this.element.style.height = `100%`;
    this.element.style.width = `${100 / boardPlaceSize}%`;

    this.element.addEventListener('click', () => {
      gomoku.handleClick(this.winConditionMet, this)
    })

    this.placeMap = placeMap
    this.gomoku = gomoku;
  }

  resetStatus(){
    this.element.classList.remove(STATUS.WHITE.toLowerCase())
    this.element.classList.remove(STATUS.BLACK.toLowerCase())
    this.element.classList.add(STATUS.AVAILABLE.toLowerCase())
    this.element.style.visibility = 'visible';
    this.status = STATUS.AVAILABLE
  }

  get isSelected() {
    return this.status === STATUS.BLACK || this.status === STATUS.WHITE
  }

  determineIfWon(placeMap: PlaceMap, inputStatus: string) {
    
    //check each row
    for (let i = 0; i < placeMap.rows.length; i++){
      for (let j = 2; j < placeMap.rows[i].places.length - 2; j++){
        if (placeMap.rows[i].places[j].status.toLowerCase() == inputStatus &&
          placeMap.rows[i].places[j - 2].status.toLowerCase() == inputStatus &&
          placeMap.rows[i].places[j - 1].status.toLowerCase() == inputStatus &&
          placeMap.rows[i].places[j + 1].status.toLowerCase() == inputStatus &&
          placeMap.rows[i].places[j + 2].status.toLowerCase() == inputStatus) {
            return true
          }
      }
    }
    // check each column
    for (let i = 2; i < placeMap.rows.length - 2; i++){
      for (let j = 0; j < placeMap.rows[i].places.length; j++){
        if (placeMap.rows[i].places[j].status.toLowerCase() == inputStatus &&
        placeMap.rows[i - 2].places[j].status.toLowerCase() == inputStatus &&
        placeMap.rows[i - 1].places[j].status.toLowerCase() == inputStatus &&
        placeMap.rows[i + 1].places[j].status.toLowerCase() == inputStatus &&
        placeMap.rows[i + 2].places[j].status.toLowerCase() == inputStatus) {
          return true
        }
    }
  }  
    // check both diagnonals
    for (let i = 2; i < placeMap.rows.length - 2; i++){
      for (let j = 2; j < placeMap.rows[i].places.length - 2; j++){
        if (placeMap.rows[i].places[j].status.toLowerCase() == inputStatus &&
        placeMap.rows[i - 2].places[j - 2].status.toLowerCase() == inputStatus &&
        placeMap.rows[i - 1].places[j - 1].status.toLowerCase() == inputStatus &&
        placeMap.rows[i + 1].places[j + 1].status.toLowerCase() == inputStatus &&
        placeMap.rows[i + 2].places[j + 2].status.toLowerCase() == inputStatus) {
          return true
        }
      }
    }
  
    for (let i = 2; i < placeMap.rows.length - 2; i++){
      for (let j = 2; j < placeMap.rows[i].places.length - 2; j++){
        if (placeMap.rows[i].places[j].status.toLowerCase() == inputStatus &&
        placeMap.rows[i - 2].places[j + 2].status.toLowerCase() == inputStatus &&
        placeMap.rows[i - 1].places[j + 1].status.toLowerCase() == inputStatus &&
        placeMap.rows[i + 1].places[j - 1].status.toLowerCase() == inputStatus &&
        placeMap.rows[i + 2].places[j - 2].status.toLowerCase() == inputStatus) {
          return true
        }
      }
    }
    return false;
  }

}