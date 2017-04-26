import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { Home } from 'containers/home'

test('Home renders', t => {
  const updateHeader = sinon.spy()

  const homePageRes = {
    data: [{
      link: 'http://home.com/',
      title: { rendered: 'home' },
      subtitle: 'the subtitle',
      _embedded: {
        'wp:featuredmedia': [{
          media_details: {
            sizes: {
              large: {
                source_url: 'home.jpg'
              }
            }
          }
        }]
      }
    }]
  }

  const stickyPostsRes = {
    data: [{
      link: 'http://somehwere.com/',
      title: { rendered: 'home' }
    }]
  }

  const context = {
    categoriesRes: {
      data: [{
        link: 'http://somewhere.com/category',
        name: 'category'
      }]
    },
    recentPostsRes: {
      data: [{
        link: 'http://somehwere.com/post',
        title: { rendered: 'title' }
      }]
    },
    archivesLinksRes: {
      data: [{
        html: 'a link'
      }]
    }
  }

  const wrapper = shallow(<Home {...{updateHeader, homePageRes, stickyPostsRes}} />, {context})

  const helmetComponents = wrapper.findWhere(c => c.type() && c.type().name === 'HelmetWrapper').children()
  t.is(helmetComponents.find('title').text(), 'Home')
  t.is(helmetComponents.find('meta[property="og:url"]').prop('content'), 'http://home.com/')
  t.is(helmetComponents.find('meta[property="og:type"]').prop('content'), 'website')
  t.is(helmetComponents.find('meta[property="og:title"]').prop('content'), 'home')
  t.is(helmetComponents.find('meta[property="og:description"]').prop('content'), 'the subtitle')
  t.is(helmetComponents.find('meta[property="og:image"]').prop('content'), 'home.jpg')
})
