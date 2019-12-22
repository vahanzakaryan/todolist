import React from 'react';
import newID from "uuid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import './App.css';
import './SingleMessage.js';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SingleMessage from './SingleMessage.js';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentText: "",
      messages: [],
      showDialogWindow: false,
      dialogText: "",
      editingItem: {}
    };
  }

  addMessage(){
    const {currentText} = this.state;
    const id = newID.v4();
    const {messages} = this.state;
    if(!currentText.trim()){
      return;
    }
    this.setState({messages: 
      [...messages, {
        id: id,
        text: currentText.trim(),
        checked: false
      }]
    })
    this.setState({currentText: ""});
  };
  
  onKeyDown = event => {
    if(event.keyCode === 13){
      this.addMessage();
    }
  };
  
  inputProps = {
    onKeyDown: this.onKeyDown
  };

  changeStateText = event => {
    this.setState({currentText: event.target.value});
  }

  drawMessage = item => {
    return(
      <SingleMessage 
        key = {item.id} 
        item = {item} 
        deleteMessage = {this.deleteMessage.bind(this)}
        dialogWindow = {this.dialogWindow.bind(this)}
        divOnclick = {this.divOnclick.bind(this)}
      />
    );
  };

  dialogWindow = item => {
    this.setState({showDialogWindow:true});
    this.setState({dialogText: item.text.trim()});
    this.setState({editingItem: item});
  }

  dialogTextUpdater = event => {
    this.setState({
      dialogText: event.target.value
    })
  }

  deleteMessage = item => {
    const {messages} = this.state;
    let newMessages = messages.filter(arrItem => arrItem.id !== item.id)
    this.setState({
      messages: newMessages
    })
  }

  closeWindow = () => {
    this.setState({showDialogWindow:false});
  }

  windowSave = () => {
    const {editingItem} = this.state;
    if(!this.state.dialogText.trim()){
      return;
    }
    editingItem.text = this.state.dialogText;
    this.setState({editingItem: editingItem})
    this.setState({showDialogWindow: false});
  }

  divOnclick = item => {
    item.checked = !item.checked;
    const {messages} = this.state;
    let newMessages = messages.map(function(message){
      if(message.id !== item.id){
        message.checked = false;
      }else{
        message.checked = item.checked;
      }
      return message;
    })
    this.setState({messages: newMessages});
  }

  render(){
    const {messages, currentText} = this.state;
    return (
      <>
      <Dialog
        open={this.state.showDialogWindow}
        //onClose={false}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle align = "center" id="form-dialog-title">Edit window</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Edit message"
            fullWidth
            className = "inputField"
            value={this.state.dialogText}
            onChange={this.dialogTextUpdater}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeWindow} color="primary">
            Cancel
          </Button>
          <Button onClick={this.windowSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
        <div className = "textFieldHolder">
          <TextField
            className = "textField"
            id = "outlined-basic"
            label = "Write message"
            value = {currentText}
            variant = "outlined"
            onChange = {this.changeStateText}
            InputProps = {this.inputProps}
          />
        </div>
        <div className = "sendDiv">
          <IconLabelButtons 
            disabled = {this.state.currentText}
            addMessage = {this.addMessage.bind(this)}
          />
        </div>
        <div>
          {messages.map(item => this.drawMessage(item))}
        </div>
      </>
    );
  }
}
const useStyles = makeStyles(theme => ({
  button: {
    height:"20%",
    margin: theme.spacing(1),
    fontWeight: "bold",
    fontSize: "100%",
    width: "26.7%",
    backgroundColor: "rgb(190, 171, 137)",
    "&:hover": {
      backgroundColor: "rgb(151, 134, 104)"
    }
  }
}));

export function IconLabelButtons(props) {
  const classes = useStyles();
  const {addMessage} = props;
  return (
      <Button
        disabled = {!props.disabled.trim()}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick = {addMessage}
        //endIcon={<Icon>send</Icon>}
      >
        Send
      </Button>
  );
}

export default App;
