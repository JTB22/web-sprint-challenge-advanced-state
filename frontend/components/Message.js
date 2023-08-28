import React from "react";
import { connect } from "react-redux";

function Message(props) {
  console.log(props);
  return <div id="message">{props.message}</div>;
}

const mapStateToProps = (st) => {
  return {
    message: st.infoMessage,
  };
};

export default connect(mapStateToProps)(Message);
