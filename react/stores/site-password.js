// @flow

import {action, observable} from 'mobx'

export default class SitePasswordStore {
  @observable isAuthorized = false
  @observable didFailAuthorization = false

  @action authorize = () => {
    this.isAuthorized = true
  }

  @action failedAuthorization = () => {
    this.didFailAuthorization = true
  }
}
