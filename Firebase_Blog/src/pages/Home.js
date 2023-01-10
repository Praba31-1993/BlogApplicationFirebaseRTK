import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBIcon, MDBRow, MDBCol, MDBCardText, MDBBtn} from 'mdb-react-ui-kit';
import React from 'react';
import Spinner from "../components/Spinner"
import {useFetchBlogsQuery} from "../services/blogsApi"
import { Link } from 'react-router-dom';


function Home() {
    const {data, isLoading, isErrror, error} = useFetchBlogsQuery();
    console.log("data", data);
    if(isLoading){
        return <Spinner/>
    }

    const handleDelete=(id)=>{
        console.log("id", id);
    }
    return (
        <div style={{margin:"auto", padding:"15px", maxWidth:"1200px", alignContent:"center"}}>
            <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                {data?.map((item)=>{
                    <MDBCol key={item.id}>
                        <MDBCard className='h-100'>
                            <MDBCardImage src={item.imgURL} alt={item.title} position="top"/> 
                            <MDBCardBody>
                                <MDBCardTitle className='text-start'>{item.title}</MDBCardTitle>
                                <MDBCardText className='text-start'>{item.description}</MDBCardText>
                                <div style={{marginLeft: "5px", float:"right"}}>
                                    <MDBBtn className="mt-1" tag="a" color="none">
                                        <MDBIcon fas icon="trash" style={{color:"#dd4b39"}} onClick={()=>handleDelete(item.id)} size="lg"/>
                                    </MDBBtn>
                                    <Link to ={`/update/${item.id}`}>
                                    <MDBIcon fas icon="edit" style={{color:"#55acee", marginLeft:"10px"}}
                                    size="lg"
                                    />
                                    </Link>
                                </div>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    
                })}
            </MDBRow>
            {/* <h1>Home</h1> */}
        </div>
    );
}

export default Home;