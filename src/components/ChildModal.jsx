import React from 'react';
import { Modal } from 'react-bootstrap';

const ChildModal = ({content,close}) => {

  return (
      <Modal show={!!content} onHide={close} backdrop="static" style={{
        zIndex:99999,
        backgroundColor:'#00000070'
      }}
      centered>
        <Modal.Header closeButton>
          <Modal.Title>SINGLE CONTACT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Phone</th>
              <th scope="col">Country</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td scope="col">{content?.id}</td>
                  <td scope="col">{content?.phone}</td>
                  <td scope="col">{content?.country?.name}</td>
                </tr>
          </tbody>
        </table>
        </Modal.Body>
      </Modal>
  );
};

export default ChildModal;