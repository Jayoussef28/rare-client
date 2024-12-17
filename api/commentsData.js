import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Get all comments
const getComments = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// Get comments by post ID
const getCommentsByPostId = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments?post_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// Create a comment
const createComments = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      label: payload,
    }),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Update a comment
const updateComments = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Delete a comment
const deleteComments = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comment/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getComments, getCommentsByPostId, createComments, deleteComments, updateComments,
};
