import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import ChatSearchbar from "./chat-searchbar"; // Ensure you have a ChatSearchbar component
import UserSearchbar from "./user-searchbar";
import Iconify from "../../components/iconify";

function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function SearchTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="search tabs"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab
          sx={{ width: "50%" }}
          label={
            <Iconify
              icon="lets-icons:chat-alt-add-fill"
              style={{ fontSize: "24px" }}
            />
          }
          {...a11yProps(0)}
        />
        <Tab
          sx={{ width: "50%" }}
          label={
            <Iconify icon="lets-icons:chat-fill" style={{ fontSize: "24px" }} />
          }
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <UserSearchbar />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <ChatSearchbar /> */}
      </TabPanel>
    </Box>
  );
}
