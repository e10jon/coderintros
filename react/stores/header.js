// @flow

import {action, observable} from 'mobx'

export default class HeaderStore {
  @observable scrollHeaderIsEnabled = false
  @observable scrollHeaderIsVisible = false
  @observable scrollTitle = null

  @action disableScrollHeader = () => {
    this.scrollTitle = null
    this.scrollHeaderIsVisible = false
    this.scrollHeaderIsEnabled = false
  }

  @action enableScrollHeader = ({scrollTitle}: Object) => {
    this.scrollTitle = scrollTitle
    this.scrollHeaderIsEnabled = true
  }
}
