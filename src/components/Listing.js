// import React from 'react';
// class Listing extends React.Component {
//     render() {
//         const subredditData = JSON.parse(this.props.subreddit);
//         const subredditPosts = subredditData.data.children;
//         const postListings = subredditPosts.map(({ data }, index) => {
//             return <li key={index}>{data.title}</li>
//         });
//         return ({ postListings })
//     }
// }
// export default Listing;