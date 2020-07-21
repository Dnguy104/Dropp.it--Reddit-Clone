export const commentsInit = (comments) => {
  Object.keys(comments).forEach(key=>{
    comments[key] = {
      ...comments[key],
      commentForm: false,
    };
  })
  return comments;
}

export const commentInit = (comment) => {
  return {
    ...comment,
    commentForm: false,
  };
}

export const generateTimes = (posts) => {
  Object.keys(posts).forEach(key=>{
    const elapsed =  Math.floor((Date.now() / 1000) - posts[key].created_on)
    let postTime;
    if(elapsed < 3600) {
      postTime = Math.floor(elapsed / 60).toString() + ' minutes ago' ;
    }
    else if(elapsed < 7200) {
      postTime = Math.floor(elapsed / 60 / 24).toString() + ' hour ago' ;
    }
    else if(elapsed < 86400) {
      postTime = Math.floor(elapsed / 60 / 24).toString() + ' hours ago' ;
    }
    else if(elapsed < 172800) {
      postTime = Math.floor(elapsed / 60 / 24 / 30).toString() + ' day ago' ;
    }
    else if(elapsed < 2592000) {
      postTime = Math.floor(elapsed / 60 / 24 / 30).toString() + ' days ago' ;
    }

    posts[key] = {
      ...posts[key],
      created_on: postTime,
    };
  })
  return posts;
}

export const generateTime = (post) => {
  const elapsed = Math.floor((Date.now() / 1000) - post.created_on)
  let postTime;
  if(elapsed < 3600) {
    postTime = Math.floor(elapsed / 60).toString() + ' minutes ago' ;
  }
  else if(elapsed < 7200) {
    postTime = Math.floor(elapsed / 60 / 24).toString() + ' hour ago' ;
  }
  else if(elapsed < 86400) {
    postTime = Math.floor(elapsed / 60 / 24).toString() + ' hours ago' ;
  }
  else if(elapsed < 172800) {
    postTime = Math.floor(elapsed / 60 / 24 / 30).toString() + ' day ago' ;
  }
  else if(elapsed < 2592000) {
    postTime = Math.floor(elapsed / 60 / 24 / 30).toString() + ' days ago' ;
  }
  return {
    ...post,
    created_on: elapsed
  };
}
