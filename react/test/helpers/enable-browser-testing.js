import browserEnv from 'browser-env'
import Modal from 'react-modal'

export default function () {
  browserEnv()
  Modal.setAppElement(document.body)
}
