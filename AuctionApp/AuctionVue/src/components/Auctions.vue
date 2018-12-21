<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="appl">
      <v-client-table :columns="columns" :data="auctions" :options="options">
        <a slot="like" slot-scope="props" class="fa fa-thumbs-up fa-2x" @click="like(props.row._id)"></a>
        <a slot="bid" slot-scope="props" class="fa fa-money fa-2x" @click="bid(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteAuction(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import AuctionService from '@/services/auctionservices'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Auctions',
  data () {
    return {
      messagetitle: 'Auctions List',
      auctions: [],
      props: ['_id'],
      errors: [],
      columns: ['_id', 'name', 'state', 'bids', 'highestBid', 'dateDue', 'likes', 'like', 'bid', 'remove'],
      options: {
        sortable: ['likes'],
        perPage: 10,
        filterable: ['name', 'dateDue', 'state'],
        headings: {
          _id: 'ID',
          name: 'Name',
          state: 'State of Auction',
          bids: 'Number of Bids',
          highestBid: 'Highest Bid',
          dateDue: 'End of Auction',
          likes: 'Likes'
        }
      }
    }
  },

  // Fetches auctions when the component is created
  created () {
    this.loadAuctions()
  },

  methods: {
    loadAuctions: function () {
      AuctionService.fetchAuctions().then(response => {
        // JSON responses are automatically parsed
        this.auctions = response.data
        console.log(this.auctions)
      })
    },
    like: function (id) {
      AuctionService.likeAuction(id).then(response => {
        console.log(response)
      })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    bid: function (id) {
      AuctionService.bid(id).then(response => {
        console.log(response)
      })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    deleteAuction: function (id) {
      this.$swal({
        title: 'Are you totaly sure?',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result)
        if (result.value === true) {
          AuctionService.deleteAuction(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadAuctions()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this Auction ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          this.$swal('Cancelled', 'Your Donation still Counts!', 'info')
        }
      })
    }
  }
}
</script>

<style scoped>
.vue-title {
  margin-top: 30px;
  text-align: center;
  font-size: 45pt;
  margin-bottom: 10px;
}
#appl {
  width: 80%;
  margin: 0 auto;
}

</style>
