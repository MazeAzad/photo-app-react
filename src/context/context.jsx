import React, { useContext, useEffect, useState } from "react";
const appContext = React.createContext();
const AppProvider = ({ children }) => {
    let [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showMoreImage, setShowMoreImage] = useState(false);
    const pageQuery = `&page=${page}`
    const imageUrl = `https://api.unsplash.com/photos?${pageQuery}`;
    const searchUrl = `https://api.unsplash.com/search/photos?${pageQuery}&query=${search}`;
    const fetchImages = async (url) => {
        setLoading(true);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`
            }
        })
        const jsonRes = await response.json();
        let reg = new RegExp('query=');
        console.log(page);
        if (reg.test(url)) {
            setData((old) => {
                return [...old, ...jsonRes.results];
            })
            setShowMoreImage(false);
            setLoading(false);
        }
        else {
            setData((oldData) => {
                return [...oldData, ...jsonRes];
            });
            setShowMoreImage(false);
            setLoading(false);
        }



    }

    useEffect(() => {
        if (search !== '') {
            fetchImages(searchUrl)
        }
        else {
            fetchImages(imageUrl);
        }

    }, [page])

    useEffect(() => {
        if (!showMoreImage) return
        // if (loading) return // optional 
        setPage((page) => { return page + 1 });
    }, [showMoreImage])
    return (
        <appContext.Provider value={{ loading, data, page, setPage, fetchImages, search, setSearch, searchUrl, setData, imageUrl, setShowMoreImage }}>
            {children}
        </appContext.Provider>
    )
}

const uesGlobal = () => {
    return useContext(appContext)
}

export { AppProvider, uesGlobal };