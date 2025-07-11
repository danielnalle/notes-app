class NoteList extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
    <div class="card note-list">
      <div class="card-header">
        List Of Your Notes
      </div>
      <ul class="list-group list-group-flush">
      </ul>
    </div>`;
  }

  showNotes() {
    // const loading = document.createElement("loading");
    this.querySelector(".note-list .list-group").innerHTML =
      '<li class="p-3"><p class="lead text-center">Loading...</p></li>';
    const notes = fetch("https://notes-api.dicoding.dev/v2/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    notes
      .then((res) => res.json())
      .then((data) => {
        this.querySelector(".note-list .list-group").innerHTML = "";
        const notes = data.data;
        notes.forEach((note) => {
          const noteItem = document.createElement("note-item");
          noteItem.setAttribute("id", note.id);
          noteItem.setAttribute("title", note.title);
          noteItem.setAttribute("body", note.body);
          noteItem.setAttribute("createdAt", note.createdAt);
          noteItem.setAttribute("archived", note.archived);
          this.querySelector(".note-list .list-group").appendChild(noteItem);
        });
      })
      .catch((err) => alert(err.message));
  }

  // addNoteItem({ id, title, body, createdAt, archived }) {
  //   const noteItem = document.createElement('note-item');
  //   noteItem.setAttribute('id', id);
  //   noteItem.setAttribute('title', title);
  //   noteItem.setAttribute('body', body);
  //   noteItem.setAttribute('createdAt', createdAt);
  //   noteItem.setAttribute('archived', archived);
  //   this.querySelector('.note-list .list-group').appendChild(noteItem);
  // }
}

customElements.define("note-list", NoteList);
