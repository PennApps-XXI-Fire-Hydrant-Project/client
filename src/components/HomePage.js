import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import LeafletMap from './LeafletMap';

// import "./HomePage.css";
import { joinRoom } from '../requests';

function HomePage() {
  const [redirect, setRedirect] = useState(false);
  const [userHandle, setUserHandle] = useState('');
  useEffect(() => {
    const handle = JSON.parse(localStorage.getItem('chatData') || '{}');
    setUserHandle(handle.handle);
  }, []);

  const [selectedChatRoom, setSelectedChatRoom] = useState('');
  useEffect(() => {
    const room = JSON.parse(localStorage.getItem('chatData') || '{}');
    setSelectedChatRoom(room.chatRoomName);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
    console.log(e.target);

    localStorage.setItem('chatData', JSON.stringify(formDataObj));
    await joinRoom(formDataObj.chatRoomName);
    setRedirect(true);
  };

  const handleUserName = (e) => {
    setUserHandle(e.target.value);
  };

  if (redirect) {
    return <Redirect to='/chatroom' />;
  }

  return (
    <div className='home-page'>
      <h1>Join a Hydrant Chat</h1>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md='12' controlId='handle'>
            <Form.Label>Handle</Form.Label>
            <Form.Control
              type='text'
              name='handle'
              placeholder='Handle'
              value={userHandle || ''}
              onChange={handleUserName}
            />
          </Form.Group>
          <Form.Group as={Col} md='12' controlId='chatRoomName'>
            <Form.Label>Chat Room Name</Form.Label>
            <Form.Control
              type='text'
              name='chatRoomName'
              placeholder='Chat Room Name'
              value={selectedChatRoom || ''}
              readOnly
            />
          </Form.Group>
        </Form.Row>
        <Button type='submit' style={{ marginRight: '10px' }}>
          Join
        </Button>
      </Form>
      <LeafletMap setSelectedChatRoom={setSelectedChatRoom} />
    </div>
  );
}
export default HomePage;
