<script>
import supabase from './library/supabase';
import Tabledata from './components/Tabledata.vue';
import Tablehead from './components/Tablehead.vue';
import Tablerow from './components/Tablerow.vue';
import Navbar from './components/navbar.vue';
import Login from './components/login.vue'
export default {
  components: {
    Tabledata,
    Tablehead,
    Tablerow,
    Navbar,
    Login,
  },
  data() {
    return {
      nama: 'devano',
      data: null,
      userdata: null,
      userform: false,
      searchkey: "",
      admin: true
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
    },
    async deleteuser(target, uuid) {
      const { error: autherror } = await supabase.auth.admin.deleteUser(
        uuid
      )
      if (autherror) {
        console.log(autherror)
        return
      }
      const { count, data, error: deleterror } = await supabase.from("Users").delete().eq('id', target).single().select();
      if (deleterror) {
        console.log(deleteerror)
        return
      }
      const deleteresult = this.userdata.filter(e => e.id !== target)
      this.userdata = deleteresult
    },

  },
  watch: {
  },
  mounted() {
    supabase.auth.onAuthStateChange((_event, session) => {
      this.admin = !!session
    })
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
    async logout() {
      await supabase.auth.signOut()
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
  <main v-if="admin" class="">
    <div v-if="dataloaded" class="w-screen h-screen flex flex-col px-1">
      <Navbar :logout="() => logout" />
      <!-- <form class="flex mt-20 flex-col gap-3" @submit.prevent="newuser">
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
      </form> -->


      <div class="mt-16 w-full h-max flex items-center justify-between">
        <h1 class=" text-4xl font-work font-semibold text-sky-600">Users Data</h1>
        <div class="flex gap-1" >
        <button class="border border-zinc-700 rounded-md w-7 h-7 flex items-center justify-center" > <i class="bi bi-plus text-2xl" >  </i> </button>
        <button class="border border-zinc-700 rounded-md w-7 h-7 flex items-center justify-center" > <i class="bi bi-filter text-2xl" >  </i> </button>
          <label for="search" class="flex mr-5 items-center justify-center">
            <input type="text" v-model="searchkey" placeholder="search" id="search" class="border px-2 h-6 font-work rounded-md" />
          </label>
        </div>
      </div>

      <table class="font-work border-b-2">
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
          <Tabledata> <button @click="() => deleteuser(user.id, user.uuid)"
              class="bg-red-400 px-4 py-0.5 text-center rounded-md ">
              <i class="bi bi-trash"> </i>
              Delete
            </button>
          </Tabledata>
        </Tablerow>
      </table>
    </div>
    <div v-else>
      <div>
        <h1 class="text-3xl text-green-600"> loading </h1>
      </div>
    </div>
  </main>
  <Login v-else />


</template>
