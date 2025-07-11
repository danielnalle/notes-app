class NoteItem extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title");
    const body = this.getAttribute("body");
    const createdAt = this.getAttribute("createdAt");
    // const archived = this.getAttribute('archived');
    this.innerHTML = `
    <li class="list-group-item">
      <h3>${title}</h3>
      <p class="meta">Created at: ${createdAt}</p>
      <p>${body}</p>
      <button type="button" class="btn btn-danger">Delete</button>
    </li>
    `;

    this.querySelector("button").addEventListener("click", this.delete);
  }

  delete(e) {
    e.preventDefault();
    const isDelete = confirm("Are you sure?");
    if (isDelete) {
      const id = this.parentNode.parentNode.getAttribute("id");
      const note = fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
        method: "DELETE",
      });

      note
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          document.querySelector("note-list").showNotes();
        })
        .catch((err) => alert(err.message));
    }
  }
}

customElements.define("note-item", NoteItem);
