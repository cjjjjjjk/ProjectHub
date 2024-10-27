import axios from "axios";
import { useState, useEffect } from "react";

function Profile() {
  const [userData, setUserData] = useState({
    id: null,
    name: "",
    email: "",
    bio: "",
    phone: "",
    company: "",
    location: "",
    dob: null,
    social_link: "",
    createAt: "",
    updateAt: "",
    avatar: ""
  })

  // Get user data =================== author: Hai
  const getUserfromServer = async () => {
    try {
      const token = sessionStorage.getItem('token')
      if (!token) throw new Error("No token in sesstion storage !")
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/users/profile`, {
        headers: {
          token: `${token}`
        }
      })
      console.log(res.data)
      setUserData(res.data)
    } catch (err) {
      console.error(err.message)
    }
  }
  //  =============================================

  useEffect(() => {
    getUserfromServer();
  }, [])


  return (
    <div> <br></br>
      <h1><strong>------Profile </strong></h1>
      <p><strong>------Name:</strong> {userData.name}</p>
    </div>
  );
}

export default Profile;
