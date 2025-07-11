class NoteForm extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
    <div class="card">
      <div class="card-header">
        Add New Form
      </div>
      <div class="card-body">
        <form>
          <div class="mb-3">
            <label for="title" class="form-label">Title:</label>
            <input type="text" class="form-control" id="title" required>
          </div>
          <div class="mb-3">
            <label for="body" class="form-label">Body:</label>
            <textarea name="body" class="form-control" id="body" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Add</button>
        </form>
      </div>
    </div>
    `;
  }

  connectedCallback() {
    this.querySelector("form").addEventListener("submit", this.addNote);
  }

  addNote = (event) => {
    event.preventDefault();
    const title = this.querySelector("#title").value;
    const body = this.querySelector("#body").value;

    if (title && body) {
      // const id = Date.now();
      // const createdAt = new Date().toLocaleString();
      // const archived = false;

      const newNote = fetch("https://notes-api.dicoding.dev/v2/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
        }),
      });

      newNote
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          document.querySelector("note-list").showNotes();
        })
        .catch((err) => alert(err.message));
      this.querySelector("form").reset();
    }
  };
}

customElements.define("note-form", NoteForm);
