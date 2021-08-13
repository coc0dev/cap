import React, { useEffect, useState } from 'react'
import sanityClient from '../Client'
import { Link } from 'react-router-dom'
import moment from 'moment'
import '../index.css'

export const Blog = () => {

    const [blogData, setBlogData] = useState(null);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == 'post']{
                title,
                slug,
                publishedAt,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                },
                publishedAt,
                "timestamp" : now()
            }`
        )
            .then((data) => setBlogData(data))
            .catch(console.error);
    }, [])
    // console.log(blogData)

    return (
        <div className="min-h-screen">
            <div className="container mx-auto">
                <h3 className="text-3xl flex mb-2">Blog Posts</h3>
                <hr />
                <div className="nav-item">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-3 gap-8">
                        {blogData && blogData.map((post, index) => (
                            <Link className="nav-link text-dark" to={'/blog/' + post.slug.current} key={post.slug.current}>
                                <span className="block h-64 relative rounded leading-snug" key={index}>
                                    <img className="w-full rounded-r object-cover absolute shadow" src={post.mainImage.asset.url} alt="main here image" />
                                </span>
                                <p className="float-right"><small className="text-bold">{moment(post.publishedAt).calendar()}</small></p>
                                <h2 className="font-bold ">{post.title}</h2>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
