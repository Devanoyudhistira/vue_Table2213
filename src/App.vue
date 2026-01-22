<script>
import supabase from './library/supabase';
import Tabledata from './components/Tabledata.vue';
import Tablehead from './components/Tablehead.vue';
import Tablerow from './components/Tablerow.vue';
export default {
  components: {
    Tabledata,
    Tablehead,
    Tablerow
  },
  data() {
    return {
      nama: 'devano',
      data: null,
      userdata: null,
      userform: false
    }
  },
  methods: {
    async getdata() {
      const { data, error } = await supabase.from("products").select()
      this.data = data
    },
    async getuser() {
      const { data, error } = await supabase.from("Users").select()
      this.userdata = data
      // console.log(error)
      // console.log(data)
    },
    openform() {
      this.userform = true
    },
    closeform() {
      this.userform = false
    },
    async newuser() {
      const { data, error } = await supabase.auth.admin.createUser({
        email: this.$refs.email.value,
        password: this.$refs.password.value,
        email_confirm: true,
      })
      if (error) {
        console.log(error)
        return;
      }
      const { data: userdata, error: insertError } = await supabase
        .from('Users')
        .insert({
          name: this.$refs.name.value,
          role: "staff",
          image: `belum ada`,
          uuid: data.id,
          admin:true          
        }).single().select()
      if (insertError) {
        console.log(insertError)
        return;
      }
      console.log(userdata)
    }
  },
  mounted() {
    this.getdata()
    this.getuser()
  },
  computed: {
    productdata() {
      return this.data
    },
    datauser() {
      return this.userdata
    },
    dataloaded() {
      if (this.userdata && this.data) {
        return true
      }
      return false
    }
  }
}
</script>

<template>
  <main v-if="dataloaded" class="w-screen h-screen flex flex-col items-center justify-center gap-4">
    <div v-show="userform">
      <form class="flex flex-col gap-3" @submit.prevent="newuser">
        <label for="name">
          <h1>name:</h1>
          <input ref="name" type="text" name="name" id="name">
        </label>
        <label for="admin">
          <h1>admin</h1>
          <button :value="true"> admin </button>
          <div class="flex flex-col gap-2  w-min h-min">
            <input name="admin" type="radio" :value="true">true</input>
            <input name="admin" type="radio" :value="false"> false </input>
          </div>
        </label>
        <label for="email">
          email
          <input ref="email" type="email" name="email" id="email">
        </label>
        <label for="password">
          password
          <input ref="password" type="password" name="password" id="password">
        </label>
        <button type="submit"> Confirm </button>
      </form>
    </div>
    <table>
      <Tablerow>
        <Tablehead>id</Tablehead>
        <Tablehead>product</Tablehead>
        <Tablehead>price</Tablehead>
        <Tablehead>edit</Tablehead>
      </Tablerow>
      <Tablerow v-for="data in productdata">
        <Tabledata> {{ data.id }} </Tabledata>
        <Tabledata>{{ data.name }}</Tabledata>
        <Tabledata> {{ data.price }} </Tabledata>
        <Tabledata> <button class="bg-blue-700 px-1 py-1 w-full text-center"> edit </button> </Tabledata>
      </Tablerow>
    </table>
    <table>
      <Tablerow>
        <Tablehead>user id</Tablehead>
        <Tablehead>name</Tablehead>
        <Tablehead>status</Tablehead>
        <Tablehead> role</Tablehead>
        <Tablehead>edit</Tablehead>
      </Tablerow>
      <Tablerow v-for="user in datauser">
        <Tabledata> {{ user.id }} </Tabledata>
        <Tabledata>{{ user.name }}</Tabledata>
        <Tabledata> {{ user.admin ? 'admin' : 'user' }} </Tabledata>
        <Tabledata> {{ user.role }} </Tabledata>
        <Tabledata> <button class="bg-blue-700 px-1 py-1"> edit </button> </Tabledata>
      </Tablerow>
      <Tablerow>
        <Tablehead class=" flex justify-center items-center"> <button @click="openform"
            class="cursor-pointer bg-emerald-600 px-2 py-1 rounded-md"> create new </button></Tablehead>
      </Tablerow>
    </table>
  </main>
  <div v-else>
    <div>
      <h1 class="text-3xl text-green-600"> loading </h1>
    </div>
  </div>


</template>
