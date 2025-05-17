const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('postsContainer');

const posts = [];

postForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(Boolean);

  const post = { title, content, tags };
  posts.unshift(post);

  renderPosts();
  postForm.reset();
});

function renderPosts() {
  postsContainer.innerHTML = '';
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.className = 'post';

    postEl.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <div class="tags">Tags: ${post.tags.join(', ')}</div>
    `;

    postsContainer.appendChild(postEl);
  });
}

//Following code makes button press on posting_section file go back to index file
document.getElementById('goToPage').addEventListener('click', function () {
  window.location.href = 'another-page.html'; // Replace with your real URL
});
