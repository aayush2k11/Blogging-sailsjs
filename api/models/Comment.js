module.exports = {
  attributes:{
    id:{
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: 'string',
      required: true
    },
    commentowner:{
      model: 'user'
    },
    owner:{
      model:'blog'
    }
  }
}