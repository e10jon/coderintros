import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { Header } from 'components/header'

const noFunc = () => {}

test('Header renders all possible elements', t => {
  const header = {
    imageSrc: 'header.jpg',
    imageAlt: 'the alt text',
    title: 'title',
    titleTo: '/whatever',
    subtitle: 'the subtitle',
    byline: {
      authorImageSrc: 'author.jpg',
      authorImageAlt: 'author alt text',
      authorName: 'bob',
      authorTo: '/bob',
      date: 'Apr 1, 1997'
    }
  }

  const context = {
    pagesRes: {
      data: [{
        id: 1,
        link: '/a-page',
        nav_title: 'the nav title'
      }]
    }
  }

  const wrapper = shallow(
    <Header
      header={header}
      updateUI={noFunc}
    />, {context}
  )

  t.is(wrapper.find('header').length, 1)

  t.is(wrapper.findWhere(c => (
    c.type() === 'img' &&
    c.prop('src') === 'header.jpg' &&
    c.prop('alt') === 'the alt text'
  )).length, 1)

  t.is(wrapper.findWhere(c => (
    c.type() && c.type().name === 'Link' &&
    c.prop('to') === '/whatever' &&
    c.prop('dangerouslySetInnerHTML').__html === 'title'
  )).length, 1)

  t.is(wrapper.findWhere(c => (
    c.prop('dangerouslySetInnerHTML') && c.prop('dangerouslySetInnerHTML').__html === 'the subtitle'
  )).length, 1)

  t.is(wrapper.find('Byline').length, 1)

  const pageLinkProps = wrapper.find('#header-page-li-1').children().at(0).props()
  t.is(pageLinkProps.to, '/a-page')
  t.deepEqual(pageLinkProps.dangerouslySetInnerHTML, {__html: 'the nav title'})
})

test('Header renders minimum elements', t => {
  const wrapper = shallow(
    <Header updateUI={noFunc} />
  )

  t.is(wrapper.find('header').length, 1)
})

test('Header opens the menu', t => {
  const updateUI = sinon.spy()
  const wrapper = shallow(
    <Header updateUI={updateUI} />
  )

  wrapper.find('#header-menu-button').simulate('click')

  t.pass(updateUI.calledWith({ isMobileMenuShown: true }))
})
