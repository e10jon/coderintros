// @flow

import React, {PureComponent} from 'react'
import {FaPencil as EditResponseIcon} from 'react-icons/lib/fa'

class ContentEditable extends PureComponent {
  static defaultProps = {
    allowReturnKeyPress: false,
    NodeName: 'span'
  }

  props: {
    allowReturnKeyPress: boolean,
    dangerouslySetInnerHTML: ?Object,
    NodeName: string,
    onBlur: ?Object,
    placeholder: ?string
  }

  handleKeyDown = (e: Object) => {
    if (e.keyCode === 13 && !this.props.allowReturnKeyPress) {
      window.getSelection().removeAllRanges()
    }
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
            onKeyDown={this.handleKeyDown}
            placeholder={this.props.placeholder}
          />
        </span>
      </span>
    )
  }
}

export default ContentEditable
