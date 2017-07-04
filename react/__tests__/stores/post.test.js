import PostStore from '../../stores/post'

test('renders', () => {
  const store = new PostStore()
  expect(store).toBeTruthy()
})
