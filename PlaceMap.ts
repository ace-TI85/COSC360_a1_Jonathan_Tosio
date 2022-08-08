import { boardPlaceSize, STATUS } from './const';
import Row from  './Row';
import { Gomoku } from './Gomoku';

export default class PlaceMap {
  rows: Row[];
  selectedPlaces: number[] = [];
  element: HTMLDivElement;
  gomoku: Gomoku;
  drawConditionCounter: number;

  constructor( rowNumber: number, placeNumberOnRow: number, gomoku: Gomoku) {
    this.rows = Array.from({ length: rowNumber }).map((_, index) => {
      return new Row(index, placeNumberOnRow, this, gomoku)
    })
    this.element = document.createElement('div')
    this.element.classList.add('board-container')
    this.element.style.height = `${(boardPlaceSize + 1) * 2}rem`;
    this.element.style.width = `${(boardPlaceSize + 1) * 2}rem`;
    this.element.append(...this.rows.map((row) => row.element))
    this.element.addEventListener('click', () => {
      this.updateSelectedPlaces()
    })
    this.gomoku = gomoku;
    this.drawConditionCounter = boardPlaceSize * boardPlaceSize;
  }

  hideRandomPlace(){
    const randomPlaceX = Math.floor(Math.random() * boardPlaceSize)
    const randomPlaceY = Math.floor(Math.random() * boardPlaceSize)
    var tempPlace = this.rows[randomPlaceY].places[randomPlaceX]

    if (tempPlace.element.style.visibility == "hidden") { 
      this.hideRandomPlace()
    }

    tempPlace.element.style.visibility = "hidden"
    tempPlace.status = STATUS.AVAILABLE
    this.drawConditionCounter -= 1
  }
  
  resetDrawCounter() {
    this.drawConditionCounter = boardPlaceSize * boardPlaceSize;
  }

  updateSelectedPlaces() {
    this.selectedPlaces = this.rows.map((row) => row.selectedPlacesId).flat()
    if (this.selectedPlaces.length == this.drawConditionCounter) {
      this.gomoku.updateTurnOrderText("Draw");
    }
  }
}