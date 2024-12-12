import React from "react";
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
import PeopleIcon from "@mui/icons-material/People";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const drawerWidth = 240;

const PersistentDrawer = ({ setSelectedMenu }) => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
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
                            icon: <PeopleIcon />,
                            component: "Shows",
                        },
                        {
                            text: "Movies",
                            icon: <MedicalServicesIcon />,
                            component: "Movies",
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
                    marginLeft: open ? `${drawerWidth}px` : 0,
                    transition: "margin 0.3s",
                }}
            >
                <Toolbar />
                <Typography variant="h4">Welcome to the Dashboard</Typography>
                <Typography>
                    Use the menu on the left to navigate through the app.
                </Typography>
            </Box>
        </Box>
    );
};

export default PersistentDrawer;
