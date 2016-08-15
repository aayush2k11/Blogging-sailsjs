module.exports = {
  schema: true,
  attributes:{
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: 'string',
      required: true,
    },
    content: {
      type: 'string',
      required: true
    },
    blogowner:{
      model: 'user'
    },
    comments: {
      collection: 'comment',
      via: 'owner'
    }
  }
}