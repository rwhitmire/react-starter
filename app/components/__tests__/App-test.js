import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import App from '../App'

test('App should render', () => {
  const renderer = ReactTestUtils.createRenderer()
  renderer.render(<App />)
  const tree = renderer.getRenderOutput()
  expect(tree).toMatchSnapshot()
})
