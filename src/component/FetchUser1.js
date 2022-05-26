import axios from "axios";
import React, { useEffect, useState } from "react";
import './FetchUser.css'
import { Card,Button,ListGroup} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ArrowRepeat} from "react-bootstrap-icons";
import {PersonPlus,PersonDash} from "react-bootstrap-icons";


// using Bootstrap..
const URL=' https://randomuser.me/api/?results=5';

const FetchUser1 = () => {

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
                    console.log("data ->", Response.data.results) ;  
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
        
        setVisible(visible.filter(id => id!== uuid)); 
    }

   
    // display user in card... with add fav button..
    const fetchdata = users.map((User, index) => {
        const addClick=()=>{
            setAdd([...add, User]);
            setVisible([...visible, User.login.uuid]);
            setTemp([...temp, User]);
        }
        return (
            <Card key={index}  style={{ boxShadow:'1px 2px 5px #000000',border:'8px',width: '20rem'}}>
                <Card.Img alt="img" src={`${User.picture.large}`}
                 variant="top" style={{ width: '100%' ,height:'290px',display:'block'}}/>
                <Card.Body >
                    <Card.Title style={{fontSize:'15px',fontFamily:'cursive',fontWeight:'bold'}}>
                        Name : {`${User.name.title} ${User.name.first} ${User.name.last}`}
                        </Card.Title>
                    </Card.Body>
                <ListGroup variant="flush" style={{fontSize:'15px',fontFamily:'cursive'}}>
                    <ListGroup.Item >Gender : {User.gender}</ListGroup.Item>
                    <ListGroup.Item >Phone : {User.phone}</ListGroup.Item>
                    <ListGroup.Item>Email : {User.email}</ListGroup.Item>
                    <ListGroup.Item >State  : {User.location.state}</ListGroup.Item>
                    <ListGroup.Item >Country :{User.location.country}</ListGroup.Item>
                </ListGroup>
                <Button variant="primary" key={User.login.uuid} 
                            disabled={isVisible(User.login.uuid)}
                           onClick={() => { addClick() }}
                     className="addbutton"><PersonPlus size='22' style={{marginRight:'15px',marginBottom:'2px'}}/>Add To Favorite</Button> 
            </Card>
        );
  
        
    });

       
        function fetchUser() {
         // refresh api...
            axios.get(URL)
            .then((Response) => {
                if (Response.data) {
                    setUsers(Response.data.results);
                   
                } 
            })
            .catch(error => console.log(error))
            .finally(()=>setIsLoading(false));
        }
        useEffect(() => {
            fetchUser();
        }, []);
        
        if (isLoading) return "Loding..";
    
        function Remove(data){
            // remove data..
            setAdd(add.filter(id => id.login.uuid !== data));
        }

    const display = add.map((fav, index) => {
        // display fav user with remove button..
        const removeClick=()=>{
            enable(fav.login.uuid);
            setTemp([...temp,fav]);
            Remove(fav.login.uuid);
            }

        return (
            <Card key={index}style={{ boxShadow:'1px 2px 5px #000000',border:'8px',width: '20rem'}}>
                <Card.Img alt="img" src={`${fav.picture.large}`} />
                <Card.Body >
                    <Card.Title style={{fontSize:'18px',fontFamily:'cursive',fontWeight:'bold'}}>
                        Name : {`${fav.name.title} ${fav.name.first} ${fav.name.last}`}</Card.Title>
                </Card.Body>
                <ListGroup variant="flush"style={{fontSize:'15px',fontFamily:'cursive'}}>
                    <ListGroup.Item>Gender : {fav.gender}</ListGroup.Item>
                    <ListGroup.Item>Phone : {fav.phone}</ListGroup.Item>
                    <ListGroup.Item>Email : {fav.email}</ListGroup.Item>
                    <ListGroup.Item>State : {fav.location.state}</ListGroup.Item>
                    <ListGroup.Item>Country : {fav.location.country}</ListGroup.Item>
                </ListGroup>
                <Button  variant="primary" key={fav.login.uuid}  
                        onClick={() => {  removeClick()}} 
                        className="addbutton"><PersonDash size='22' style={{marginRight:'15px',marginBottom:'2px'}}/>Remove</Button>
            </Card>
        );
    })

  return (
      <>
            <div className="container">
                <div className="refdiv">
                    <div > <Button  onClick={fetchUser}  width="30" variant="dark" >
                        <ArrowRepeat  size='40' color="orange"/></Button>
                    </div> 
                 </div>
            <br/></div>
            {/* <button className="refresh" onClick={fetchUser}>Refresh</button> */}
            
       
            <div className="subcard" >{fetchdata}</div><br/>
            <div className="subcard2">{display}</div>
    
    </>
  )
}

export default FetchUser1