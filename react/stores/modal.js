// @flow

import {action, observable} from 'mobx'

export default class {
  @observable isOpen = false
  wasAutoOpened = null

  @action autoOpen = () => {
    this.isOpen = true
    this.wasAutoOpened = true
  }

  @action close = () => {
    this.isOpen = false
  }

  @action open = () => {
    this.isOpen = true
  }
}
