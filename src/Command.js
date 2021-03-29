import React, {useEffect, useState} from "react";
import {Button, Grid, InputLabel, MenuItem, Paper, Select, TextField} from "@material-ui/core";

export function Command(props) {

    const [command, setCommand] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {
        setCommand(props.commandName);
        setMessage(props.textMsg);
    }, []);

    let changeCmd = (val) => {
        setCommand(val);
    }
    let changeMsg = (val) => {
        setMessage(val);
    }
    return (
        <>
            <Paper elevation={2} style={{padding: "20px", marginTop: "10px"}}>
                <Grid container item xs={12} spacing={2}>
                    <Grid container item xs={6}>
                        <TextField className="commandName" defaultValue={props.commandName} onChange={(e) => {
                            props.handleChangeCmd(e.target.value, command);
                            changeCmd(e.target.value)
                        }} fullWidth label="Command"/>
                    </Grid>
                    <Grid container item xs={6}>
                        <InputLabel id={"commandType-label"}>Command Type</InputLabel>
                        <Select labelId="commandType-label" className={"command-type-select"} value={"txtMsg"}
                                fullWidth>
                            <MenuItem value={"txtMsg"}>Text Message</MenuItem>
                        </Select>
                    </Grid>
                    <Grid container item xs={12}>
                        <TextField className="Message Text" multiline defaultValue={props.textMsg} fullWidth
                                   onChange={(e) => {
                                       props.handleChangeMsg(e.target.value, message);
                                       changeMsg(e.target.value)
                                   }}
                                   label="Message Text"/>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={8}>

                        </Grid>
                        <Grid item xs={4}>
                            <Button type={"button"} color={"secondary"} style={{color: "red"}} onClick={() => {
                                props.handleDel(props.commandName)
                            }}>
                                Delete Command
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>


            </Paper>
        </>
    )
}