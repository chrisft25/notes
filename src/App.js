import React, { Component } from 'react';
import './App.css';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import firebase from 'firebase';
import {DB_CONFIG} from './config/config';
import 'firebase/database';

class App extends Component {
constructor(){
  super();
  this.state=({
    notes: [
      // {
      //   noteId:1,
      //   noteContent:'nota 1'
      // },
      // {
      //   noteId:2,
      //   noteContent:'nota 2'
      // },
      // {
      //   noteId:3,
      //   noteContent:'nota 3'
      // }
    ]
  });
  this.addNote= this.addNote.bind(this);
  this.removeNote=this.removeNote.bind(this);
  this.app=firebase.initializeApp(DB_CONFIG);
  this.db = this.app.database().ref().child('notes');
}

componentDidMount(){
 const {notes}= this.state;
  this.db.on('child_added',snap=>{
  notes.push({
    noteId:snap.key,
    noteContent:snap.val().noteContent
  })
  this.setState({notes});
  });

  this.db.on('child_removed',snap=>{
    for(let i=0;i<notes.length;i++){
      if(notes[i].noteId==snap.key){
        notes.splice(i,1);
      }
    }
    this.setState({notes});
  });

}

removeNote(noteId){
if(window.confirm('Are you sure you want to delete the note?')){
    this.db.child(noteId).remove();
}
}

addNote(note){
  // let{notes}=this.state;
  // notes.push({
  //   noteId: notes.length+1 ,
  //   noteContent:note
  // });
this.db.push().set({noteContent: note});
}

  render() {
    return (
      <div className="notes">
      <div className="notesheader">
      <h1>Notes App</h1>
      
      </div>

      <div className="notesbody">
      <ul>
      {
        this.state.notes.map((notes,i)=>{
          return(
            <Note
            noteContent= {notes.noteContent}
            noteId= {notes.noteId}
            key={notes.noteId}
            removeNote={this.removeNote}
            />
          )
        })
      }
      </ul>
      </div>

      <div className="notesfooter">
      <NoteForm addNote={this.addNote}/>
      </div>
      </div>
    );
  }
}

export default App;
