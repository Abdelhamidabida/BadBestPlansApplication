import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd';
import Axios from 'axios';
import { LikeTwoTone, DislikeTwoTone } from '@ant-design/icons';

const LikeDislikes = ({ props }) => {
    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    let variable = {};

    if (props.publicationId) {
        variable = { publicationId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }
    return (
        <div>
            <React.Fragment>
                <span key="comment-basic-like">
                    <Tooltip title="Like">
                        <LikeTwoTone
                            // theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                            onClick />

                    </Tooltip>
                    {/* <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span> */}
                </span>&nbsp;&nbsp;
                <span key="comment-basic-dislike">
                    <Tooltip title="Dislike">
                        <DislikeTwoTone
                            type="dislike"
                            // theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'  } 
                            onClick />

                    </Tooltip>
                    {/* <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span> */}
                </span>
            </React.Fragment>
        </div>
    )
}

export default LikeDislikes
