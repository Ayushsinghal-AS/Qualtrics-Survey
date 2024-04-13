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
import { getLink } from '../API/url';




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

function UserSurvey() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [link, setLink] = useState("");

  const handleSurvey = async() => {
    try {
        const data = await requestAPI.getAPI(`${getLink.GET}/${Cookies.get('UUID')}`);
        if(data.success === true){
            setLink(data.data);

        }else{
            console.log("data not found");
        }
        
    } catch (error) {
        console.log("error",error)   
    }
}


  useEffect(() => {
    const fetchData = async () => {
      await handleSurvey();
    };
    fetchData();
  }, []);

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
            <div>
               <iframe src={link} title="survey Link" width="100%" height={620}/>
           </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default UserSurvey

