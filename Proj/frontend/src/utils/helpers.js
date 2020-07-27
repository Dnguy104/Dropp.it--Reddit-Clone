export const commentsInit = (comments) => {
  if(Object.keys(comments).length > 0) {
    console.log('got data')
    console.log(comments)
     Object.keys(comments).forEach(key=>{
      comments[key] = {
        ...comments[key],
        commentForm: false,
      };
    })
  }

  return generateTimes(comments);
}

export const commentInit = (comment) => {
  let newComment = {
    ...comment,
    commentForm: false,
  };

  return generateTime(newComment);
}

export const generateTimes = (objs) => {
  Object.keys(objs).forEach(key=>{
    const elapsed =  Math.floor((Date.now() / 1000) - objs[key].created_on)
    let objTime;
    if(elapsed < 3600) {
      objTime = Math.floor(elapsed / 60).toString() + ' minutes ago' ;
    }
    else if(elapsed < 7200) {
      objTime = (1).toString() + ' hour ago' ;
    }
    else if(elapsed < 86400) {
      objTime = Math.floor(elapsed / 60 / 60).toString() + ' hours ago' ;
    }
    else if(elapsed < 172800) {
      objTime = (1).toString() + ' day ago' ;
    }
    else if(elapsed < 2592000) {
      objTime = Math.floor(elapsed / 60 / 60 / 24).toString() + ' days ago' ;
    }

    objs[key] = {
      ...objs[key],
      created_on: objTime,
    };
  })
  return objs;
}

export const generateTime = (obj) => {
  const elapsed = Math.floor((Date.now() / 1000) - obj.created_on)
  let objTime;
  if(elapsed < 3600) {
    objTime = Math.floor(elapsed / 60).toString() + ' minutes ago' ;
  }
  else if(elapsed < 7200) {
    objTime = (1).toString() + ' hour ago' ;
  }
  else if(elapsed < 86400) {
    objTime = Math.floor(elapsed / 60 / 60).toString() + ' hours ago' ;
  }
  else if(elapsed < 172800) {
    objTime = (1).toString() + ' day ago' ;
  }
  else if(elapsed < 2592000) {
    objTime = Math.floor(elapsed / 60 / 60 / 24).toString() + ' days ago' ;
  }
  return {
    ...obj,
    created_on: objTime
  };
}
