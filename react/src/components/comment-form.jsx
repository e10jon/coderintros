import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateUI } from 'store/ui'
import WPRequest from 'helpers/wp-request'

export const IN_PROGRESS = 'IN_PROGRESS'
export const DONE = 'DONE'
export const ERRORED = 'ERRORED'

export class CommentForm extends Component {
  static propTypes = {
    comment: PropTypes.shape(),
    commentSubmissionStatus: PropTypes.string,
    postId: PropTypes.number.isRequired,
    updateUI: PropTypes.func.isRequired
  }

  static defaultProps = {
    comment: {},
    commentSubmissionStatus: null
  }

  handleChange = ({target: {name, value}}) => {
    this.props.updateUI({comment: {...this.props.comment, [name]: value}})
  }

  handleSubmit = async e => {
    const { content, name, email } = this.props.comment
    const { postId, updateUI } = this.props

    e.preventDefault()

    updateUI({commentSubmissionStatus: IN_PROGRESS})

    try {
      await new WPRequest('/wp/v2/comments', {
        method: 'post',
        data: {
          post: postId,
          content,
          author_name: name,
          author_email: email
        }
      })
      updateUI({commentSubmissionStatus: DONE})
    } catch (err) {
      updateUI({commentSubmissionStatus: ERRORED})
    }
  }

  render () {
    const { commentSubmissionStatus } = this.props

    const labelClassName = 'h5 bold inline-block'
    const inputClassName = 'col-12 p1 h4'

    return (
      <form onSubmit={this.handleSubmit}>
        <div className='h3 mb2'>{'Leave a Reply'}</div>
        <div className='mb2'>
          <textarea
            className={inputClassName}
            name='content'
            onChange={this.handleChange}
            required
          />
        </div>
        <div className='mb2'>
          <label
            className={labelClassName}
            htmlFor='name'
          >
            {'Name*'}
          </label>
          <input
            className={inputClassName}
            id='name'
            name='name'
            onChange={this.handleChange}
            required
            type='text'
          />
        </div>
        <div className='mb2'>
          <label
            className={labelClassName}
            htmlFor='email'
          >
            {'Email*'}
          </label>
          <input
            className={inputClassName}
            id='email'
            name='email'
            onChange={this.handleChange}
            required
            type='email'
          />
        </div>

        <div className='right-align'>
          <button
            className='bg-black white h5 py1 px2 border-none bold'
            disabled={[IN_PROGRESS, DONE].includes(commentSubmissionStatus)}
            type='submit'
          >
            {'Submit'}
          </button>
          {commentSubmissionStatus === DONE ? <div>{'Thank you!'}</div> : null}
          {commentSubmissionStatus === ERRORED ? <div>{'There was an error.'}</div> : null}
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  comment: state.ui.comment,
  commentSubmissionStatus: state.ui.commentSubmissionStatus
})

const mapDispatchToProps = dispatch => bindActionCreators({ updateUI }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
