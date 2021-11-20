import React, {useContext, useState} from 'react';
import AuthContext from '../../store/authContext';
import Style from './HostForm.module.css';
import Modal from '../Modal/Modal';
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const HostForm = () => {
    const history = useHistory();
    const ctx = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const[show, setShow] = useState(true);
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [location, setLocation] = useState("");
    const [features, setFeatures] = useState("")
    const [price, setPrice] = useState("");
    const[files, setFiles] = useState("");
    const handleFileUpload = (e: any) => {
        setFiles(e.target.files[0]);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('location', location);
        formData.append('features', features);
        formData.append('price', price);
        formData.append('email', ctx.userData.email);
        formData.append('image', files)
        console.log(Array.from(formData.entries()))

        setLoading(true)
        try {
            const { data } = await axios.post("https://polar-ridge-98480.herokuapp.com/api/listing", formData, { headers: { 'Content-Type': "multipart/form-data" } });
            const res = await ctx.updateGuestHost()
            if (res.status === 200) {
                setResponse("Upload Successful")
                setTimeout(() => history.push("/home"), 1000)
            }
            else setResponse("Upload failed")
            return data;
        }
        catch (e) {

        }
        setLoading(false)
    }

    return(
        <div className={Style.Host}>
           <Modal title={ctx.userData.firstname} show={show} toggle={() => setShow(false)}>
                <h3>It's nice being a host to our guest, Register here and let's goo!!</h3>
           </Modal>
           <Form encType="multipart/form-data">
                <div className={Style.FormCol}>
                    <div className={Style.Col}>
                        <label>Title</label>
                        <input type="text" placeholder="Type of apartment" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className={Style.Col}>
                        <label>Description</label>
                        <input type="text" placeholder="Brief description" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                    </div>  
                    <div className={Style.Col}>     
                       <label>Features</label>
                       <input type="text" placeholder="Features in your apartment" value={features} onChange={(e) => setFeatures(e.target.value)}/>
                    </div>
                    <div className={Style.Row}>
                        <div className={Style.Col}>
                          <label>City</label>
                          <input type="text" placeholder="Enter Address" value={location} onChange={(e) => setLocation(e.target.value)}/>
                        </div>
                        <div className={Style.Col}>
                          <label>Price</label>
                          <input type="number" placeholder="Price of apartment" value={price} onChange={(e) => setPrice(e.target.value)}/>
                       </div>
                    </div>
                    <div className={Style.Col}>
                        <input type="file" onChange={handleFileUpload} id="image" name="image" />
                    </div>
                    <Button className={Style.Button} type="submit" onClick={handleSubmit}>
                        {loading ? "Uploading..." : "Upload Listing"}
                    </Button>
                    {response === "Upload Successful" ? <h4 style={{ color: "green" }}>{response}</h4> : <h4 style={{ color: "red" }}>{response}</h4>}
                </div>                
            </Form>
        </div>
    )
}

export default HostForm;