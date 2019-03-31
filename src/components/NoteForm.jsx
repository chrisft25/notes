import React, {Component} from 'react';
import './NoteForm.css';

class NoteForm extends Component{

    constructor(){
        super();
        this.addNote=this.addNote.bind(this);
    }

    addNote(){
        this.props.addNote(this.textInput.value);
        this.textInput.value='';
        this.textInput.focus();
    }

    render(){
        return(
            <div className="NoteForm">
            <input 
            placeholder="Write your note"
            ref={input=>{this.textInput=input;}}
            type="text"
            />

            <button
            onClick={this.addNote}
            >Add Note</button>
            </div>

        )
    }

}

export default NoteForm;