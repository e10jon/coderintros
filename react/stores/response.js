// @flow

import {observable} from 'mobx'

export default class ResponseStore {
  @observable didSelectQuestion = false

  constructor (response: Object) {
    this.didSelectQuestion = !!response.question
  }
}
