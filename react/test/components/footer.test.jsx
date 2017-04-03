import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

import { Footer } from 'components/footer'

test('Footer renders', t => {
  const wrapper = shallow(<Footer />)

  t.is(wrapper.find('footer').length, 1)
})
