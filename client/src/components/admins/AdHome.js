import React, {useState} from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import TheatersIcon from '@mui/icons-material/Theaters';
import AdDashboard from "./AdDashBoard";
import MovieManagement from "./movieManagement/MovieManagement";

const drawerWidth = 240;

const PersistentDrawer = () => {
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [selectedMenu, setSelectedMenu] = useState("Dashboard");
    const renderContent = () => {
        switch (selectedMenu) {
            case "Dashboard":
                return <AdDashboard />
            case "Shows":
                return <div>Shows Content</div>;
            case "Movies":
                return <MovieManagement />
            case "BackToWebsite":
                return window.location.href = "http://localhost:3000";
            default:
                return <div>Welcome to the Admin Dashboard!</div>;
        }

    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {/* AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
                    // height: "50px",
                    marginLeft: open ? `${drawerWidth}px` : 0,
                    transition: "width 0.3s, margin 0.3s",
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer}
                        sx={{ marginRight: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Management
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* Drawer */}
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Toolbar />
                <List>
                    {[
                        {
                            text: "Dashboard",
                            icon: <DashboardIcon />,
                            component: "Dashboard",
                        },
                        {
                            text: "Shows",
                            icon: <TheatersIcon />,
                            component: "Shows",
                        },
                        {
                            text: "Movies",
                            icon: <MovieCreationIcon />,
                            component: "Movies",
                        },
                        {
                            text: "Back to website",
                            icon: <ArrowBackIcon />,
                            component: "BackToWebsite",
                        },
                    ].map((item) => (
                        <ListItemButton
                            key={item.text}
                            onClick={() => {
                                console.log(`${item.text} clicked`);
                                setSelectedMenu(item.component);
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: 3,
                    // marginLeft: open ? `${drawerWidth}px` : 0,
                    transition: "margin 0.3s",
                }}
            >
                <Toolbar />
                <Typography variant="h4">Welcome to the Dashboard</Typography>
                <div>
                    {renderContent()}
                </div>
                {/* <Typography>
                    Use the menu on the left to navigate through the app.
                </Typography> */}
            </Box>
        </Box>
    );
};

export default PersistentDrawer;
