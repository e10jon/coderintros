import React from 'react'
import {shallow} from 'enzyme'

import Document from '../../pages/_document'

test('renders', () => {
  const component = shallow(<Document __NEXT_DATA__={{props: {siteData: {images: {}}}}} />)
  expect(component).toBeTruthy()
})
