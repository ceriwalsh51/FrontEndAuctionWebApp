import Api from '@/services/api'

export default {
  fetchAuctions () {
    return Api().get('/auctions')
  },
  postAuction (auction) {
    return Api().post('/auctions', auction,
      {headers: {'Content-type': 'application/json'}})
  },
  likeAuction (id) {
    return Api().put(`/auctions/${id}/likes`)
  },
  deleteAuction (id) {
    return Api().delete(`/auctions/${id}`)
  },
  bid (id) {
    return Api().put(`/auctions/${id}/highestBid`)
  }
}
