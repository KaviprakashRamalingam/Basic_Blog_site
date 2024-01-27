// To retrive the data from JSON
function fetchPosts() {
    addFile(function (response) {
        let posts = JSON.parse(response);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
    });
}

// Establish XMLHttpRequest and use GET method to fetch JSON data
function addFile(callback) {
    let xhr = new XMLHttpRequest();
    let blogData = '/data/blog.json';
    // xhr.overrideMimeType("application/json");
    xhr.open('GET', blogData);  //, true
    xhr.onreadystatechange = function () {
        // xhr.addEventListener('load', function() {
        // Check the respose and this.readyState to finds if reponse is ready
        if (xhr.readyState == 4 && xhr.status == "200") {
            callback(xhr.responseText);
        }
    };
    xhr.send(null);
}

// To display the loaded posts
function displayPosts() {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    let postsSection = document.getElementById('postsSection');

    postsSection.innerHTML = '';
    // For loop to add all the data in JSON
    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        let postDiv = `
        <div class="post">
            <h2 onclick="this.parentElement.classList.toggle('post-expanded')">${post.title}</h2>
            <div class="contentBody" id="content${i}">${post.content}</div>
            <p id="author${i}"><b>Author:</b> ${post.author}</p>
            <p><b>Date:</b> ${post.date}</p>
            <button class="update" id="update${i}">Update</button>&nbsp &nbsp
            <button class="complete" id="complete${i}">Complete</button>
        </div>
    `;
        postsSection.insertAdjacentHTML('beforeend', postDiv);

        // Update the Author & Cotent field
        // Added event listener click
        document.getElementById(`update${i}`).addEventListener('click', function () {
            let content = document.getElementById(`content${i}`).contentEditable = "true";
            let author = document.getElementById(`author${i}`).contentEditable = "true";
        });
        // Complete the editing of Author & Cotent field
        // Added event listener click
        document.getElementById(`complete${i}`).addEventListener('click', function () {
            let content = document.getElementById(`content${i}`).contentEditable = "false";
            let author = document.getElementById(`author${i}`).contentEditable = "false";
        });
    }
}

// Submit button to create new blog and add in the List
// Added event listener click
document.getElementById('submit').addEventListener('click', function () {
    let title = document.getElementById('title').value;
    let content = document.getElementById('content').value;
    let author = document.getElementById('author').value;

    // Check if title is filled
    if (title === '') {
        event.preventDefault();
        alert('Title is required.');
        return false; // Stop the function if title is not filled
    }

    // Format the date
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are 0-based in JavaScript
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    let post = {
        title: title,
        content: content,
        author: author,
        date: formattedDate,
    };
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    displayPosts();
});

// Fetch the blog posts
fetchPosts();

let card = document.getElementById('card');
let span = document.getElementsByClassName('close')[0];

// On click event is implemented to crete a card
document.getElementById('createCard').onclick = function () {
    card.style.display = 'block';
}

// To close the card
span.onclick = function () {
    card.style.display = 'none';
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('author').value = '';
}

window.onclick = function (event) {
    if (event.target == card) {
        card.style.display = 'none';
    }
}


