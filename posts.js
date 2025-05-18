const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('postsContainer');
const tagButtons = document.getElementById('tagButtons');
const button = document.getElementById('soundButton');
const sound = document.getElementById('clickSound');



const posts = [];
let activeTags = [];

postForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(Boolean);

  const post = { title, content, tags, replies: [] };
  posts.unshift(post);

  updateTagButtons();
  renderPosts();
  postForm.reset();
});

function updateTagButtons() {
  const allTags = [...new Set(posts.flatMap(post => post.tags))];
  tagButtons.innerHTML = '';

  allTags.forEach(tag => {
    const btn = document.createElement('button');
    btn.textContent = tag;
    btn.className = activeTags.includes(tag) ? 'active' : '';
    btn.addEventListener('click', () => {
      if (activeTags.includes(tag)) {
        activeTags = activeTags.filter(t => t !== tag);
      } else {
        activeTags.push(tag);
      }
      updateTagButtons();
      renderPosts();
    });
    tagButtons.appendChild(btn);
  });

  if (allTags.length > 0) {
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear All Filters';
    clearBtn.addEventListener('click', () => {
      activeTags = [];
      updateTagButtons();
      renderPosts();
    });
    tagButtons.appendChild(clearBtn);
  }
}

function renderPosts() {
    postsContainer.innerHTML = '';
  
    posts
      .filter(post => {
        if (activeTags.length === 0) return true;
        return activeTags.every(tag => post.tags.includes(tag));
      })
      .forEach((post, index) => {
        const postEl = document.createElement('div');
        postEl.className = 'post';
  
        // Create HTML structure
        postEl.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <div class="tags">Tags: ${post.tags.join(', ')}</div>
          <div class="replies" id="replies-${index}">
            ${post.replies?.map(reply => `<p class="reply">${reply}</p>`).join('') || ''}
          </div>
          <textarea rows="2" placeholder="Write a reply..." id="replyInput-${index}"></textarea>
          <button onclick="addReply(${index})">Reply</button>
        `;
  
        postsContainer.appendChild(postEl);
      });
  }

function addReply(index) {
    const input = document.getElementById(`replyInput-${index}`);
    const replyText = input.value.trim();
    if (replyText) {
      posts[index].replies = posts[index].replies || [];
      posts[index].replies.push(replyText);
      input.value = '';
      renderPosts();
    }
}

button.addEventListener('click', function () {
  sound.currentTime = 0; // Rewind in case it's still playing
  sound.play();
});
