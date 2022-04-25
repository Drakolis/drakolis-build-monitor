import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";
import { StageItem, StageItemPropTypes } from "./StageItem";

function BuildItem({ id, name, date, stages }) {
  return (
    <Card>
      <CardHeader
        key={id}
        title={name}
        style={{
          paddingBottom: 2,
        }}
        titleTypographyProps={{
          style: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        }}
      />
      <CardContent
        style={{
          paddingTop: 2,
        }}
      >
        <div>Date: {date.toLocaleString()}</div>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2}>
          {stages.map((stage) => (
            <StageItem
              key={stage.name}
              name={stage.name}
              status={stage.status}
            />
          ))}
        </Stack>
      </CardActions>
    </Card>
  );
}

const BuildItemPropTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.objectOf(Date).isRequired,
  stages: PropTypes.arrayOf(PropTypes.shape(StageItemPropTypes)).isRequired,
};
BuildItem.propTypes = BuildItemPropTypes;

export { BuildItem, BuildItemPropTypes };
