import React from "react";
import PropTypes from "prop-types";
import { Divider, Grid } from "@mui/material";
import { BuildItem, BuildItemPropTypes } from "./BuildItem";

function BuildGroupItem({ id, name, builds }) {
  return (
    <div key={id}>
      <Divider textAlign="left">
        <h2>{name}</h2>
      </Divider>
      <Grid container gap={2}>
        {builds.map((build) => (
          <Grid item key={`${id}_${build.id}`}>
            <BuildItem
              groupId={id}
              id={build.id}
              name={build.name}
              stages={build.stages}
              date={new Date(build.date)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

BuildGroupItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  builds: PropTypes.arrayOf(PropTypes.shape(BuildItemPropTypes)).isRequired,
};

export { BuildGroupItem };
