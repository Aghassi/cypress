const $dom = require('../dom')

const { stopPropagation } = window.MouseEvent.prototype

const create = (state, keyboard) => {
  const mouse = {
    mouseDown ($elToClick, fromViewport) {
      const el = $elToClick.get(0)

      const win = $dom.getWindowByElement(el)

      const mdownEvtProps = keyboard.mixinModifiers({
        bubbles: true,
        cancelable: true,
        view: win,
        clientX: fromViewport.x,
        clientY: fromViewport.y,
        buttons: 1,
        detail: 1,
      })

      const mdownEvt = new window.MouseEvent('mousedown', mdownEvtProps)

      //# ensure this property exists on older chromium versions
      if (mdownEvt.buttons == null) {
        mdownEvt.buttons = 1
      }

      mdownEvt.stopPropagation = function (...args) {
        this._hasStoppedPropagation = true

        return stopPropagation.apply(this, args)
      }

      const canceled = !el.dispatchEvent(mdownEvt)

      const props = {
        preventedDefault: canceled,
        stoppedPropagation: !!mdownEvt._hasStoppedPropagation,
      }

      const modifiers = keyboard.getActiveModifiersArray()

      if (modifiers.length) {
        props.modifiers = modifiers.join(', ')
      }

      return props
    },

    mouseUp ($elToClick, fromViewport) {
      const el = $elToClick.get(0)

      const win = $dom.getWindowByElement(el)

      const mupEvtProps = keyboard.mixinModifiers({
        bubbles: true,
        cancelable: true,
        view: win,
        clientX: fromViewport.x,
        clientY: fromViewport.y,
        buttons: 0,
        detail: 1,
      })

      const mupEvt = new MouseEvent('mouseup', mupEvtProps)

      //# ensure this property exists on older chromium versions
      if (mupEvt.buttons == null) {
        mupEvt.buttons = 0
      }

      mupEvt.stopPropagation = function (...args) {
        this._hasStoppedPropagation = true

        return stopPropagation.apply(this, args)
      }

      const canceled = !el.dispatchEvent(mupEvt)

      const props = {
        preventedDefault: canceled,
        stoppedPropagation: !!mupEvt._hasStoppedPropagation,
      }

      const modifiers = keyboard.getActiveModifiersArray()

      if (modifiers.length) {
        props.modifiers = modifiers.join(', ')
      }

      return props
    },

    click ($elToClick, fromViewport) {
      const el = $elToClick.get(0)

      const win = $dom.getWindowByElement(el)

      const clickEvtProps = keyboard.mixinModifiers({
        bubbles: true,
        cancelable: true,
        view: win,
        clientX: fromViewport.x,
        clientY: fromViewport.y,
        buttons: 0,
        detail: 1,
      })

      const clickEvt = new MouseEvent('click', clickEvtProps)

      //# ensure this property exists on older chromium versions
      if (clickEvt.buttons == null) {
        clickEvt.buttons = 0
      }

      clickEvt.stopPropagation = function (...args) {
        this._hasStoppedPropagation = true

        return stopPropagation.apply(this, args)
      }

      const canceled = !el.dispatchEvent(clickEvt)

      const props = {
        preventedDefault: canceled,
        stoppedPropagation: !!clickEvt._hasStoppedPropagation,
      }

      const modifiers = keyboard.getActiveModifiersArray()

      if (modifiers.length) {
        props.modifiers = modifiers.join(', ')
      }

      return props
    },
  }

  return mouse
}

module.exports = { create }
