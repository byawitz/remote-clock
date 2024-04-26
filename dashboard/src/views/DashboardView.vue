<template>
  <div id="dashboard">
    <div id="loader" v-if="isLoading">
      <span class="loader"></span>
    </div>
    <template v-if="loggedIn">
      <form @submit.prevent="updateUserDoc">
        <div class="form-block">
          <a href="#" @click.prevent="setNineToFive">🗓️ Set 9-5</a>
        </div>
        <DayComponent day="sunday" v-model="week.sunday"/>
        <DayComponent day="monday" v-model="week.monday"/>
        <DayComponent day="tuesday" v-model="week.tuesday"/>
        <DayComponent day="wednesday" v-model="week.wednesday"/>
        <DayComponent day="thursday" v-model="week.thursday"/>
        <DayComponent day="friday" v-model="week.friday"/>
        <DayComponent day="saturday" v-model="week.saturday"/>


        <div class="form-block">
          <label for="timezone-offset">Timezone</label>
          <select name="timezone_offset" id="timezone-offset" v-model="timezone">
            <option v-for="tz in moment.tz.names()" :value="tz" :key="tz">{{ tz }}</option>
          </select>
        </div>

        <div class="form-block">
          <button>Update</button>
        </div>
      </form>
    </template>

    <template v-else>

      <form @submit.prevent="login">
        <div class="form-block">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email">
        </div>

        <div class="form-block">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password">
        </div>

        <div class="form-block">
          <button>Login</button>
        </div>
      </form>
    </template>
  </div>
</template>

<script setup lang="ts">
import {inject, onMounted, ref} from "vue";
import useApi from "@/lib/api";
import Week from "@/lib/Week";
import DayComponent from "@/components/DayComponent.vue";
import moment from 'moment-timezone';

const api         = useApi();
const isLoading   = ref(true);
const loggedIn    = ref(false);
const currentUser = ref({});
const email       = ref('');
const password    = ref('');
const swal: any   = inject('$swal');
const week        = ref(new Week());
const documentId  = ref('');
const timezone    = ref('');

async function login() {
  isLoading.value = true;
  try {
    await api.account.createEmailSession(email.value, password.value);
    await checkUser();
  } catch (e) {
    swal.fire({
      title: 'Error',
      text : 'Wrong details, please try again.',
      icon : 'error'
    });
  }
  isLoading.value = false;
}


async function checkUser() {
  try {
    const user        = await api.account.get();
    currentUser.value = user;
    loggedIn.value    = true;
    const doc         = await api.database.listDocuments(api.DB_ID, api.COLLECTION_ID, [
      api.query.equal('employee_id', user.$id)
    ]);

    if (doc.total === 1) {
      documentId.value = doc.documents[0].$id;
      week.value       = Week.fromJSON(doc.documents[0].times);
      timezone.value   = doc.documents[0].timezone;
    }
  } catch (e) {

  }

  isLoading.value = false;
}

async function updateUserDoc() {
  isLoading.value = true;

  await api.database.updateDocument(api.DB_ID, api.COLLECTION_ID, documentId.value, {
    timezone: timezone.value,
    times   : JSON.stringify(week.value.toJSON())
  });
  swal.fire({
    title: 'Success',
    text : 'Updated!',
    icon : 'success'
  });

  isLoading.value = false;
}

function setNineToFive() {
  week.value.monday.isWorking = true;
  week.value.monday.from      = '09:00';
  week.value.monday.to        = '17:00';

  week.value.tuesday.isWorking = true;
  week.value.tuesday.from      = '09:00';
  week.value.tuesday.to        = '17:00';

  week.value.wednesday.isWorking = true;
  week.value.wednesday.from      = '09:00';
  week.value.wednesday.to        = '17:00';

  week.value.thursday.isWorking = true;
  week.value.thursday.from      = '09:00';
  week.value.thursday.to        = '17:00';

  week.value.friday.isWorking = true;
  week.value.friday.from      = '09:00';
  week.value.friday.to        = '17:00';
}

onMounted(async () => {
  await checkUser();
})
</script>

<style lang="scss">

form {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  border: 1px solid #353535;
  margin: 2rem auto;
  border-radius: 2px;

  .form-block {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  input, select {
    background: transparent;
    border: 1px solid #353535;
    padding: 10px;
    margin-top: 10px;
    border-radius: 2px;
    color: var(--color-text);
    width: 100%;
  }

  button {
    background-color: hsla(160, 100%, 37%, 1);
    border: none;
    padding: 10px;
    border-radius: 2px;
  }
}

#loader {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #000000b2;
  display: flex;
  align-items: center;
  justify-content: center;
}


.day-block {
  display: flex;
  justify-content: center;
  border: 1px solid #353535;
  margin-top: 5px;

  span {
    padding: 0 10px;
    color: var(--color-text);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  select {
    margin-top: 0;
    border: none;
  }
}
</style>