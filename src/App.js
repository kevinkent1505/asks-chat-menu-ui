import './styles/App.scss';
import {
    AppBar,
    Button,
    ButtonGroup,
    createMuiTheme,
    Grid,
    Paper,
    TextField,
    ThemeProvider,
    Toolbar,
    Typography
} from "@material-ui/core";
import axios from 'axios';
import firebase from "firebase";
import {Command} from "./Command";
import {useEffect, useState} from "react";

function App() {
    const firebaseApp = firebase.apps[0];
    const theme = createMuiTheme({
        palette: {
            primary: {
                light: '#757ce8',
                main: '#006064',
                dark: '#002884',
                contrastText: '#fff',
            }
        }
    });
    const [commandList, setCommandList] = useState([]);
    const [startMsg, setStartMsg] = useState("");
    const [cancel, setCancel] = useState(0);

    let fetchCommandList = async () => {
        let res = await axios({
            method: 'get',
            url: 'https://asks-chat-menu-server.herokuapp.com/command',
            responseType: 'json'
        });

        setCommandList(res.data.commands);
    }

    let fetchStartMsg = async () => {

        let res = await axios({
            method: 'get',
            url: 'https://asks-chat-menu-server.herokuapp.com/command/startMsg',
            responseType: 'json'
        });
        if (res.data != null)
            setStartMsg(res.data.message);
    }

    useEffect(() => {
        //get command lists
        fetchCommandList();
        fetchStartMsg();
    }, []);

    let handleDelete = (data) => {
        let newCommandList = [...commandList];
        console.log(data);

        for (let i = 0; i < newCommandList.length; i++) {
            if (newCommandList[i].command === data) {
                newCommandList.splice(i, 1);
                break;
            }
        }
        setCommandList(newCommandList);

    }

    let handleAdd = () => {
        let newCommandList = [...commandList];
        newCommandList.push({
            message: " ",
            type: " ",
            command: " ",
            id: Math.floor(Math.random() * (50 - 1)) + 1
        });

        setCommandList(newCommandList);
    }

    let handleSave = async () => {
        let res = await axios({
            method: 'post',
            url: 'https://asks-chat-menu-server.herokuapp.com/command/all',
            data: {
                commands: commandList
            }
        });
        let resStartMsg = await axios({
            method: 'post',
            url: 'https://asks-chat-menu-server.herokuapp.com/command/startMsg',
            data: {
                message: startMsg
            }
        });
        fetchStartMsg();
        fetchCommandList();
    }

    let handleChangeCommand = (cmd, oldCmd) => {
        let newCommandList = [...commandList];

        for (let i = 0; i < newCommandList.length; i++) {
            if (newCommandList[i].command === oldCmd) {
                newCommandList[i].command = cmd;
                break;
            }
        }
        setCommandList(newCommandList);
        console.log(commandList);
    }

    let handleStartMsg = (msg) => {
        setStartMsg(msg);
    }

    let handleChangeMessage = (msg, oldMsg) => {


        let newCommandList = [...commandList];

        for (let i = 0; i < newCommandList.length; i++) {
            if (newCommandList[i].message === oldMsg) {
                newCommandList[i].message = msg;
                break;
            }
        }
        setCommandList(newCommandList);
        console.log(commandList);
    }
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                {/*Top bar*/}
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" className="title">
                            WhatsApp Chat Builder
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/*Main Content*/}
                <Grid container spacing={0} justify={"center"} className="editorContainer"
                >
                    <Grid container item xs={10} spacing={0}
                          style={{marginTop: "40px", marginLeft: "-40px", marginBottom: "40px"}}>
                        {/*  Builder UI  */}

                        <Paper elevation={2} style={{minWidth: "100%", minHeight: "80vh", padding: "20px"}}>
                            <form className="editorForm" noValidate autoComplete="off">

                                <TextField id="startingText" fullWidth multiline rows={4} variant="outlined"
                                           defaultValue={startMsg} placeholder={"Enter the starting message"}
                                           key={cancel}
                                           onChange={(e) => {
                                               handleStartMsg(e.target.value)
                                           }}/>

                            </form>
                            <br/>
                            <Typography variant="h6" align="center">
                                Command List:
                            </Typography>
                            <Grid container item xs={12} justify={'center'}>

                                {commandList.length > 0 ? commandList.map((item, i) => {
                                    console.log(item);
                                    return (<Command key={item.id}
                                                     textMsg={item.message} commandName={item.command}
                                                     handleDel={handleDelete} handleChangeCmd={handleChangeCommand}
                                                     handleChangeMsg={handleChangeMessage}/>)
                                }) : "No Commands"}
                            </Grid>


                            <Grid container item xs={12} alignContent={"center"} justify={"center"}>
                                <Button onClick={handleAdd}>
                                    Add Command
                                </Button>
                            </Grid>
                            <Grid container item xs={12} alignContent={"center"} justify={"center"}>
                                <ButtonGroup color="primary">
                                    <Button onClick={handleSave}>
                                        Save
                                    </Button>
                                    <Button onClick={() => {
                                        fetchStartMsg().then(()=>setCancel(!cancel));
                                        fetchCommandList();
                                    }}>
                                        Cancel
                                    </Button>
                                </ButtonGroup>
                            </Grid>


                        </Paper>
                    </Grid>
                    {/*<Grid container item md={4} xs={8} spacing={0}>*/}
                    {/*    /!*  Output Preview  *!/*/}
                    {/*    <Paper elevation={2} style={{minWidth: "100%", minHeight: "80vh", padding: "20px"}}>*/}

                    {/*    </Paper>*/}
                    {/*</Grid>*/}
                </Grid>

            </ThemeProvider>
        </div>
    )
        ;
}

export default App;
