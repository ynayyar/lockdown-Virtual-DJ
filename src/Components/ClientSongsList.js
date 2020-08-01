import React from "react";

export default function ClientSongsList(props) {
  return (
    <div>
      <div>
        <p>{props.category}</p>
        <p>{props.label}</p>
        <button
          onClick={props.voteSong.bind(this, props.id, props.audioClipsDetails)}
        >
          Request Song
        </button>
        <i>{props.requestCount}</i>
      </div>
    </div>
  );
}
