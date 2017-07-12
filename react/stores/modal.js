// @flow

import {action, computed, observable} from 'mobx'

export default class ModalStore {
  @observable isOpen = false
  @observable activeSlide = 0
  @observable nextSlide = 1
  @observable prevSlide = -1

  numSlides = 0
  wasAutoOpened = null

  constructor ({isOpen}: {isOpen?: boolean} = {}) {
    this.isOpen = isOpen
  }

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

  handleClose = this.close
  handleOpen = this.open

  @action handleNextSlideClick = () => {
    this.goToSlide(this.activeSlide + 1 > this.numSlides ? 0 : this.activeSlide + 1)
  }

  @action handlePrevSlideClick = () => {
    this.goToSlide(this.activeSlide - 1 < 0 ? this.numSlides - 1 : this.activeSlide - 1)
  }

  @action goToSlide = (index: number) => {
    this.activeSlide = index
    this.nextSlide = this.activeSlide + 1
    this.prevSlide = this.activeSlide - 1
  }

  @computed get showNextButton (): boolean {
    return this.activeSlide < this.numSlides - 1
  }

  @computed get showPrevButton (): boolean {
    return this.activeSlide > 0
  }
}
