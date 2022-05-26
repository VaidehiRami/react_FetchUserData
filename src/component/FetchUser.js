
import React, { useEffect, useState } from "react";
import   './FetchUser.css';


const FetchUser = () => {
    
    
   var name,Picture,Gender,Phone,Email,State ;
    
     const fetchData =  () => {
                 
                 fetch(' https://randomuser.me/api/?results=5')
                 .then(response => response.json())
                 .then(data => {
                    name=data['results'][0]['name'];
                    Picture=data['results'][0]['picture']['medium'];
                    Gender=data['results'][0]['gender'];
                    Phone=data['results'][0]['phone'];
                    Email=data['results'][0]['email'];
                    State=data['results'][0]['location'];
                    console.log("First Name:",name.first ,'last :',name.last);
                    console.log('Image :',Picture);
                    console.log('Gender :',Gender);
                    console.log('Phone :',Phone);
                    console.log('Email :',Email);
                    console.log('Address :',State.state ,'Country :',State.country);
                                       
                 })                 
            }
            useEffect(() => {
                fetchData()
              },[])    
  

  
    return (
      < >
     <div className="refdiv"> <button className="refresh">Refresh</button></div><br/>   
      <div >
        <div><div >{fetchData} </div></div>

      </div>
     
      <div >
        
      </div>
      
          {/* <div><button onClick={fetchData}>Fetct User</button><br/> </div> */}
         
         

          
            
      </>
    )
  }
  export default FetchUser