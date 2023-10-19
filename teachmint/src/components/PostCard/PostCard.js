import { useState, useEffect } from "react";
import "./PostCard.scss";
import { useParams, useLocation } from "react-router-dom";

export const PostCard = () => {
  const { id } = useParams();
  const postdata = useLocation();
  const [countryList, setCountryList] = useState([]);
  const [clockTime, setClockTime] = useState();
  const [posts, setPosts] = useState();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [clockTimeArray, setClockTimeArray] = useState([0, 0, 0]);
  const [hour, setHour] = useState(0);
  useEffect(() => {
    setPosts(
      postdata.state.posts.filter((postarray) => postarray.userId == id)
    );
  }, []);
  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone")
      .then((response) => response.json())
      .then((json) => setCountryList(json))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    const url = "http://worldtimeapi.org/api/timezone" + "/" + selectedCountry;
    selectedCountry &&
      fetch(url)
        .then((response) => response.json())
        .then((json) => setClockTime(json))
        .catch((error) => console.error(error));
  }, [selectedCountry]);
  useEffect(() => {
    if (clockTime) {
      const temp = clockTime && clockTime.datetime.split("T")[1];
      const hours = clockTime && parseInt(temp.slice(0, 2));
      setHour(hours);
      const minutes = clockTime && parseInt(temp.slice(3, 5));
      const seconds = clockTime && parseInt(temp.slice(6, 8));
      setClockTimeArray([hours, minutes, seconds]);
      console.log("clock", clockTime, clockTimeArray);
    }
  }, [clockTime, hour]);

  const timerFunction = (time) => {
    return time[0] + ":" + time[1] + ":" + time[2];
  };

  return (
    <div>
      <div className="timer-section">
        <div className="back-button">
          <button>Back</button>
        </div>
        <div className="timer-wrapper">
          <select onChange={(e) => setSelectedCountry(e.target.value)}>
            {countryList &&
              countryList.map((country) => {
                return (
                  <option value={country} style={{ cursor: "pointer" }}>
                    {country}
                  </option>
                );
              })}
          </select>
          <div className="clock-wrapper">{timerFunction(clockTimeArray)}</div>
          <button>Pause/Start</button>
        </div>
      </div>
      {/* {selectedCountry}
      {clockTime && clockTime.datetime.split("T")[1]}
      <br />
      {clockTimeArray} */}
      {/* {timerFunction(clockTimeArray)} */}
      <div>Profile Page</div>
      <div className="userdeatils-section">
        <div>
          <p>{postdata.state.users.name}</p>
          <p>{postdata.state.users.username}</p>
        </div>
        <div>
          {" "}
          <p>{postdata.state.users.address.city}</p>
          <p>{postdata.state.users.phone}</p>
        </div>
      </div>
      {/* <div>{postdata</div> */}
      <div className="postdeatils-section">
        {" "}
        {posts &&
          posts.map((post) => {
            return (
              <div className="post-box">
                <b>
                  {" "}
                  <p className="title-class">{post.title}</p>
                </b>
                <p>{post.body}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
