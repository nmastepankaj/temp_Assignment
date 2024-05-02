import React, { useEffect, useState } from 'react'

import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import Card from './Card';

const Jobs = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateJobs = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "limit": props.pageSize,
            "offset": props.pageSize * (page - 1)
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        // props.setProgress(10);
        const url = `https://api.weekday.technology/adhoc/getSampleJdJSON`;
        setLoading(true)
        let data = await fetch(url, requestOptions);
        // props.setProgress(30);
        let parsedData = await data.json()
        // props.setProgress(70);
        setArticles(parsedData.jdList)
        setTotalResults(parsedData.totalCount)
        setLoading(false)
        setPage(page + 1)
    }

    useEffect(() => {
        updateJobs();
    }, [])


    const fetchMoreData = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "limit": props.pageSize,
            "offset": props.pageSize * (page - 1)
        });
        console.log(raw);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        const url = `https://api.weekday.technology/adhoc/getSampleJdJSON`;
        setPage(page + 1)
        let data = await fetch(url, requestOptions, raw);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.jdList))
        setTotalResults(parsedData.totalCount)
    };

    return (
        <>
            {/* <Grid
                    container
                    spacing={3}
                    alignItems="center"
                    columns={12}
                >
                    <Typography variant="h4" sx={{ margin: "20px 0px", textAlign: "center" }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</Typography>
                </Grid> */}
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>Jobs</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >

                <Grid
                    container
                    spacing={3}
                    alignItems="center"
                    columns={12}
                    padding={5}
                >
                    {/* <Grid
                        sx={{
                            width: "100%",
                            margin: 0,
                            display: "flex"
                        }}
                        justifyContent="space-between"
                    >
                       
                    </Grid> */}

                    {articles.map((element) => {
                        return <Card key={element.jdUid} title={element.jobRole ? element.jobRole : ""} description={element.jobDetailsFromCompany ? element.jobDetailsFromCompany : ""} jobURL={element.jdLink} minExp={element.minExp} location={element.location}/>
                    })}
                </Grid>


            </InfiniteScroll>
        </>
    )

}


Jobs.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

Jobs.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default Jobs
