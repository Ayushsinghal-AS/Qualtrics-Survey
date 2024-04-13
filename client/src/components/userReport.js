import React, { useEffect, useState} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import uploadIcon from '../Assets/Images/uploadphotoicon.png';
import { requestAPI } from './../API/index';
import Cookies from 'js-cookie';
import { qualtricsResponse } from '../API/url';
import { Card, CardContent, TextField, Button } from '@mui/material';


export const mainListItems = () => {
    return (
        <React.Fragment>
          <NavLink to="/survey" style={{textDecoration : "None" , color: "unset"}}>
              <ListItemButton>
                  <ListItemIcon>
                      <PeopleIcon />
                  </ListItemIcon>
                <ListItemText primary="Survey" />
              </ListItemButton>
          </NavLink>
          <NavLink to="/report" style={{textDecoration : "None" , color: "unset"}}>
              <ListItemButton>
                  <ListItemIcon>
                      <BarChartIcon  />
                  </ListItemIcon>
                  <ListItemText primary="Report" />
              </ListItemButton>
          </NavLink>
          <NavLink to="/studio" style={{textDecoration : "None" , color: "unset"}}>
              <ListItemButton>
                  <ListItemIcon>
                      <LayersIcon />
                  </ListItemIcon>
                  <ListItemText primary="AI studio" />
              </ListItemButton>
          </NavLink>
    </React.Fragment>
    )
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

function UserReport() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();


    const [surveyResponse, setSurveyResponse] = useState([]);

    const handleReport = async() => {
        try {
            const data = await requestAPI.getAPI(`${qualtricsResponse.GET}/${Cookies.get('email')}`);
            if(data.success === true){
                setSurveyResponse(data.data);

            }else{
                console.log("error");
            }
            
        } 
        catch (error) {
            console.log(error)   
        }
    }

    useEffect(() => {
        const fetchData = async () => {
        await handleReport();
        };
        fetchData();
    }, []);

    const groupedResponses = {};

surveyResponse.forEach((response) => {
  const id = response.id;

  if (!groupedResponses[id]) {
    groupedResponses[id] = {
      para_questions: response.para_questions,
      questions: [],
    };
  }

  groupedResponses[id].questions.push({
    subQuestions: response.subQuestions,
    QAns: response.QAns,
  });
});
const renderedResponses = Object.values(groupedResponses);

console.log("surveyResponse",surveyResponse);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () =>{
    navigate('/login');
  };
  
  const handleChange = () =>{
    navigate('/');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            > 
              <NavLink to="/" style={{textDecoration : "none"}} onClick={handleChange}>
                <img src='https://www.qualtrics.com/m/qualtrics-xm-long.svg' alt='surveylogo' width={110} height={32}/>
              </NavLink>
            </Typography>
            <div>
            <div className="dropdown navbarAdmin">
                <button className="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <Avatar alt="userIcon" src={uploadIcon} style={{ width: "32px", height: "32px" }} />
                </button>
                <ul className="dropdown-menu dropdownCustomize shadow-lg" aria-labelledby="dropdownMenuButton1">
                    <NavLink to="/login" style={{textDecoration : "none"}} onClick={handleLogout}>
                        <li><a className="dropdown-item" href="/">Logout</a></li>
                    </NavLink>
                </ul>
                </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
          {mainListItems()}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" style={{textAlign:"center", marginTop:"20px"}}>Question and Answer Report</Typography>
        </Grid>
          
        {renderedResponses.map((group, index) => (
          <Grid item xs={12} key={index} style={{ marginLeft: '5%' }}>
            <Card sx={{ maxWidth: '95%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ me: 1.5 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '25px' }}>{group.para_questions}</div>
                  <br /><br />
                  {group.questions.map((question, qIndex) => (
                    <div key={qIndex}>
                      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>Question {qIndex + 1}: {question.subQuestions}</div>
                      Ans: {question.QAns}
                      <br /><br />
                    </div>
                  ))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))};
    </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default UserReport

