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
      admin: true,
      newuserstatus: false
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
          admin: this.newuserstatus
        }).single().select()
      if (insertError) {
        console.log(insertError)
        return;
      }
      this.userdata.push(userdata)
      this.userform = false
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
    radiotrue() {
      return this.newuserstatus ? "bg-sky-400/60 border-sky-700" : "bg-zinc-400/60 border-sky-900"
    },
    radiofalse() {
      return !this.newuserstatus ? "bg-sky-400/60 border-sky-700" : "bg-zinc-400/60 border-sky-900"
    },
  }
}
</script>

<template>
  <main v-if="admin" class="">
    <div v-if="dataloaded" class="w-screen h-screen flex flex-col px-1">
      <Navbar :logout="() => logout" />
      <Transition name="formanimate">
        <form v-if="userform"
          class="flex items-center pb-3 w-180 h-max mt-20 flex-col gap-3 fixed top-10 left-88 border-2 border-sky-600 bg-zinc-100 rounded-md px-2 py-e"
          @submit.prevent="newuser">
          <div class="w-full flex justify-between px-2">
            <h1 class="text-2xl font-work font-semibold tracking wider"> create new user </h1>
            <i @click="closeform" class="bi bi-x text-3xl"></i>
          </div>
          <label for="name" class="flex flex-col w-full ">
            <h1 class="text-xl font-medium font-work">name </h1>
            <input class="authinput h-8 " ref="name" type="text" name="name" id="name">
          </label>
          <label for="admin" class="w-full flex flex-col justify-between">
            <h1 class="text-xl font-medium font-work">admin</h1>
            <div class="flex justify-between gap-2 pr-10 w-full h-min">
              <label for="trueadmin" class="radioinput" :class="radiotrue">
                <h1 class="font-medium text-xl font-work">Yes</h1>
                <input name="admin" class="hidden" id="trueadmin" type="radio" v-model="newuserstatus" :value="true" />
              </label>
              <label for="falseadmin" class="radioinput" :class="radiofalse">
                <h1 class="font-medium text-xl font-work">No</h1>
                <input name="admin" class="hidden" type="radio" id="falseadmin" v-model="newuserstatus"
                  :value="false" />
              </label>
            </div>
          </label>
          <label class="flex flex-col w-full " for="email">
            <h1 class="text-xl font-medium font-work">Email </h1>
            <input class="authinput h-8" ref="email" type="email" name="email" id="email">
          </label>
          <label class="flex flex-col w-full " for="password">
            <h1 class="text-xl font-medium font-work"> Password </h1>
            <input class="authinput h-8" ref="password" type="password" name="password" id="password">
          </label>
          <button
            class="font-work rounded-md w-max h-max px-2 py-1 text-2xl border text-white  bg-blue-600 border-sky-400 hover:scale-85 hover:text-blue-600 hover:bg-zinc-100 hover:border-2 hover:font-semibold transition"
            type="submit"> Confirm </button>
        </form>
      </Transition>


      <div class="mt-16 w-full h-max flex items-center justify-between">
        <h1 class=" text-4xl font-work font-semibold text-sky-600">Users Data</h1>
        <div class="flex gap-1">
          <button @click="openform" class="border border-zinc-700 rounded-md w-7 h-7 flex items-center justify-center">
            <i class="bi bi-plus text-2xl"> </i> </button>
          <button class="border border-zinc-700 rounded-md w-7 h-7 flex items-center justify-center"> <i
              class="bi bi-funnel text-2xl"> </i> </button>
          <button class="border border-zinc-700 rounded-md w-7 h-7 flex items-center justify-center"> <i
              class="bi bi-filter text-2xl"> </i> </button>
          <label for="search" class="flex mr-5 items-center justify-center">
            <input type="text" v-model="searchkey" placeholder="search" id="search"
              class="border px-2 h-6 font-work rounded-md" />
          </label>
        </div>
      </div>

      <table class="font-work border-b-2 border-blue-600">
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
          <Tabledata> <button class="bg-sky-400 px-4 py-0.5 rounded-md text-center ">
              <i class="bi bi-pencil-square"> </i> 
              Edit</button>
          </Tabledata>
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
