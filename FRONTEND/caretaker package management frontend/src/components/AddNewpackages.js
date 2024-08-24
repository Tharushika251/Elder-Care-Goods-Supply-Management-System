import React,{useState} from "react";
import axios from "axios";
import caretakerImage from "./e.png"; // Import your caretaker image


export default function AddNewpackage(){
    
    const [nPname,setNPname]= useState("");
    const [nPdescription,setNPdescription]= useState("");
    const [nPprice,setNPprice]= useState("");
    

    function sendData(e){
        e.preventDefault();
        //alert("Insert");
        const newNewPackage ={
            nPname,
            nPdescription,
            nPprice
            
        }
        //console.log(newNewPackage );
        axios.post("http://localhost:8072/newpackage/add1",newNewPackage ).then(()=>{
            alert("newPackage Added.")
            setNPname("");
            setNPdescription("");
            setNPprice("");
            

        }).catch((err)=>{
            alert(err)
        })

    }
    const styles = {
        imageContainer: {
          position: 'absolute',
          right: '10px',
          zIndex: '1'
        },
        caretakerImage: {
          width: '800px', /* Adjust the width as needed */
          height: 'auto' /* Maintain aspect ratio */
        },
        line: {
            backgroundColor:'blue',
            width: '100%',
            height:'5px',
            border: '1px solid #ccc',
            margin: '20px 0',
        },
      };
      

    return(
        <div className="container">
            <h1>Add New Packages</h1>
            <div style={styles.imageContainer}>
        <img src={caretakerImage} alt="Caretaker" style={styles.caretakerImage} />
      </div><hr style={styles.line} /><br/><br/>
            <form onSubmit={sendData}>
                <div class="form-group">
                    <label for="newPackageName"> Name of New package </label>
                    <input type="text" class="form-control" id="careName"  placeholder="Enter new package' Name" onChange={(e)=>{
                        setNPname(e.target.value);
                    }} style={{ width: '500px' }} />
                </div>

                <div class="form-group">
                    <label for="newPackageDescription">Description</label>
                    <input type="text" class="form-control" id="newPackageDescription" placeholder="Enter Description"onChange={(e)=>{
                        setNPdescription(e.target.value);
                    }} style={{ width: '500px' }} />
                </div>
                
                <div class="form-group">
                    <label for="newPackagePrice">Price</label>
                    <input type="text" class="form-control" id="newPackagePrice" placeholder="Enter Price" onChange={(e)=>{
                        setNPprice(e.target.value);
                    }} style={{ width: '300px' }} />
                </div>

                


                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <br/><br/><br/><br/>
            <hr style={styles.line} />
        </div>
    )
}
