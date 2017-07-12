// @flow

import React, {PureComponent} from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'

@observer
class WelcomeStep extends PureComponent {
  static contextTypes = {
    store: MobxReactPropTypes.observableObject
  }

  props: {
    children: Object,
    step: number,
    title: ?(string | Object)
  }

  render () {
    if (this.props.step !== this.context.store.activeSlide) {
      return null
    }

    return (
      <div>
        <div className='h2 bold line-height-3 mb2'>{this.props.title}</div>
        {this.props.children}
      </div>
    )
  }
}

export default WelcomeStep
