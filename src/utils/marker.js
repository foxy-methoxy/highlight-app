import { createHighlighter } from 'rangy-highlighter'
import { createClassApplier } from 'rangy-classapplier'

class Marker {
  constructor(options = {}) {
    this.settings = {
      className: 'highlight',
      handleMarkerClick: () => {},
      ...options,
    }

    this.highlighter = createHighlighter();


    const classApplier = createClassApplier(this.settings.className, {
      ignoreWhiteSpace: true,
      elementTagName: 'mark',
      elementProperties: {
        onclick: (event) => {
          const highlight = this.highlighter.getHighlightForElement(
            event.target
          )
          this.settings.handleMarkerClick(highlight)
        },
      },
    })

    this.highlighter.addClassApplier(classApplier)

    this.mark = this.mark.bind(this)
    this.unmark = this.unmark.bind(this)
  }

  init() {
    const savedHighlights = window.localStorage.getItem('highlights');
    if(savedHighlights) {
        this.highlighter.deserialize(savedHighlights);
    }
  }


  highlight() {
    return this.highlighter.highlightSelection(this.settings.className)[0];
  }

  mark() {
   this.highlight();
   this.saveMarkers();
   saveMarkersAsJSON();
  }

  unmark() {
    this.highlighter.unhighlightSelection();
    this.saveMarkers();
    saveMarkersAsJSON();
  }

  saveMarkersAsJSON() {
    const markers = Array.from(document.getElementsByTagName('mark'));
    const markersInnerHTML = markers.map((marker, index) => ({innerHTML: marker.innerHTML, id: index}));
    window.localStorage.setItem('markersJSON', JSON.stringify(markersInnerHTML));
  }

  saveMarkers() {
    const serialized = this.highlighter.serialize();
    window.localStorage.setItem('highlights', serialized);
  }
}

export default Marker
