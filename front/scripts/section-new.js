/* global username, courseSlug */

/**
 * @file Submit new section code.
 */

import axios from 'axios';

function saveListener() {

  let sectionSaveBtn = document.getElementById('section-new');

  if (!sectionSaveBtn) {
    return;
  }

  const newSectionEndpoint = '/' + username + '/' + courseSlug;

  sectionSaveBtn.addEventListener('click', () => {
    const title = document.getElementById('title-edit').value;
    const content = document.querySelector('trix-editor').innerHTML;

    if (!title) {
      return;
    }

    axios.post(newSectionEndpoint, {
      title,
      content,
    })
    .then(function (response) {
      window.location = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  });
}

export default {
  saveListener,
};
