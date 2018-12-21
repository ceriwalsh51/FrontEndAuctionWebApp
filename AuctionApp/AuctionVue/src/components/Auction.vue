<template>
    <div id="app1" class="hero">
      <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
      <div class="container mt-3 mt-sm-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <form @submit.prevent="submit">
//highestBid - startingamount
              <div class="form-group" :class="{ 'form-group--error': $v.highestBid.$error }">
                <label class="form-control-label" name="highestBid">StartingAmount (Enter a number between 1 and 1000)</label>
                <input class="form__input" type="number" v-model.trim="highestBid"/>
              </div>
              <div class="error" v-if="!$v.highestBid.between">StartingAmount must be between 1 and 1000</div>
              <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
                <label class="form__label">Name</label>
                <input class="form__input" v-model.trim="$v.name.$model"/>
              </div>
              <div class="error" v-if="!$v.name.required">Name is Required</div>
              <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
              <div class="form-group" :class="{ 'form-group--error': $v.dateDue.$error }">
                <label class="form__label">DateDue</label>
                <input class="form__input" v-model.trim="$v.dateDue.$model"/>
              </div>
              <div class="error" v-if="!$v.dateDue.required">DateDue is Required</div>
              <div class="error" v-if="!$v.dateDue.minLength">MDateDue must have at least {{$v.dateDue.$params.minLength.min}} letters.</div>
              <p>
                <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Make Donation</button>
              </p>
              <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your Donation!</p>
              <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
              <p class="typo__p" v-if="submitStatus === 'PENDING'">Donating...</p>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required, minLength, between } from 'vuelidate/lib/validators'
import VueSweetalert from 'vue-sweetalert'
import AuctionService from '@/services/auctionservices'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)
Vue.use(VueSweetalert)

export default {
  name: 'Auction',
  data () {
    return {
      messagetitle: ' Auction ',
      name: '',
      state: 'Active',
      dateDue: '',
      highestBid: '0',
      likes: '0',
      bids: '0',
      auction: {},
      submitStatus: null
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(15)
    },
    dateDue: {
      required,
      minLength: minLength(21)
    },
    highestBid: {
      required,
      between: between(1, 1000)
    }
  },
  methods: {
    submit () {
      console.log('Submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var auction = {
            name: this.name,
            state: this.state,
            dateDue: this.dateDue,
            highestBid: this.highestBid,
            likes: this.likes,
            bids: this.bids
          }
          this.auction = auction
          console.log('Submitting in Auction Form : ' + JSON.stringify(this.auction, null, 5))
          this.submitAuction(this.auction)
        }, 500)
      }
    },
    submitAuction: function (auction) {
      AuctionService.postAuction(auction).then(response => {
        console.log(response)
      })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
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
    margin-bottom: 10px
  }
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .donate-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
