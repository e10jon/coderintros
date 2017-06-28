// @flow

import React, {PureComponent} from 'react'
import {FaPencil as EditResponseIcon} from 'react-icons/lib/fa'

class ContentEditable extends PureComponent {
  static defaultProps = {
    NodeName: 'span'
  }

  props: {
    dangerouslySetInnerHTML: ?Object,
    NodeName: string,
    onBlur: ?Object,
    placeholder: ?string
  }

  render () {
    const {NodeName} = this.props

    return (
      <span className='flex items-center content-editable'>
        <EditResponseIcon />
        <span className='block flex-auto'>
          <NodeName
            className='block'
            contentEditable
            dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML}
            onBlur={this.props.onBlur}
            placeholder={this.props.placeholder}
          />
        </span>
      </span>
    )
  }
}

export default ContentEditable
