import axios from "axios";
import React, { useEffect, useState } from "react";
import './FetchUser.css'

const URL=' https://randomuser.me/api/?results=5';
const FetchUserData = () => {
    const [users, setUsers] = useState([]);
    const [add, setAdd] = useState([]);
    const [visible, setVisible] = useState([]);
    const [temp, setTemp] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    
    useEffect(()=>{
        axios.get(URL)
             .then((Response) => {
                if (Response.data) {
                    setUsers(Response.data.results);
                    console.log(Response) ;  
                } 
            })
            .catch(error => console.log(error))
            .finally();
    },[]);
   
    const isVisible = (uuid) => {
        console.log(uuid);
        return visible.find(id => id === uuid)
    }

    const enable=(uuid)=>{
        console.log(uuid);
        setVisible(visible.filter(id => id!== uuid)); 

    }
    const fetchdata = users.map((User, index) => {
        return (
            <div key={index} className="card">
                <img alt="img" src={`${User.picture.medium}`} className="imgcard"/>
                <spam>Name : {`${User.name.title} ${User.name.first} ${User.name.last}`}</spam>
                <spam>Gender : {User.gender}</spam>
                <spam>Phone : {User.phone}</spam>
                <spam>Email : {User.email}</spam>
                <spam>State  : {`${User.location.state} `}</spam>
                <spam>Country :{`${User.location.country}`}</spam>
                <button key={User.login.uuid}                
                    disabled={isVisible(User.login.uuid)}
                    onClick={() => {
                        setAdd([...add, User]);
                        setVisible([...visible, User.login.uuid]);
                        setTemp([...temp, User]);
                    }} className="addfav">Add to Favorite</button>
            </div>
        );          
    });

    function fetchUser() {
       
        axios.get(URL)
		.then((Response) => {
            if (Response.data) {
                setUsers(Response.data.results);
              
            } 
        }).catch(error => console.log(error)).finally(()=>setIsLoading(false));
    }
    useEffect(() => {
        fetchUser();
    }, []);
    if (isLoading) return "Loading..";
    
    function Remove(data){
        setAdd(add.filter(id => id.login.uuid !== data));
     }
    const display = add.map((fav, index) => {
        return (
            <div key={index} className="card">
                <img alt="img" src={`${fav.picture.medium}`} className="imgcard"/>
                <spam>Name : {`${fav.name.title} ${fav.name.first} ${fav.name.last}`}</spam>
                <spam>Gender : {fav.gender}</spam>
                <spam>Phone : {fav.phone}</spam>
                <spam>Email : {fav.email}</spam>
                <spam>State : {`${fav.location.state}`}</spam>
                <spam>Country : {`${fav.location.country}`}</spam>
                <button key={fav.login.uuid}  onClick={() => { 
                                enable(fav.login.uuid);
                                setTemp([...temp,fav]);
                                Remove(fav.login.uuid);
                                }} className="addfav">Remove</button>
            </div>
        );
    })



  return (
      <>
            <div className="container">
                <div className="refdiv">
                    <div > <button className="refresh" onClick={fetchUser}>Refresh</button>
                    </div> 
                 </div>
            <br/></div>
            {/* <button className="refresh" onClick={fetchUser}>Refresh</button> */}
            
       
            <div className="subcard" >{fetchdata}</div><br/>
            <div className="subcard2">{display}</div>
    
    </>
  )
}

export default FetchUserData