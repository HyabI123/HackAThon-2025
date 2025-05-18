const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('postsContainer');
const tagButtons = document.getElementById('tagButtons');
const button = document.getElementById('soundButton');
const sound = document.getElementById('clickSound');
const deleteSound = document.getElementById('deleteSound');



const posts = [
  {
    title: "Looking for Roommate - Off Campus",
    content: "I'm a 3rd year looking for someone to split rent with near campus. Budget is around $900/month. Hit me up!",
    tags: ["off-campus", "roommate", "urgent"],
    replies: [{ text: "Hello, I was wondering how many people are living in this house?", createdByUser: false }],
  },
  {
    title: "Looking for Cowell roommates",
    content: "Looking for 2 more people in Cowell Dorms. I tend to stay clean, but also stay up late. Reach out if interested!",
    tags: ["on-campus", "available"],
    replies: [{text: "Hello, I sent you an email!", createdByUser: false }],
  },

  {
    title: "Off Campus - 2-Bedroom Apartment Near Downtown",
    content: "Hey! I’m subletting one room in my 2-bed apartment near the Santa Cruz Boardwalk. Rent is $850/month.",
    tags: ["off-campus", "2-bed", "sublet", "inclusive"]
  },

  {
    title: "Off Campus - Looking for Roommates for Westside House",
    content: "3-bedroom house, 10 minute walk from Mission St., looking for two roommates to move in over the summer.",
    tags: ["off-campus", "3-bed", "summer"]
  },


];
let activeTags = [];

postForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(Boolean);

  const post = { title, content, tags, replies: [], createdByUser: true };
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
    
  ${post.replies?.map((reply, rIndex) => `
    <div class="reply">
      <p>${reply.text}</p>
      ${reply.createdByUser ? `<button onclick="deleteReply(${index}, ${rIndex})">Delete</button>` : ''}
    </div>
  `).join('') || ''}


  </div>
  <textarea rows="2" placeholder="Write a reply..." id="replyInput-${index}"></textarea>
  <button onclick="addReply(${index})">Reply</button>
  ${post.createdByUser ? `<button onclick="deletePost(${index})" class="delete-button">Delete</button>` : ''}
`;

  
        postsContainer.appendChild(postEl);
      });
  }

function addReply(index) {
    const input = document.getElementById(`replyInput-${index}`);
    const replyText = input.value.trim();
    if (replyText) {
      posts[index].replies = posts[index].replies || [];
      
      posts[index].replies.push({
        text: replyText,
        createdByUser: true
      
      
      });
      
      input.value = '';

      playClickSound(); 

      renderPosts();
    }
}

function deletePost(index) {
  playDeleteSound();
  
  posts.splice(index, 1);
  renderPosts();
  updateTagButtons();
}

function playClickSound() {
  sound.currentTime = 0;
  sound.play();
}

function playDeleteSound() {
  deleteSound.currentTime = 0;
  deleteSound.play();
}

function deleteReply(postIndex, replyIndex){
  posts[postIndex].replies.splice(replyIndex, 1)
  renderPosts();
  deleteSound.play();

}


renderPosts();
updateTagButtons();
button.addEventListener('click', function () {
  sound.currentTime = 0; 
  sound.play();
});
