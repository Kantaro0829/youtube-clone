import styled from 'styled-components'
import React, { useEffect, useState} from 'react'
import Card from '../components/Card'
import axios from "axios"

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    color: ${({theme}) => theme.text};

`;

const Home = () => {

    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get("/videos/random")
            setVideos(res.data)
        }
        fetchVideos()
    },[])

    return (
        <Container>

            {videos.map((video) => (
                <Card />
            ))}

        </Container>
    )
}

export default Home