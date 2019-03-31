import React,{Component} from 'react';
import './Note.css';

class Note extends Component{
    constructor(props){
        super(props);
        this.noteId=props.noteId;
        this.noteContent=props.noteContent;
    }
    
    handleRemove(id){
     this.props.removeNote(id);
    }

    render(){
        return(
        <div className="Note">
        <span
        onClick={()=>{this.handleRemove(this.noteId)}}
        >&times;</span>
            <p>{this.noteContent}</p>
        </div>
        )
        
    }
}

export default Note;