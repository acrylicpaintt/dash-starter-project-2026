import React from 'react'
import './AddNodeButton.scss';

export class AddNodeButton extends React.Component {
    createNewNode = () => {
        // need to let it create various new nodes of all types
        alert("Hello World!")
    };
     
    render() {
        return ( 
            <button className="AddNodeButton" onClick={this.createNewNode}>Add New Node</button>     
        );
    }
}

export default AddNodeButton;