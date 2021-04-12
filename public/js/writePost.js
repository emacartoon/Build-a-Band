const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#post-title').value.trim();
  const posting = document.querySelector('#post-body').value.trim();

  if (name && location && posting) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ name, location, posting }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/create');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/posts');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')?.addEventListener('click', delButtonHandler);
