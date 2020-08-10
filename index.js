const { ApolloServer } = require(`apollo-server`)

const typeDefs = `
  enum PhotoCategory {
    SELEFIE
    PORTLAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }
  input PostPhotoInput {
    name: String!
    description: String
    category: PhotoCategory=PORTLAIT
  }
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String!
    category: PhotoCategory!
  }
  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }
  type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
  }
`

var _id = 0
var photos = []

const resolvers ={
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos
  },
  Mutation: {
    postPhoto(parent, args) {
      var newPhoto = {
        id: _id++,
        ...args.input
      }
      photos.push(newPhoto)
      return newPhoto
    }
  },
  Photo: {
    url: parent => `http://${parent.id}.jpg`
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({url}) => console.log(`GraphQL Service running on ${url}`))