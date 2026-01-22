<script>
import supabase from './library/supabase';
import Tabledata from './components/Tabledata.vue';
import Tablehead from './components/Tablehead.vue';
import Tablerow from './components/Tablerow.vue';
import Navbar from './components/navbar.vue';
export default {
  components: {
    Tabledata,
    Tablehead,
    Tablerow,
    Navbar,
  },
  data() {
    return {
      nama: 'devano',
      data: null,
      userdata: null,
      userform: false,
      searchkey: "",
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
      console.log(data)
      const { data: userdata, error: insertError } = await supabase
        .from('Users')
        .insert({
          name: this.$refs.name.value,
          role: "staff",
          image: `belum ada`,
          uuid: data.user.id,
          admin: true
        }).single().select()
      if (insertError) {
        console.log(insertError)
        return;
      }
      this.userdata.push(userdata)
      console.log(userdata)
    },
    async deleteuser(target,uuid) {
      console.log(uuid)
      const { error:autherror } = await supabase.auth.admin.deleteUser(
        uuid
      )
      if(autherror){
        console.log(autherror)
        return
      }
      const { count, data, error:deleterror } = await supabase.from("Users").delete().eq('id', target).single().select();
      if (deleterror) {
        console.log(deleteerror)
        return
      }
      console.log(data)
      // const deleteresult = this.userdata.filter(e => e.id !== target)
    },

  },
  watch: {
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
      if (this.searchkey.length > 4) {
        return this.userdata.filter(e => {
          return e.name.toLowerCase().includes(this.searchkey)
        })
      }
      return this.userdata
    },
    dataloaded() {
      if (this.userdata && this.data) {
        return true
      }
      return false
    },
  }
}
</script>

<template>
  <main v-if="dataloaded" class="w-screen h-screen flex flex-col px-1">
    <Navbar />
    <form class="flex mt-20 flex-col gap-3" @submit.prevent="newuser">
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


    <div class="mt-16 w-full h-max flex items-center justify-between">
      <h1 class=" text-4xl font-work font-medium">Users Data</h1>
      <label for="search" class="flex gap-2 mr-5">
        <h1 class="font-inter font-medium text-2xl tracking-wider text-blue-400">search</h1>
        <input type="text" v-model="searchkey" id="search" class="border-2 border-sky-500 font-work rounded-md" />
      </label>
    </div>

    <table class="font-work ">
      <Tablerow>
        <Tablehead>user id</Tablehead>
        <Tablehead>name</Tablehead>
        <Tablehead>status</Tablehead>
        <Tablehead> role</Tablehead>
        <Tablehead>edit</Tablehead>
        <Tablehead>Delete</Tablehead>
      </Tablerow>
      <Tablerow v-for="user in datauser">
        <Tabledata> {{ user.id }} </Tabledata>
        <Tabledata>{{ user.name }}</Tabledata>
        <Tabledata> {{ user.admin ? 'admin' : 'user' }} </Tabledata>
        <Tabledata> {{ user.role }} </Tabledata>
        <Tabledata> <button class="bg-sky-400 px-4 py-0.5 rounded-md "> Edit </button> </Tabledata>
        <Tabledata> <button @click="() => deleteuser(user.id,user.uuid)" class="bg-red-400 px-4 py-0.5 rounded-md "> Delete
          </button>
        </Tabledata>
      </Tablerow>
      <Tablerow>
        <th colspan="6" class="p-2 border-2 border-sky-500"> <button @click="openform"
            class="cursor-pointer bg-sky-500 px-2 py-1 rounded-md"> create new </button></th>
      </Tablerow>
    </table>
  </main>
  <div v-else>
    <div>
      <h1 class="text-3xl text-green-600"> loading </h1>
    </div>
  </div>


</template>
