var noteTitle = (".note-title");
var noteText = (".note-textarea");
var saveNoteBtn = (".save-note");
var newNoteBtn = (".new-note");
var noteList = (".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = function() {
  return fetch('/api/notes')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
};

// A function for saving a note to the db
var saveNote = function(note) {
  return fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
};


// BONUS A function for deleting a note from the db
var deleteNote = function(id) {
  return fetch(`/api/notes/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return { success: true }; 
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
  saveNoteBtn.hide();

  if (activeNote.id) {
    noteTitle.attr("readonly", true);
    noteText.attr("readonly", true);
    noteTitle.val(activeNote.title);
    noteText.val(activeNote.text);
  } else {
    noteTitle.attr("readonly", false);
    noteText.attr("readonly", false);
    noteTitle.val("");
    noteText.val("");
  }
};

// Get the note data from the inputs, save it to the db, and update the view
var handleNoteSave = function() {
  var newNote = {
    title: document.querySelector('#noteTitle').value,
    text: document.querySelector('#noteText').value
  };

  saveNote(newNote)
    .then(function(data) {
      getAndRenderNotes();
      renderActiveNote();
    })
    .catch(function(error) {
      console.error('Error saving note:', error);
      // Handle any errors that occur during the save operation
    });
};


// BONUS Delete the clicked note
var handleNoteDelete = function(event) {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  var noteElement = event.target.closest('.list-group-item');
  var noteId = noteElement.dataset.id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId)
    .then(function() {
      getAndRenderNotes();
      renderActiveNote();
    })
    .catch(function(error) {
      console.error('Error deleting note:', error);
      // Handle any errors that occur during the delete operation
    });
};


// Sets the activeNote and displays it
var handleNoteView = function(event) {
  activeNote = event.target.closest('.list-group-item').dataset;
  renderActiveNote();
};

// Sets the activeNote to an empty object and allows the user to enter a new note
var handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};


// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function() {
  var noteTitleValue = document.querySelector('#noteTitle').value.trim();
  var noteTextValue = document.querySelector('#noteText').value.trim();
  var saveNoteBtn = document.querySelector('#saveNoteBtn');

  if (!noteTitleValue || !noteTextValue) {
    saveNoteBtn.style.display = 'none';
  } else {
    saveNoteBtn.style.display = 'block';
  }
};


// Render's the list of note titles
var renderNoteList = function(notes) {
  var noteList = document.getElementById('noteList');
  noteList.innerHTML = ''; // Clear existing list

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.dataset.id = note.id;

    var span = document.createElement('span');
    span.textContent = note.title;

    var delBtn = document.createElement('i');
    delBtn.className = 'fas fa-trash-alt float-right text-danger delete-note';

    li.appendChild(span);
    li.appendChild(delBtn);

    noteListItems.push(li);
  }

  noteListItems.forEach(function(item) {
    noteList.appendChild(item);
  });
};


var saveNoteBtn = document.getElementById('saveNoteBtn');

// Attach event listener to saveNoteBtn
saveNoteBtn.addEventListener('click', handleNoteSave);

// Define other variables and attach event listeners
var noteList = document.getElementById('noteList');
var newNoteBtn = document.getElementById('newNoteBtn');
var noteTitle = document.querySelector('.note-title');
var noteText = document.querySelector('.note-textarea');

noteList.addEventListener('click', function(event) {
  if (event.target.classList.contains('list-group-item')) {
    handleNoteView(event);
  }
});
newNoteBtn.addEventListener('click', handleNewNoteView);
noteList.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-note')) {
    handleNoteDelete(event);
  }
});
noteTitle.addEventListener('input', handleRenderSaveBtn);
noteText.addEventListener('input', handleRenderSaveBtn);

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};

// Gets and renders the initial list of notes
getAndRenderNotes();
