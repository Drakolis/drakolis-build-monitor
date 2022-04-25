import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import axios from "axios";
import { BuildGroupItem } from "./BuildGroupItem";
import config from "../shared/config";

export function Viewport() {
  const [buildGroups, setBuildGroups] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      axios("http://localhost:1701/").then((resp) => setBuildGroups(resp.data));
    }, config.appSettings.updateTime);
    return () => clearInterval(interval);
  }, []);

  return (
    <Stack spacing={2} style={{ margin: 15 }}>
      {buildGroups.map((group) => (
        <BuildGroupItem
          key={group.id}
          id={group.id}
          name={group.name}
          builds={group.builds}
        />
      ))}
    </Stack>
  );
}
