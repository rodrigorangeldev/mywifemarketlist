import React from 'react'
import { Modal } from 'react-materialize';

export default function ModalSaveList({ header, text, trigger }){

  return <Modal header={ header } options={{inDuration: 50, outDuration: 50}} trigger={trigger}>
    { text }
  </Modal>
}

