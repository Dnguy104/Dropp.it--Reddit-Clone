export const commentsInit = (comments) => {
  Object.keys(comments).forEach(key=>{
    comments[key] = {
      ...comments[key],
      commentForm: false,
      threadHover: false,
    };
  })
  return comments;
}

export const commentInit = (comment) => {
  return {
    ...comment,
    commentForm: false,
    threadHover: false,
  };
}
