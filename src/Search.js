import React, { useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

export default function SearchEngine() {
  const [city, setCity] = useState("");
  const [jobList, setJobList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function updateCity(event) {
    setCity(event.target.value);
  }

  function displayInfo(response) {
    setJobList(response.data);
    setLoaded(true);
    setIsLoading(false);
  }

  function submitSearch(event) {
    setIsLoading(true);
    event.preventDefault();
    if (city.length > 0) {
      let url = `https://devfinding.com/api/v1/jobs/search?query=${city}`
      axios
        .get(url)
        .then(displayInfo)
        .catch((error) => {
          setLoaded(false);
          alert("Error fetching data. Please try again later.");
          console.error(error);
        });
    } else {
      alert("Please type a city");
      setLoaded(false);
    }
  }

  if (isLoading) {
    return (
      <ReactLoading type="balls" color="red" height="100px" width="100px" />
    );
  }

  return (
    <div className="SearchEngine">
      <form onSubmit={submitSearch}>
        <input type="search" placeholder="Type keyword here..." onChange={updateCity} />
        <button type="submit">Search</button>
      </form>

      {loaded && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {jobList.map((job, index) => (
              <tr key={index}>
                <td>{job}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
