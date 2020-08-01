import React, { Component } from "react";
import audioclips from "../AudioClipsDetails";

export default class Musicplayer extends Component {
  state = {
    songsAudioClips: [],
  };

  componentDidMount() {
    this.setState({
      songsAudioClips: audioclips,
    });
  }

  SoundPlay = (music, audioList, id) => {
    music.play();
    localStorage.setItem(
      "audioClipsDetails",
      JSON.stringify(
        audioList.map((t) => ({
          id: t.id,
          requestCount: t.id === id ? 0 : t.requestCount,
        }))
      )
    );
  };

  SoundPause = (music) => {
    music.pause();
  };

  SoundStop = (music) => {
    music.stop();
  };

  RenderButtonAndSound = () => {
    let audioList = JSON.parse(localStorage.getItem("audioClipsDetails"));
    audioList = audioList || audioclips;
    audioList = audioclips
      .map((soundObjt, index) => {
        const soundObj = Object.assign(
          { ...soundObjt },
          {
            requestCount: audioList.filter((t) => t.id === soundObjt.id)[0]
              .requestCount,
          }
        );
        return soundObj;
      })
      .sort((a, b) => {
        return b.requestCount - a.requestCount;
      });

    return audioList.map((soundObj, index) => {
      return (
        <tr key={index}>
          <td>
            <button key={index} onClick={() => this.SoundPause(soundObj.sound)}>
              Pause
            </button>
          </td>
          <td>
            <button
              key={index}
              onClick={() => {
                soundObj.requestCount = 0;
                return this.SoundPlay(soundObj.sound, audioList, soundObj.id);
              }}
            >
              Play{" "}
            </button>
          </td>
          <td>
            <span>{soundObj.label}</span>
          </td>
          <td>
            <span>{soundObj.requestCount}</span>
          </td>
          <td>
            <span>{soundObj.category}</span>
          </td>
          <td>
            <button key={index} onClick={() => this.SoundStop(soundObj.sound)}>
              Stop
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    //Howler.volume(1.0);
    return (
      <div>
        <table className="songs">
          <thead>
            <tr>
              <th>Pause</th>
              <th>Play</th>
              <th>Song Name</th>
              <th>Request Count</th>
              <th>Category</th>
              <th>Stop</th>
            </tr>
          </thead>
          <tbody>{this.RenderButtonAndSound()}</tbody>
        </table>
      </div>
    );
  }
}
