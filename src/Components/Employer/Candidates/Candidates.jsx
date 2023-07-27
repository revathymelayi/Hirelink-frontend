import React ,{useState,useEffect}from 'react'
import {  useSelector } from "react-redux";
import axios from "../../../Config/axios"
function Candidates() {
  const [candidatesData, setCandidatesData] = useState([]);
  const user = useSelector((state) => state.loggedUser.userInfo);
  useEffect(() => {
    const fetchCandidatesData = async () => {
      try {
        const response = await axios.get('/api/employer/candidates');
        if (response.data && response.data.data) {
          setCandidatesData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching candidates data:', error);
      }
    };

    fetchCandidatesData();
  }, []);
  return (
    <div>
      Candidates
    </div>
  )
}

export default Candidates
