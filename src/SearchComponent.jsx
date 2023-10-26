import React, {useState} from "react";
import axios from "axios";
import ReactLoading from "react-loading";

export default function SearchEngine({onSearch}) {
    const [city, setCity] = useState("");
    const [jobList, setJobList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function updateCity(event) {
        setCity(event.target.value);
    }

    function displayInfo(response) {
        setJobList(response.data);
        console.log(response.data);
        setLoaded(true);
        setIsLoading(false);
    }

    function performSearch() {
        setIsLoading(true);
        if (city.length > 0) {
            let url = `https://devfinding.com/api/v1/jobs/search?query=${encodeURIComponent(city)}`;
            // let url = `http://127.0.0.1:3001/api/v1/jobs/search?query=${encodeURIComponent(city)}`;

            axios
                .get(url)
                .then(displayInfo)
                .catch((error) => {
                    setLoaded(false);
                    alert("Error fetching data. Please try again later.");
                    console.error(error);
                });
        } else {
            alert("Please type a title of job you want to find...");
            setLoaded(false);
            setIsLoading(false);
        }
    }

    function handleSearch(event) {
        event.preventDefault();
        performSearch();
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            performSearch();
        }
    }

    return (
        <div className="main-search-input-wrap">
            <div className="main-search-input fl-wrap">
                <div className="main-search-input-item">
                    <input
                        type="search"
                        placeholder="Type keyword here..."
                        onChange={updateCity}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <button className="main-search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>

            <div className="item">
                {isLoading && (
                    <ReactLoading type="balls" color="red" height="100px" width="100px"/>
                )}

                {loaded && (
                    <table>
                        <thead>
                        <tr>
                            <th>TITLE JOBS</th>
                        </tr>
                        </thead>
                        {jobList && jobList.length > 0 && (
                            <tbody>
                            {jobList.map((job) => (
                                <tr key={job["id"]}>
                                    <td>{job["title"]}</td>
                                    <td><a href={`https://devfinding.com/single_job/${job["id"]}`}>Link here to view
                                        details</a></td>
                                </tr>
                            ))}
                            </tbody>
                        )}

                    </table>
                )}
            </div>
        </div>
    );
}
