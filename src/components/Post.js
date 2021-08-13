import React from 'react'
import moment from 'moment'

export const Post = (props) => {

    return (
        <li className="list-group-item">
            <div className="">
                <img className="rounded w-20 h-20" src={props.post.avatar} alt="avatar image" />
                <cite className="">-{props.post.userId}</cite>
            </div>
            <div>
                <span>
                    <small className="float-right">{moment(props.post.dateCreated.toDate()).fromNow()}</small>
                    <p>{props.post.body}</p>
                </span>
            </div>
        </li>
    )
}
