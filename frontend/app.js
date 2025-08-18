(async () => {
  const res = await fetch('http://localhost:5000/api/news');
  const data = await res.json();

  const list = document.getElementById('news-list');
  list.innerHTML = '';

  data.forEach(n => {
    list.insertAdjacentHTML('beforeend', `
      <div class="card">
        <h3>${n.title}</h3>
        <p>${n.content}</p>
        <small>Penulis: ${n.author.username}</small>
      </div>
    `);
  });
})();