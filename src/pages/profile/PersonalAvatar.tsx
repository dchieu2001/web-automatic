import React,{ useEffect, useState } from 'react';

import { UPLOAD_PICTURE_DISABLED_TEXT } from './utils/constants';
import { supabase } from './../../config/supabase';
import { Avatar, Form, Radio, Input, Checkbox } from 'antd';
import { EditIcon } from '@material-ui/icons/EditIcon';
import { EditOutlined } from '@ant-design/icons';
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
  TextField,
  Button
} from "@material-ui/core";
let theme = createMuiTheme();
theme.typography.h6 = {
  fontSize: "1rem",
  "@media (min-width:900px)": {
    fontSize: "1.05rem"
  },
  "@media (min-width:1000px)": {
    fontSize: "1.1rem"
  },
  "@media (min-width:1200px)": {
    fontSize: "1.2rem"
  },
  "@media (min-width:1300px)": {
    fontSize: "1.25rem"
  }
};

// dummy data
const user = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "email@gmail.com",
  phone: "123456789",
  employeeId: "123",
  designation: "Some Position"
  //   imagelink: "This is my image",
};

const mapInformation = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  phone: "Phone",
  employeeId: "Employee ID",
  designation: "Designation"
};

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#594f8d",
    color: "white",
    padding: "1em",
    width: "60%",
    [theme.breakpoints.down(1200)]: {
      width: "70%"
    },
    [theme.breakpoints.down(1000)]: {
      width: "80%"
    },
    [theme.breakpoints.down(900)]: {
      width: "90%"
    },
    [theme.breakpoints.down(800)]: {
      width: "100%"
    }
  },
  form: {
    backgroundColor: "white",
    color: "#594f8d ",
    padding: "1em",
    width: "60%",
    [theme.breakpoints.down(1200)]: {
      width: "70%"
    },
    [theme.breakpoints.down(1000)]: {
      width: "80%"
    },
    [theme.breakpoints.down(900)]: {
      width: "90%"
    },
    [theme.breakpoints.down(800)]: {
      width: "100%"
    }
  }
}));

const UserInfoFormItem = (formState, onChange, propt, index) => {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={6}
      key={`display-${index}`}
      container
      direction="column"
      alignItems="center"
    >
      <Paper className={classes.form}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{mapInformation[propt]}</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            defaultValue={formState[propt]}
            name={Object.keys(user)[index]}
            onChange={onChange}
          />
        </Grid>
      </Paper>
    </Grid>
  );
};

const UserInfoGridItem = (formState, propt, index) => {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={6}
      key={`display-${index}`}
      container
      direction="column"
      alignItems="center"
    >
      <Paper className={classes.paper}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{mapInformation[propt]}</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6">{formState[propt]}</Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

const PersonalAvatar = ({ url, onUpload, disabled }: any) => {
  const [isForm, setIsForm] = useState(false);
  const [formInput, setFormInput] = useState(user);

  // ADD AJAX CALLS HERE IN A USE EFFECT HOOK, use api call to update formInput as the user info, once it works replace the initial state of form info with a blank string

  const handleEdit = () => setIsForm(true);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const handleSubmit = () => {
    setFormInput(formInput);
    setIsForm(false);
  };

  const toggleRender = () => {
    if (isForm) {
      return Object.keys(user).map((key, index) =>
        UserInfoFormItem(formInput, handleChange, key, index)
      );
    }

    return Object.keys(user).map((key, index) =>
      UserInfoGridItem(formInput, key, index)
    );
  };

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item sm={6} md={4} align="right">
              <Paper
                style={{ border: "2px solid", height: "200px", width: "200px" }}
              >
                Profile Picture
              </Paper>
            </Grid>
            <Grid item sm={6} md={8} alignt="left" container>
              <Grid item xs={12} container alignItems="flex-end">
                <Typography variant="h4">{`${user.firstName}`}</Typography>
                <EditOutlined
                  style={{ backgroundColor: "#FFFF66", marginLeft: "1rem", height:'40px',width:'40px' }}
                  onClick={handleEdit}
                >
                  {/* <EditIcon style={{ color: "white" }} /> */}
                </EditOutlined>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">{`${user.lastName}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {toggleRender()}
          <Grid item xs={12} align="center">
            {!isForm ? (
              <div></div>
            ) : (
              <Button
                style={{ color: "white", backgroundColor: "#594f8d" }}
                onClick={handleSubmit}
              >
                SAVE
              </Button>
            )}
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
};

export default PersonalAvatar;
