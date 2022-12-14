import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {format} from 'timeago.js'
import axios from "axios";

const Container = styled.div`
width: ${(props) => props.type !== "sm" && "360px"};
    margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
    cursor: pointer;
    display: ${(props) => props.type === "sm" && "flex"};
    gap: 10px;
`;

const Image = styled.img`
    width: 100%;
    height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
    background-color: #999;
    flex: 1;
`;

const Details = styled.div`
    display: flex;
    margin-top: ${(props) => props.type !== "sm" && "16px"};
    gap: 12px;
    flex: 1;
`;

const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    background-color: #999;
    border-radius: 50%;
    display: ${(props) => props.type === "sm" && "none"};
`;

const Wrapper = styled.div`
    padding: 22px 96px;
`;

const Text = styled.div``;

const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${({theme}) => theme.text};
`;

const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({theme}) => theme.text};
    margin: 9px 0px;
`;

const Info = styled.div`
    font-size: 14px;
    color: ${({theme}) => theme.textSoft};

`;



const Card = ({ type, video}) => {
    const [channel, setChannel] = useState([])

    useEffect(() => {
        const fetchChannel = async () => {
            const res = await axios.get(`/users/find/${video.userId}`)
            setChannel(res.data)
        }
        fetchChannel()
    },[video.userId])

    return (
        <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
            <Container type={type}>
                {/* <Image 
                    type={type} 
                    src="data:image/png;base64,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"
                /> */}
                <Image 
                    type={type} 
                    src={video.imgUrl}
                />
                <Details type={type}>
                    {/* <ChannelImage
                        type={type} 
                        src="data:image/png;base64,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"
                    /> */}
                    <ChannelImage
                        type={type}
                        src={channel.img}
                    />
                    <Text>
                        <Title>{video.title}</Title>
                        <ChannelName>{channel.name}</ChannelName>
                        <Info>{video.views}views ??? {format(video.createdAt)}</Info>
                    </Text>
                </Details>
            </Container>
        </Link>
    )
}

export default Card;