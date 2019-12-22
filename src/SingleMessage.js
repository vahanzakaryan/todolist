import React from "react"
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './App.css';

export default class SingleMessage extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
    }
    get props(){
        return this._props;
    }
    set props(props){
        this._props = props;
    }
    render(){
        const {item, deleteMessage, dialogWindow, divOnclick} = this.props;
        return(
            <>
            <div className = {item.checked ? "messageHolderActive" : "messageHolder"} onClick = {() => divOnclick(item)}>
                <Checkbox
                    checked = {item.checked}
                    value="secondary"
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                {
                    item.text
                }
            </div>
            <ButtonGroup className = "buttGroup" variant="contained" color = "primary">
                <Button 
                    className = "buttonCreate"
                    onClick = {() => dialogWindow(item)}
                    >
                        Edit
                </Button>
                <Button 
                    className = "buttonCreate"
                    cursor = "pointer"
                    onClick = {() => deleteMessage(item)}
                >
                    Remove
                </Button>
            </ButtonGroup>
            </>
        );
            }
}