import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateUI } from 'store/ui'

class SearchForm extends Component {
  static contextTypes = {
    router: PropTypes.shape()
  }

  static propTypes = {
    s: PropTypes.string,
    updateUI: PropTypes.func.isRequired
  }

  static defaultProps = {
    s: ''
  }

  handleInputChange = ({target: {value: s}}) => {
    this.props.updateUI({s})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.context.router.history.push(`/?s=${this.props.s}`)
  }

  render () {
    return (
      <form
        className='flex'
        onSubmit={this.handleSubmit}
      >
        <input
          className='flex-auto h5 p1'
          onChange={this.handleInputChange}
          type='text'
        />
        <button
          className='bg-black p1 border-none'
          type='submit'
        >
          <i className='fa fa-lg fa-fw fa-search white' />
        </button>
      </form>
    )
  }
}

const mapStateToProps = state => ({ s: state.ui.s })
const mapDispatchToProps = dispatch => bindActionCreators({ updateUI }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
