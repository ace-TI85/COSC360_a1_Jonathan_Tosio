import { Place } from './Place'
import PlaceMap from './PlaceMap'
import { Gomoku } from './Gomoku'
import { boardPlaceSize } from './const'

export default class Row {
  rowNumber: number
  places: Place[]
  element: HTMLDivElement
  placeMap: PlaceMap

  constructor(rowNumber: number, placeNumber: number, placeMap: PlaceMap, gomoku: Gomoku) {
    this.rowNumber = rowNumber
    this.places = Array.from({ length: placeNumber }).map((_, index) => {
      const placeId = placeNumber * rowNumber + index
      return new Place(placeId, placeMap, gomoku)
    })
    this.element = document.createElement('div')
    this.element.style.height = `${100 / ( boardPlaceSize - 1 ) }%`;
    this.element.classList.add('row')
    this.element.append(... this.places.map((place) => place.element))
  }

  get selectedPlacesId() {
    return this.places.filter((place) => place.isSelected).map((place) => place.placeId)
  }
}