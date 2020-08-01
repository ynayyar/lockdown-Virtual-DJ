import React from "react";
import AudioClipsDetails from "../AudioClipsDetails";
import ClientSongsList from "./ClientSongsList";
import Musicplayer from "./Musicplayer";
import audioclips from "../AudioClipsDetails";

export default class ClientDashboard extends React.Component {
  state = {
    songs: [],
  };

  componentDidMount() {
    this.setState({
      songs: AudioClipsDetails,
    });
    localStorage.setItem("selectedCategory", "");
  }

  voteHandler = (songId, audioClipsDetails) => {
    let audioList = JSON.parse(localStorage.getItem("audioClipsDetails"));
    audioList = audioList || this.state.songs;
    audioClipsDetails = audioList.map((item) => {
      if (songId === item.id) {
        item = Object.assign({}, item, {
          requestCount: item.requestCount + 1,
        });
      }
      return item;
    });

    localStorage.setItem(
      "audioClipsDetails",
      JSON.stringify(
        audioClipsDetails.map((t) => ({
          id: t.id,
          label: t.label,
          category: t.category,
          requestCount: t.requestCount,
        }))
      )
    );
    this.setState({
      songs: audioClipsDetails,
    });
  };

  ShowMusicPlayer = () => {
    let isMusicPlayer = false;
    if (localStorage.getItem("loginname") === "yogesh-admin") {
      isMusicPlayer = true;
    }
    return isMusicPlayer;
  };

  RenderSongsCategories = () => {
    const key = "category";

    const songsCategoryList = [
      ...new Map(audioclips.map((item) => [item[key], item])).values(),
    ];

    return songsCategoryList.map((song, index) => {
      return (
        <button
          key={index}
          className="mbtn red"
          onClick={this.selectedCategory(song.category)}
        >
          {song.category}
        </button>
      );
    });
  };

  selectedCategory = (selCat) => {
    localStorage.setItem("selectedCategory", "");
    localStorage.setItem("selectedCategory", selCat);
  };

  render() {
    //sort songs with highest votes
    const selCategory = localStorage.getItem("selectedCategory");
    let SelectedCategorySongList = "";
    if (selCategory !== "") {
      SelectedCategorySongList = audioclips
        .filter((i) => i.category === selCategory)
        .map((song, id) => (
          <ClientSongsList
            key={song.id}
            id={song.id}
            category={song.category}
            requestCount={song.requestCount}
            label={song.label}
            voteSong={this.voteHandler}
            audioClipsDetails={this.AudioClipsDetails}
          />
        ));
    }

    let sortSongs = this.state.songs.sort((a, b) => {
      return b.requestCount - a.requestCount;
    });

    const sortedSongsList = sortSongs.map((item, index) => (
      <tr key={index}>
        <td>
          <p>{item.category}</p>
        </td>
        <td>
          <p>{item.label}</p>
        </td>
        <td>
          <i>{item.requestCount}</i>
        </td>
      </tr>
    ));

    const songsList = sortSongs.map((item) => (
      <ClientSongsList
        key={item.id}
        id={item.id}
        category={item.category}
        requestCount={item.requestCount}
        label={item.label}
        voteSong={this.voteHandler}
        audioClipsDetails={this.AudioClipsDetails}
      />
    ));
    return (
      <>
        {this.ShowMusicPlayer() ? (
          <Musicplayer />
        ) : (
          <>
            <div className="content">
              <div className="songCategories">
                {this.RenderSongsCategories()}
                <div>{SelectedCategorySongList}</div>
                <div>{songsList}</div>
              </div>
              <div className="songRequestList">
                <table className="songs">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Song</th>
                      <th>RequestCount</th>
                    </tr>
                  </thead>
                  <tbody>{sortedSongsList}</tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </>

      // <MDBContainer>
      //   <MDBRow>
      //     <MDBCol md="8"></MDBCol>
      //     <MDBCol md="4">

      //     </MDBCol>
      //   </MDBRow>
      // </MDBContainer>
      // <div className="ui unstackable-items">
      //   {songsList}
      //   <br />
      //   <br />
      //   {this.RenderSongsCategories()}

      // </div>
    );
  }
}
