import React, { useState, useEffect, useContext } from 'react'
import sanityClient from '../Client.js'
import { useParams } from 'react-router-dom'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import { PostList } from '../components/PostList.js'
import { useAuth } from '../context/AuthProvider.js'
import firebase from '../firebase'
import { DataContext } from '../context/DataProvider.js'

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source);
}

export const BlogSingle = (props) => {

    const { currentUser } = useAuth();
    const { postList, getPosts } = useContext(DataContext)
    const [postData, setPostData] = useState(null)
    const { slug } = useParams();
    // console.log(postData)

    useEffect(() => {
        sanityClient.fetch(
            `*[slug.current == $slug]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                },
                body,
                'name': author->name,
                'authorImage': author->image
            }`,
            { slug }
        )
            .then((data) => setPostData(data[0]))
            .catch(console.error);

    }, [slug]);
    // console.log(slug)

    if (!postData) return <div>Loading...</div>;

    const addPost = (e) => {
        e.preventDefault();

        const formData = {
            body: e.target.body.value,
            dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
            dateUpdated: null,
            avatar: currentUser.image,
            userId: currentUser.username,
            slug: slug
        }
        firebase.firestore().collection('posts').add(formData)
            // In the db, the posts are alread supplied. This is where we will re-render/update our list of posts in the DOM
            .then((docRef) => {
                getPosts();
                // console.log('new post created');
            })
            .catch(err => console.err(err))

        // console.log(formData)
    }

    return (
        <div className="min-h-screen">
            <div className="container shadow-lg mx-auto bg-gray-300 rounded-lg">
                <div className="relative">
                    <div className="absolute h-full w-full flex items-center justify-center p-8">
                        <div className="bg-gray-100 bg-opacity-75 rounded p-12">
                            <h3 className="text-2xl lg:text-3xl mb-3">{postData.title}</h3>
                            <div className="flex justify-center text-gray-800">
                                <img className="author" src={urlFor(postData.authorImage).width(100).url()} alt="Author is Evan" />
                                <h3 className="flex items-center pl-2 text-2xl">{postData.name}</h3>
                            </div>
                        </div>
                    </div>
                    <img className="w-full object-cover rounded-t" src={urlFor(postData.mainImage).url()} alt="main image of post" style={{ height: "400px" }} />
                </div>
            </div>
            <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
                <BlockContent
                    blocks={postData.body}
                    projectId={sanityClient.clientConfig.projectId}
                    dataset={sanityClient.clientConfig.dataset}
                />
                <h3>Comments</h3>
                <hr />

                <form onSubmit={(e) => addPost(e)} action="" method="POST">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-10">
                                <input className="form-control" type="text" name='body' placeholder="Add a comment..." />
                            </div>
                            <div className="col-md-2">
                                {
                                    <input className="btn btn-info btn-block" type="submit" value="Post" />
                                }
                            </div>
                        </div>
                    </div>
                </form>

                <hr />
                <PostList posts={postList[0]} slug={slug} />
            </div>
        </div>
    )
}