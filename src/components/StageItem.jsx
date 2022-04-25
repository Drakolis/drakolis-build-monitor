import React from "react";
import PropTypes from "prop-types";
import { Chip } from "@mui/material";
import {
  CancelRounded,
  ChangeCircleRounded,
  CheckCircleRounded,
  ErrorRounded,
  HelpRounded,
  WatchLaterRounded,
} from "@mui/icons-material";
import {
  BUILD_STATE_FAIL,
  BUILD_STATE_NONE,
  BUILD_STATE_PROGRESS,
  BUILD_STATE_SUCCESS,
  BUILD_STATE_WAITING,
  BUILD_STATE_WARNING,
} from "../shared/constants";

function StageItem({ name, status }) {
  let rules = {
    color: "default",
    icon: <HelpRounded />,
  };
  switch (status) {
    case BUILD_STATE_SUCCESS:
      rules = {
        color: "success",
        icon: <CheckCircleRounded />,
      };
      break;
    case BUILD_STATE_WAITING:
      rules = {
        color: "info",
        icon: <WatchLaterRounded />,
      };
      break;
    case BUILD_STATE_PROGRESS:
      rules = {
        color: "primary",
        icon: <ChangeCircleRounded />,
      };
      break;
    case BUILD_STATE_WARNING:
      rules = {
        color: "warning",
        icon: <ErrorRounded />,
      };
      break;
    case BUILD_STATE_FAIL:
      rules = {
        color: "error",
        icon: <CancelRounded />,
      };
      break;
    case BUILD_STATE_NONE:
    default:
      break;
  }

  return (
    <Chip
      variant="contained"
      color={rules.color}
      icon={rules.icon}
      label={name}
    />
  );
}

const StageItemPropTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
StageItem.propTypes = StageItemPropTypes;

export { StageItem, StageItemPropTypes };
